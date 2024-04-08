import json
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
import sqlalchemy as sa
from sqlalchemy import desc
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log


# NOTE outgoing stock IS ship request. Meaning good going from warehouse to store
outgoing_stock_blueprint = Blueprint(
    "outgoing_stock", __name__, url_prefix="/outgoing_stock"
)


@outgoing_stock_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    form_sort: f.SortByStatusShipRequestForm = f.SortByStatusShipRequestForm()

    store_category = aliased(m.StoreCategory)
    store = aliased(m.Store)
    q = request.args.get("q", type=str, default=None)
    query = m.ShipRequest.select().order_by(desc(m.ShipRequest.id))
    count_query = sa.select(sa.func.count()).select_from(m.ShipRequest)
    if q:
        query = (
            m.ShipRequest.select()
            .join(store_category, m.ShipRequest.store_category_id == store_category.id)
            .join(store, m.ShipRequest.store_id == store.id)
            .where(
                m.ShipRequest.order_numb.ilike(f"%{q}%")
                | m.ShipRequest.order_type.ilike(f"%{q}%")
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
    warehouses = db.session.scalars(
        m.Warehouse.select().where(
            m.Warehouse.name != s.WarehouseMandatory.warehouse_events.value
        )
    ).all()
    warehouses_events = db.session.scalars(
        m.Warehouse.select().where(
            m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value
        )
    ).all()

    warehouses_json = s.WarehouseList.model_validate(warehouses).model_dump_json(
        by_alias=True
    )
    warehouses_events_json = s.WarehouseList.model_validate(
        warehouses_events
    ).model_dump_json(by_alias=True)

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
        warehouses_json=warehouses_json,
        warehouses_events_json=warehouses_events_json,
        warehouses_events=warehouses_events,
        ship_requests_status=s.ShipRequestStatus,
    )


# TODO needs refactor
@outgoing_stock_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def save():
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if form_edit.validate_on_submit():
        ship_request: m.ShipRequest = db.session.get(
            m.ShipRequest, form_edit.ship_request_id.data
        )
        if not ship_request:
            log(
                log.ERROR,
                "Not found ship request item by id : [%s]",
                form_edit.ship_request_id.data,
            )
            flash("Cannot save item data", "danger")
            return redirect(url_for("outgoing_stock.get_all"))

        products = json.loads(form_edit.products.data)

        report_inventory_list = m.ReportInventoryList(
            type="Ship Request Dispatched",
            # TODO who sholud be responsible for change?
            # one who created inbound order?
            # or one who accepted it?
            user_id=current_user.id,
            ship_request=ship_request,
            store=ship_request.store,
        )
        report_inventory_list.save(False)

        if not products:
            log(log.ERROR, "No products in ship request: [%s]", form_edit.products.data)
            flash("Cannot save item data", "danger")
            return redirect(url_for("outgoing_stock.get_all"))

        for product in products:
            warehouse: m.Warehouse | None = db.session.get(
                m.Warehouse,
                product["warehouse_id"],
            )
            if not warehouse:
                log(log.ERROR, "Warehouse not found: [%s]", product["warehouse_id"])
                flash("Warehouse not found", "danger")
                return redirect(url_for("outgoing_stock.get_all"))

            cart: m.Cart = db.session.scalar(
                m.Cart.select().where(
                    m.Cart.product_id == int(product["product_id"]),
                    m.Cart.group.has(m.Group.name == product["group_name"]),
                    m.Cart.ship_request_id == ship_request.id,
                    m.Cart.quantity == int(product["quantity"]),
                )
            )
            if not cart:
                log(log.ERROR, "Cart not found")
                flash("Cannot save item data", "danger")
                return redirect(url_for("outgoing_stock.get_all"))
            if cart:
                cart.warehouse_id = product["warehouse_id"]
                cart.save(False)
                log(log.INFO, "Cart warehouse_id updated. Cart item: [%s]", cart)

            report_shipping = m.ReportShipping(
                type=s.ReportShipRequestActionType.ACCEPTED.value,
                ship_request=ship_request,
                user=current_user,
                history=f"{warehouse.name}: {product['quantity']}",
            )
            db.session.add(report_shipping)

        ship_request.wm_notes = form_edit.wm_notes.data

        carts: list[m.Cart] = db.session.scalars(
            m.Cart.select().where(
                # TODO do we need this check? Because current_user here is warehouse manager
                # BUT current_user at Cart creation is user who created cart
                # m.Cart.user_id == current_user.id,
                m.Cart.status == "submitted",
                m.Cart.ship_request_id == ship_request.id,
            )
        )

        for cart in carts:
            is_group_in_master_group = (
                db.session.query(m.Group)
                .join(m.MasterGroup)
                .filter(
                    m.MasterGroup.name == s.MasterGroupMandatory.events.value,
                    m.Group.name == cart.group.name,
                )
                .count()
                > 0
            )

            cart_user_group: m.Group = db.session.execute(
                m.Group.select().where(m.Group.name == cart.group.name)
            ).scalar()
            warehouse_product: m.WarehouseProduct = db.session.scalar(
                m.WarehouseProduct.select().where(
                    m.WarehouseProduct.product_id == cart.product_id,
                    m.WarehouseProduct.warehouse_id == cart.warehouse_id,
                    m.WarehouseProduct.group_id == cart_user_group.id,
                )
            )
            if warehouse_product and not is_group_in_master_group:
                # TODO what if warehouse product not found?
                products_to_deplete: list[m.ProductAllocated] = db.session.scalars(
                    m.ProductAllocated.select()
                    .where(
                        m.ProductAllocated.product_id == cart.product_id,
                        # m.ProductAllocated.group_id == cart_user_group.id,
                        m.ProductAllocated.quantity_remains > 0,
                    )
                    .order_by(m.ProductAllocated.shelf_life_end.asc())
                )

                deplete_qty = cart.quantity

                for product in products_to_deplete:
                    # for prod_group_qty in product.product_quantity_groups:
                    # TODO do we care from which group we deplete?
                    # if warehouse_product.group_id != prod_group_qty.group_id:
                    #     continue
                    if product.quantity_remains >= deplete_qty:
                        product.quantity_remains -= deplete_qty
                        product.save(False)
                        break
                    else:
                        deplete_qty -= product.quantity_remains
                        product.quantity_remains = 0
                        product.save(False)

                if warehouse_product.product_quantity < cart.quantity:
                    log(
                        log.WARNING,
                        "Not enough product. Available qty: [%s]; Requested qty: [%s]",
                        warehouse_product.product_quantity,
                        cart.quantity,
                    )
                    flash(
                        f"Not enough product. Available qty: {warehouse_product.product_quantity}; \
                            Requested qty: {cart.quantity}",
                        "danger",
                    )
                    return redirect(url_for("outgoing_stock.get_all"))

                warehouse_product.product_quantity -= cart.quantity

                warehouse_product.save(False)
                report_inventory = m.ReportInventory(
                    qty_before=warehouse_product.product_quantity + cart.quantity,
                    qty_after=warehouse_product.product_quantity,
                    report_inventory_list_id=report_inventory_list.id,
                    product_id=warehouse_product.product_id,
                    warehouse_product=warehouse_product,
                )
                report_inventory.save(False)

                m.ReportSKU(
                    product_id=warehouse_product.product_id,
                    ship_request=ship_request,
                    type=s.ReportSKUType.ship_request.value,
                    status="Ship request assigned to pickup.",
                ).save(False)

            cart.status = "completed"
            cart.save(False)

        ship_request.status = s.ShipRequestStatus.assigned
        db.session.commit()

        log(
            log.INFO,
            "Ship Request saved and dispatched. Ship Request: [%s]",
            ship_request,
        )
        flash("Ship Request dispatched!", "success")

        if form_edit.next_url.data:
            log(log.INFO, "Redirecting to: [%s]", form_edit.next_url.data)
            return redirect(form_edit.next_url.data)
        return redirect(url_for("outgoing_stock.get_all"))

    else:
        log(log.ERROR, "Cart item save errors: [%s]", form_edit.errors)
        flash(f"{form_edit.errors}", "danger")
        return redirect(url_for("outgoing_stock.get_all"))


@outgoing_stock_blueprint.route("/update_notes", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def update_notes():
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if form_edit.validate_on_submit():
        ship_request = db.session.get(m.ShipRequest, form_edit.ship_request_id.data)
        if not ship_request:
            log(
                log.ERROR,
                "Not found ship request item by id : [%s]",
                form_edit.ship_request_id.data,
            )
            flash("Cannot save item data", "danger")
            return redirect(url_for("outgoing_stock.get_all"))

        ship_request.proof_of_delivery = form_edit.proof_of_delivery.data
        ship_request.tracking = form_edit.tracking.data
        ship_request.save()

        if form_edit.wm_notes.data:
            ship_request.wm_notes = form_edit.wm_notes.data
            ship_request.save()
            log(log.INFO, "Ship Request note updated. Ship Request: [%s]", ship_request)
            flash("Note has been updated!", "success")
            return redirect(url_for("outgoing_stock.get_all"))

        if form_edit.next_url.data:
            log(log.INFO, "Redirecting to: [%s]", form_edit.next_url.data)
            return redirect(form_edit.next_url.data)
        return redirect(url_for("outgoing_stock.get_all"))

    else:
        log(log.ERROR, "Ship request item save errors: [%s]", form_edit.wm_notes.data)
        flash("Note for warehouse manager has not been updated", "danger")
        return redirect(url_for("outgoing_stock.get_all"))


@outgoing_stock_blueprint.route("/cancel/<int:id>", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def cancel(id: int):
    # TODO: needs refactor
    ship_request: m.ShipRequest = db.session.get(m.ShipRequest, id)
    if not ship_request:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    carts: list[m.Cart] = db.session.execute(
        m.Cart.select().where(m.Cart.ship_request_id == ship_request.id)
    ).scalars()
    for cart in carts:
        warehouse_product: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == cart.product_id,
                m.WarehouseProduct.group_id == cart.group_id,
            )
        ).scalar()
        if warehouse_product:
            warehouse_product.product_quantity += cart.quantity
            warehouse_product.save()

    ship_request.status = s.ShipRequestStatus.cancelled
    ship_request.save()

    log(log.INFO, "Ship Request cancelled. Ship Request: [%s]", ship_request)
    flash("Ship Request cancelled!", "success")
    return "ok", 200


@outgoing_stock_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def sort():
    # TODO: Move to outgoing stock GET
    # TODO: need refactor
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
        ).all()
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
        ship_requests_status=s.ShipRequestStatus,
    )
