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


@outgoing_stock_blueprint.route("/<ship_request_id>/edit-view", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def ship_request_edit_view(ship_request_id: int):
    ship_request = db.session.get(m.ShipRequest, ship_request_id)
    if not ship_request:
        log(log.ERROR, "Not found ship request item by id : [%s]", ship_request_id)
        return render_template(
            "toast.html", message="Ship request not found", category="danger"
        )
    if ship_request.status == s.ShipRequestStatus.assigned:
        log(
            log.ERROR,
            "Cannot save item data. Ship Request already Dispatched: [%s]",
            ship_request,
        )
        return render_template(
            "toast.html",
            message="Cannot save item data. Ship Request already Dispatched",
            category="danger",
        )
    form = f.ShipRequestOutgoingForm(
        ship_request_id=ship_request_id,
    )
    carts = db.session.scalars(
        sa.select(m.Cart).where(
            m.Cart.ship_request_id == ship_request_id, m.Cart.status == "submitted"
        )
    ).all()
    form.products = [
        (
            cart,
            f.ProductShipRequestForm(
                cart_id=cart.id,
            ),
        )
        for cart in carts
    ]

    notes_form = f.ShipRequestOutgoingNotesForm(
        wm_notes=ship_request.wm_notes,
        proof_of_delivery=ship_request.proof_of_delivery,
        tracking=ship_request.tracking,
    )

    warehouses = db.session.scalars(m.Warehouse.select()).all()

    return render_template(
        "outgoing_stock/modal_edit.html",
        form=form,
        ship_request=ship_request,
        warehouses=warehouses,
        notes_form=notes_form,
        status=s.ShipRequestStatus.waiting_for_warehouse.value,
    )


@outgoing_stock_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def save():
    form = f.ShipRequestOutgoingForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Cart item save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("outgoing_stock.get_all"))
    ship_request = db.session.get(m.ShipRequest, form.ship_request_id.data)
    if not ship_request:
        log(
            log.ERROR,
            "Not found ship request item by id : [%s]",
            form.ship_request_id.data,
        )
        flash("Cannot save item data", "danger")
        return redirect(url_for("outgoing_stock.get_all"))

    if ship_request.status == s.ShipRequestStatus.assigned:
        log(
            log.ERROR,
            "Cannot save item data. Ship Request already Dispatched: [%s]",
            ship_request,
        )
        flash("Cannot save item data. Ship Request already Dispatched", "danger")
        return redirect(url_for("outgoing_stock.get_all"))

    carts_ids = request.form.getlist("cart_id")
    warehouse_ids = request.form.getlist("warehouse_id")

    if len(carts_ids) != len(warehouse_ids):
        log(log.ERROR, "Carts and warehouses count mismatch")
        flash("Cannot save item data", "danger")
        return redirect(url_for("outgoing_stock.get_all"))
    products = list(zip(carts_ids, warehouse_ids))

    if not products:
        log(log.ERROR, "No products in ship request: [%s]", form.products.data)
        flash("Cannot save item data", "danger")
        return redirect(url_for("outgoing_stock.get_all"))

    report_inventory_list = m.ReportInventoryList(
        type="Ship Request Dispatched",
        user_id=current_user.id,
        ship_request=ship_request,
        store=ship_request.store,
    )
    report_inventory_list.save(False)

    for cart_id, warehouse_id in products:
        warehouse = db.session.get(
            m.Warehouse,
            warehouse_id,
        )
        if not warehouse:
            log(log.ERROR, "Warehouse not found: [%s]", warehouse_id)
            flash("Warehouse not found", "danger")
            return redirect(url_for("outgoing_stock.get_all"))

        cart = db.session.get(m.Cart, cart_id)
        if (
            not cart
            or cart.ship_request_id != ship_request.id
            or cart.status != "submitted"
        ):
            log(log.ERROR, "Cart not found")
            flash("Cannot save item data", "danger")
            return redirect(url_for("outgoing_stock.get_all"))

        cart.warehouse_id = warehouse_id

        log(log.INFO, "Cart warehouse_id updated. Cart item: [%s]", cart)

        report_shipping = m.ReportShipping(
            type=s.ReportShipRequestActionType.ACCEPTED.value,
            ship_request=ship_request,
            user=current_user,
            history=f"{warehouse.name}: {cart.quantity}",
        )
        db.session.add(report_shipping)

        warehouse_product: m.WarehouseProduct = db.session.scalar(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == cart.product_id,
                m.WarehouseProduct.warehouse_id == cart.warehouse_id,
                m.WarehouseProduct.group_id == cart.group_id,
            )
        )

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
        if warehouse_product and not is_group_in_master_group:
            products_to_deplete: list[m.ProductAllocated] = db.session.scalars(
                m.ProductAllocated.select()
                .where(
                    m.ProductAllocated.product_id == cart.product_id,
                    m.ProductAllocated.quantity_remains > 0,
                )
                .order_by(m.ProductAllocated.shelf_life_end.asc())
            )

            deplete_qty = cart.quantity

            for product in products_to_deplete:
                if product.quantity_remains >= deplete_qty:
                    product.quantity_remains -= deplete_qty
                    product.save(False)
                    break
                else:
                    deplete_qty -= product.quantity_remains
                    product.quantity_remains = 0
                    product.save(False)

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

    # ship_request.wm_notes = form.wm_notes.data TODO: need to add wm_notes to form
    ship_request.status = s.ShipRequestStatus.assigned
    db.session.commit()

    log(
        log.INFO,
        "Ship Request saved and dispatched. Ship Request: [%s]",
        ship_request,
    )
    flash("Ship Request dispatched!", "success")

    return redirect(url_for("outgoing_stock.get_all"))


@outgoing_stock_blueprint.route("/update_notes", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def update_notes():
    form = f.ShipRequestOutgoingNotesForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Ship request item save errors: [%s]", form.wm_notes.data)
        flash("Note for warehouse manager has not been updated", "danger")
        return redirect(url_for("outgoing_stock.get_all"))
    ship_request = db.session.get(m.ShipRequest, form.ship_request_id.data)
    if not ship_request:
        log(
            log.ERROR,
            "Not found ship request item by id : [%s]",
            form.ship_request_id.data,
        )
        flash("Cannot save item data", "danger")
        return redirect(url_for("outgoing_stock.get_all"))

    ship_request.proof_of_delivery = form.proof_of_delivery.data
    ship_request.tracking = form.tracking.data
    ship_request.wm_notes = form.wm_notes.data
    ship_request.save()

    log(log.INFO, "Ship Request note updated. Ship Request: [%s]", ship_request)
    flash("Note has been updated!", "success")
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
    if ship_request.status == s.ShipRequestStatus.cancelled:
        log(
            log.INFO, "Ship Request already cancelled. Ship Request: [%s]", ship_request
        )
        flash("Ship Request already cancelled!", "danger")
        return "already cancelled", 404

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
