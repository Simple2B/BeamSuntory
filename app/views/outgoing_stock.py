# flake8: noqa E501

from typing import Set
from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
from pydantic import TypeAdapter
from pydantic import ValidationError
import sqlalchemy as sa
from sqlalchemy import desc
from flask_pydantic import validate

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


notes_location_adapter = TypeAdapter(list[s.CartNoteLocation])
cart_prodcuts_data_adapter = TypeAdapter(list[s.CartProductData])


@outgoing_stock_blueprint.route("/", methods=["GET"])
@validate()
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all(query: s.OutgoingStockQueryParams):

    store_category = aliased(m.StoreCategory)
    store = aliased(m.Store)
    q = query.q
    status = query.status

    sql_query = sa.select(m.ShipRequest).order_by(desc(m.ShipRequest.id))
    count_query = sa.select(sa.func.count()).select_from(m.ShipRequest)
    if q:
        sql_query = (
            sa.select(m.ShipRequest)
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
    if status:
        sql_query = sql_query.where(m.ShipRequest.status == s.ShipRequestStatus(status))
        count_query = count_query.where(
            m.ShipRequest.status == s.ShipRequestStatus(status)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    ship_requests = [
        i
        for i in db.session.execute(
            sql_query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars()
    ]
    return render_template(
        "outgoing_stock/outgoing_stocks.html",
        ship_requests=ship_requests,
        page=pagination,
        search_query=q,
        search_status=status,
        ship_requests_status=s.ShipRequestStatus,
    )


@outgoing_stock_blueprint.route("/<ship_request_id>/view", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def ship_request_view(ship_request_id: int):
    """htmx"""
    ship_request = db.session.get(m.ShipRequest, ship_request_id)
    if not ship_request:
        log(log.ERROR, "Not found ship request item by id : [%s]", ship_request_id)
        return render_template(
            "toast.html", message="Ship request not found", category="danger"
        )
    carts = db.session.scalars(
        sa.select(m.Cart).where(
            m.Cart.ship_request_id == ship_request_id,
            m.Cart.status != s.CartStatus.PENDING.value,
        )
    ).all()

    notes_form = f.ShipRequestOutgoingNotesForm(
        ship_request_id=ship_request_id,
        wm_notes=ship_request.wm_notes,
        proof_of_delivery=ship_request.proof_of_delivery,
        tracking=ship_request.tracking,
    )

    return render_template(
        "outgoing_stock/modal_view.html",
        notes_form=notes_form,
        ship_request=ship_request,
        carts=carts,
    )


@outgoing_stock_blueprint.route("/<ship_request_id>/edit-view", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def ship_request_edit_view(ship_request_id: int):
    """htmx"""
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
        wm_notes=ship_request.wm_notes,
        proof_of_delivery=ship_request.proof_of_delivery,
        tracking=ship_request.tracking,
    )
    carts = ship_request.carts

    warehouse_product_ids: Set[int] = set()
    for cart in carts:
        warehouse_product_ids.update(ware_h.id for ware_h in cart.product.warehouses)

    notes_form = f.ShipRequestOutgoingNotesForm(
        ship_request_id=ship_request_id,
        wm_notes=ship_request.wm_notes,
        proof_of_delivery=ship_request.proof_of_delivery,
        tracking=ship_request.tracking,
    )

    warehouses = db.session.scalars(
        sa.select(m.Warehouse).where(m.Warehouse.id.in_(list(warehouse_product_ids)))
    ).all()

    return render_template(
        "outgoing_stock/modal_edit.html",
        form=form,
        carts=carts,
        notes_form=notes_form,
        ship_request=ship_request,
        warehouses=warehouses,
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

    try:
        products = cart_prodcuts_data_adapter.validate_json(
            form.cart_products_data.data
        )
    except ValidationError as e:
        log(log.ERROR, "Validation error: [%s]", e)
        flash("Cannot save item data", "danger")
        return redirect(url_for("outgoing_stock.get_all"))

    if not products:
        log(log.ERROR, "No products in ship request")
        flash("No products in ship request", "danger")
        return redirect(url_for("outgoing_stock.get_all"))

    report_inventory_list = m.ReportInventoryList(
        type="Ship Request Dispatched",
        user_id=current_user.id,
        ship_request=ship_request,
        store=ship_request.store,
    )
    report_inventory_list.save(False)

    for prodcut_data in products:
        cart_id = prodcut_data.cart_id
        warehouse_id = prodcut_data.warehouse_id
        note_location = prodcut_data.note_location

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
            or cart.status == s.CartStatus.PENDING.value
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

        warehouse_product = db.session.scalar(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product_id == cart.product_id,
                m.WarehouseProduct.warehouse_id == cart.warehouse_id,
                m.WarehouseProduct.group_id == cart.group_id,
            )
        )

        if not warehouse_product:
            log(log.ERROR, "Warehouse product not found")
            flash(
                f"Product [{cart.product.name}] with group [{cart.group.name}] not found in warehouse  [{warehouse.name}]",
                "danger",
            )
            return redirect(url_for("outgoing_stock.get_all"))

        if cart.quantity > warehouse_product.product_quantity:
            log(log.ERROR, "Not enough product in warehouse")
            flash(
                f"Not enough product in \nWarehouse:[{warehouse_product.warehouse_name}] qty:[{warehouse_product.product_quantity}]\nProduct:[{cart.product.name}]: qty:[{cart.quantity}]",
                "danger",
            )
            return redirect(url_for("outgoing_stock.get_all"))

        if cart.group.master_group.name != s.Events.name.value:
            products_to_deplete = db.session.scalars(
                sa.select(m.ProductAllocated)
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
                qty_before=warehouse_product.product_quantity,
                qty_after=warehouse_product.product_quantity - cart.quantity,
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

        warehouse_product.product_quantity -= cart.quantity
        cart.status = s.CartStatus.COMPLETED.value
        cart.product.notes_location = note_location

    ship_request.wm_notes = form.wm_notes.data
    ship_request.proof_of_delivery = form.proof_of_delivery.data
    ship_request.tracking = form.tracking.data
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

    try:
        notes_location_data = notes_location_adapter.validate_json(
            form.notes_locations_data.data
        )
    except ValidationError as e:
        log(log.ERROR, "Notes location validation error: [%s]", e)
        flash("Notes for ship reauest has not been updated", "danger")
        return redirect(url_for("outgoing_stock.get_all"))

    for note_location_data in notes_location_data:
        cart = db.session.get(m.Cart, note_location_data.cart_id)
        if not cart or cart.ship_request_id != ship_request.id:
            log(log.ERROR, "Cart not found")
            flash("Cannot save item data", "danger")
            return redirect(url_for("outgoing_stock.get_all"))
        cart.product.notes_location = note_location_data.note_location

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

    carts = db.session.scalars(
        sa.select(m.Cart).where(m.Cart.ship_request_id == ship_request.id)
    ).all()
    for cart in carts:
        cart.status = s.CartStatus.CANCELLED.value
        if not cart.warehouse:
            log(log.INFO, "Cart item has no warehouse_id. Cart item: [%s]", cart.id)
            continue
        wh_ho_product = db.session.scalar(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product_id == cart.product_id,
                m.WarehouseProduct.warehouse_id == cart.warehouse_id,
                m.WarehouseProduct.group_id == cart.group_id,
            )
        )
        if wh_ho_product:
            wh_ho_product.product_quantity += cart.quantity

    ship_request.status = s.ShipRequestStatus.cancelled
    ship_request.save()

    log(log.INFO, "Ship Request cancelled. Ship Request: [%s]", ship_request)
    flash("Ship Request cancelled!", "success")
    return "ok", 200


@outgoing_stock_blueprint.route("/print", methods=["GET"])
@validate()
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def print(query: s.OutgoingStockQueryParamsDownload):

    sql_query = sa.select(m.ShipRequest).order_by(desc(m.ShipRequest.id))

    if query.ship_request_id:
        log(log.INFO, "Download ship request with id: [%s]", query.ship_request_id)
        sql_query = sql_query.where(m.ShipRequest.id == query.ship_request_id)

    elif query.q:
        log(log.INFO, "Download ship request with query: [%s]", query.q)
        sql_query = (
            sa.select(m.ShipRequest)
            .join(
                m.StoreCategory, m.ShipRequest.store_category_id == m.StoreCategory.id
            )
            .join(m.Store, m.ShipRequest.store_id == m.Store.id)
            .where(
                m.ShipRequest.order_numb.ilike(f"%{query.q}%")
                | m.ShipRequest.order_type.ilike(f"%{query.q}%")
                | m.StoreCategory.name.ilike(f"%{query.q}%")
                | m.Store.store_name.ilike(f"%{query.q}%")
            )
            .order_by(m.ShipRequest.id)
        )
    elif query.status and query.status in [
        status.value for status in s.ShipRequestStatus
    ]:
        sql_query = sql_query.where(
            m.ShipRequest.status == s.ShipRequestStatus(query.status)
        )

    ship_requests = db.session.scalars(sql_query).all()

    return render_template(
        "outgoing_stock/pdf_template.html",
        ship_requests=ship_requests,
    )


@outgoing_stock_blueprint.route("/delete/<cart_id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def delete_cart(cart_id: int):
    log(log.INFO, "Delete cart item with id: [%s]", cart_id)
    cart = db.session.get(m.Cart, cart_id)
    if not cart:
        log(log.INFO, "There is no cart item with id: [%s]", cart_id)
        return render_template(
            "toast.html", message="There is no such product item!", category="danger"
        )
    if cart.warehouse and cart.ship_request.status != s.ShipRequestStatus.cancelled:
        warehouse_product = db.session.scalar(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product_id == cart.product_id,
                m.WarehouseProduct.warehouse_id == cart.warehouse_id,
                m.WarehouseProduct.group_id == cart.group_id,
            )
        )
        if warehouse_product:
            warehouse_product.product_quantity += cart.quantity

    db.session.execute(m.Event.delete().where(m.Event.cart_id == cart_id))
    db.session.delete(cart)
    db.session.commit()
    log(log.INFO, "Cart item deleted. cart_id: [%s]", cart_id)
    return render_template(
        "toast.html", message="Product item deleted!", category="success"
    )
