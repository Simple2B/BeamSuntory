import json
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required
import sqlalchemy as sa
from sqlalchemy.orm import aliased
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log
from config import BaseConfig


# NOTE outgoing stock IS ship request. Meaning good going from warehouse to store
outgoing_stock_blueprint = Blueprint(
    "outgoing_stock", __name__, url_prefix="/outgoing_stock"
)


@outgoing_stock_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    form_sort: f.SortByStatusShipRequestForm = f.SortByStatusShipRequestForm()

    store_category = aliased(m.StoreCategory)
    store = aliased(m.Store)
    q = request.args.get("q", type=str, default=None)
    query = m.ShipRequest.select().order_by(m.ShipRequest.id)
    count_query = sa.select(sa.func.count()).select_from(m.ShipRequest)
    if q:
        query = (
            m.ShipRequest.select()
            .join(store_category, m.ShipRequest.store_category_id == store_category.id)
            .join(store, m.ShipRequest.store_id == store.id)
            .where(
                m.ShipRequest.order_numb.ilike(f"%{q}%")
                | m.ShipRequest.order_type.ilike(f"%{q}%")
                | m.ShipRequest.status.ilike(f"%{q}%")
                | store_category.name.ilike(f"%{q}%")
                | store.store_name.ilike(f"%{q}%")
            )
            .order_by(m.ShipRequest.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .join(store_category, m.ShipRequest.store_category_id == store_category.id)
            .join(store, m.ShipRequest.store_id == store.id)
            .where(
                m.ShipRequest.order_numb.ilike(f"%{q}%")
                | m.ShipRequest.order_type.ilike(f"%{q}%")
                | m.ShipRequest.status.ilike(f"%{q}%")
                | store_category.name.ilike(f"%{q}%")
                | store.store_name.ilike(f"%{q}%")
            )
            .select_from(m.ShipRequest)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    ship_requests = [
        i
        for i in db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars()
    ]
    current_order_carts = {
        spr.order_numb: [
            cart
            for cart in db.session.execute(
                m.Cart.select().where(m.Cart.order_numb == spr.order_numb)
            ).scalars()
        ]
        for spr in ship_requests
    }
    warehouses_rows = db.session.execute(sa.select(m.Warehouse)).scalars()
    warehouses = [{"name": w.name, "id": w.id} for w in warehouses_rows]

    return render_template(
        "outgoing_stock/outgoing_stocks.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        warehouses=warehouses,
        ship_requests_status=BaseConfig.Config.SHIP_REQUEST_STATUS,
    )


@outgoing_stock_blueprint.route("/edit", methods=["POST"])
@login_required
def save():
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if form_edit.validate_on_submit():
        query = m.ShipRequest.select().where(
            m.ShipRequest.id == int(form_edit.ship_request_id.data)
        )
        sr: m.ShipRequest | None = db.session.scalar(query)
        if not sr:
            log(
                log.ERROR,
                "Not found ship request item by id : [%s]",
                form_edit.ship_request_id.data,
            )
            flash("Cannot save item data", "danger")
        sr.status = form_edit.status.data
        sr.wm_notes = form_edit.wm_notes.data
        sr.save()

        products = json.loads(form_edit.products.data)

        for product in products:
            cart: m.Cart = db.session.execute(
                m.Cart.select().where(
                    m.Cart.product_id == int(product["product_id"]),
                    m.Cart.group == product["group_name"],
                    m.Cart.ship_request_id == sr.id,
                    m.Cart.quantity == int(product["quantity"]),
                )
            ).scalar()
            if cart:
                cart.warehouse_id = product["warehouse_id"]
                cart.save()

        if form_edit.next_url.data:
            return redirect(form_edit.next_url.data)
        return redirect(url_for("outgoing_stock.get_all"))

    else:
        log(log.ERROR, "Cart item save errors: [%s]", form_edit.errors)
        flash(f"{form_edit.errors}", "danger")
        return redirect(url_for("outgoing_stock.get_all"))


@outgoing_stock_blueprint.route("/dispatch/<int:id>", methods=["GET"])
@login_required
def dispatch(id: int):
    sr: m.ShipRequest = db.session.scalar(
        m.ShipRequest.select().where(m.ShipRequest.id == id)
    )
    if not sr:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    sr.status = "Assigned to pickup"
    sr.save()

    log(log.INFO, "Ship Request dispatched. Ship Request: [%s]", sr)
    flash("Ship Request dispatched!", "success")
    return "ok", 200


@outgoing_stock_blueprint.route("/cancel/<int:id>", methods=["GET"])
@login_required
def cancel(id: int):
    sr: m.ShipRequest = db.session.scalar(
        m.ShipRequest.select().where(m.ShipRequest.id == id)
    )
    if not sr:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    carts: list[m.Cart] = db.session.execute(
        m.Cart.select().where(m.Cart.ship_request_id == sr.id)
    ).scalars()
    for cart in carts:
        cart_user_group: m.Group = db.session.execute(
            m.Group.select().where(m.Group.name == cart.group)
        ).scalar()
        # TODO consider to add warehouse id
        warehouse_product: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == cart.product_id,
                # m.WarehouseProduct.warehouse_id == sr.warehouse_id,
                m.WarehouseProduct.group_id == cart_user_group.id,
            )
        ).scalar()
        if warehouse_product:
            warehouse_product.product_quantity += cart.quantity
            warehouse_product.save()

    sr.status = "Cancelled"
    sr.save()

    log(log.INFO, "Ship Request cancelled. Ship Request: [%s]", sr)
    flash("Ship Request cancelled!", "success")
    return "ok", 200


@outgoing_stock_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
def sort():
    # TODO: Move to outgoing stock GET
    if (
        request.method == "GET"
        and request.args.get("page", type=str, default=None) is None
    ):
        flash("Sort without any arguments", "danger")
        return redirect(url_for("outgoing_stock.get_all"))
    form_sort: f.SortByStatusShipRequestForm = f.SortByStatusShipRequestForm()
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if not form_sort.validate_on_submit() and request.method == "POST":
        # NOTE: this is drop filters action
        return redirect(url_for("outgoing_stock.get_all"))

    filtered = True
    status = form_sort.sort_by.data if request.method == "POST" else "Draft"

    q = request.args.get("q", type=str, default=None)
    query = (
        m.ShipRequest.select()
        .where(m.ShipRequest.status == status)
        .order_by(m.ShipRequest.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.ShipRequest.status == status)
        .select_from(m.ShipRequest)
    )
    if q:
        query = (
            m.ShipRequest.select()
            .where(
                m.ShipRequest.order_numb.ilike(f"%{q}%")
                | m.ShipRequest.store_category.ilike(f"%{q}%")
                | m.ShipRequest.order_type.ilike(f"%{q}%")
                | m.ShipRequest.status.ilike(f"%{q}%"),
                m.ShipRequest.status == status,
            )
            .order_by(m.ShipRequest.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(
                m.ShipRequest.order_numb.ilike(f"%{q}%")
                | m.ShipRequest.store_category.ilike(f"%{q}%")
                | m.ShipRequest.order_type.ilike(f"%{q}%")
                | m.ShipRequest.status.ilike(f"%{q}%"),
                m.ShipRequest.status == status,
            )
            .select_from(m.ShipRequest)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    ship_requests = [
        i
        for i in db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars()
    ]
    current_order_carts = {
        spr.order_numb: [
            cart
            for cart in db.session.execute(
                m.Cart.select().where(m.Cart.order_numb == spr.order_numb)
            ).scalars()
        ]
        for spr in ship_requests
    }
    warehouses_rows = db.session.execute(sa.select(m.Warehouse)).scalars()
    warehouses = [{"name": w.name, "id": w.id} for w in warehouses_rows]

    return render_template(
        "outgoing_stock/outgoing_stocks.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        warehouses=warehouses,
        filtered=filtered,
        ship_requests_status=BaseConfig.Config.SHIP_REQUEST_STATUS,
    )
