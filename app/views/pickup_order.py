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

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log


# NOTE pickup order IS ship request. Meaning good going from warehouse to store
pickup_order_blueprint = Blueprint("pickup_order", __name__, url_prefix="/pickup_order")


@pickup_order_blueprint.route("/", methods=["GET"])
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
        "pickup_order/pickup_orders.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        warehouses=warehouses,
        ship_requests_status=s.ShipRequestStatus,
    )


@pickup_order_blueprint.route("/edit", methods=["POST"])
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
        sr.da_notes = form_edit.da_notes.data
        sr.save()

        if form_edit.next_url.data:
            return redirect(form_edit.next_url.data)
        return redirect(url_for("pickup_order.get_all"))

    else:
        log(log.ERROR, "Cart item save errors: [%s]", form_edit.errors)
        flash(f"{form_edit.errors}", "danger")
        return redirect(url_for("pickup_order.get_all"))


@pickup_order_blueprint.route("/pickup/<int:id>", methods=["GET"])
@login_required
def pickup(id: int):
    sr: m.ShipRequest = db.session.get(m.ShipRequest, id)

    if not sr:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    sr.status = s.ShipRequestStatus.in_transit
    sr.save()

    log(log.INFO, "Ship Request pickup done. Ship Request: [%s]", sr)
    flash("Ship Request pickup done!", "success")
    return "ok", 200


@pickup_order_blueprint.route("/deliver/<int:id>", methods=["GET"])
@login_required
def deliver(id: int):
    sr: m.ShipRequest = db.session.scalar(
        m.ShipRequest.select().where(m.ShipRequest.id == id)
    )
    if not sr:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    sr.status = s.ShipRequestStatus.delivered
    sr.save()

    log(log.INFO, "Ship Request delivered. Ship Request: [%s]", sr)
    flash("Ship Request delivered!", "success")
    return "ok", 200


# TODO: need refactor
@pickup_order_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
def sort():
    # TODO: handle GET request without
    if (
        request.method == "GET"
        and request.args.get("page", type=str, default=None) is None
    ):
        flash("Sort without any arguments", "danger")
        return redirect(url_for("pickup_order.get_all"))
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if not form_sort.validate_on_submit() and request.method == "POST":
        # NOTE: this is drop filters action
        return redirect(url_for("pickup_order.get_all"))

    filtered = True
    status = form_sort.sort_by.data if request.method == "POST" else "Draft"

    q = request.args.get("q", type=str, default=None)
    query = (
        m.ShipRequest.select()
        .where(m.ShipRequest.status == s.ShipRequestStatus(status))
        .order_by(m.ShipRequest.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.ShipRequest.status == s.ShipRequestStatus(status))
        .select_from(m.ShipRequest)
    )
    if q:
        query = query.where(
            m.ShipRequest.order_numb.ilike(f"%{q}%")
            | m.ShipRequest.store_category.ilike(f"%{q}%")
            | m.ShipRequest.order_type.ilike(f"%{q}%")
        )
        count_query = count_query.where(
            m.ShipRequest.order_numb.ilike(f"%{q}%")
            | m.ShipRequest.store_category.ilike(f"%{q}%")
            | m.ShipRequest.order_type.ilike(f"%{q}%")
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    ship_requests = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).all()
    current_order_carts = {
        spr.order_numb: db.session.scalars(
            m.Cart.select().where(m.Cart.order_numb == spr.order_numb)
        )
        for spr in ship_requests
    }
    warehouses_rows = db.session.scalars(sa.select(m.Warehouse))
    warehouses = [{"name": w.name, "id": w.id} for w in warehouses_rows]

    return render_template(
        "pickup_order/pickup_orders.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        warehouses=warehouses,
        filtered=filtered,
        ship_requests_status=s.ShipRequestStatus,
    )
