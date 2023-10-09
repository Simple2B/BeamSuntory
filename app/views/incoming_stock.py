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
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log

# NOTE incoming stock IS inbound order. Meaning goods going from supplier to warehouse
incoming_stock_blueprint = Blueprint(
    "incoming_stock", __name__, url_prefix="/incoming_stock"
)


@incoming_stock_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create = f.InboundOrderCreateForm()
    form_edit = f.InboundOrderUpdateForm()
    filtered = False

    q = request.args.get("q", type=str, default=None)
    query = m.InboundOrder.select().order_by(desc(m.InboundOrder.id))
    count_query = sa.select(sa.func.count()).select_from(m.InboundOrder)
    if q:
        query = query.where(
            m.InboundOrder.title.ilike(f"%{q}%")
            | m.InboundOrder.order_id.ilike(f"%{q}%")
        )
        count_query = count_query.where(
            m.InboundOrder.title.ilike(f"%{q}%")
            | m.InboundOrder.order_id.ilike(f"%{q}%")
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    inbound_orders = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )

    return render_template(
        "incoming_stock/incoming_stocks.html",
        inbound_orders=inbound_orders,
        page=pagination,
        search_query=q,
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)),
        warehouses=db.session.scalars(m.Warehouse.select().order_by(m.Warehouse.id)),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)),
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        filtered=filtered,
        inbound_orders_status=s.InboundOrderStatus,
    )


@incoming_stock_blueprint.route("/accept", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def accept():
    form_edit: f.PackageInfoForm = f.PackageInfoForm()

    if not form_edit.validate_on_submit():
        log(log.WARNING, "Form is not valid: [%s]", form_edit.errors)
        flash("Form is not valid", "danger")
        return redirect(url_for("incoming_stock.get_all"))

    inbound_order: m.InboundOrder = db.session.get(
        m.InboundOrder, form_edit.inbound_order_id.data
    )
    if not inbound_order:
        log(
            log.INFO,
            "There is no inbound order with id: [%s]",
            form_edit.inbound_order_id.data,
        )
        flash("There is no such inbound order", "danger")
        return redirect(url_for("incoming_stock.get_all"))

    products_info_json = s.IncomingStocks.model_validate_json(
        form_edit.received_products.data
    ).root

    report_inventory_list = m.ReportInventoryList(
        type="Inbound Order Accepted",
        # TODO who sholud be responsible for change?
        # one who created inbound order?
        # or one who accepted it?
        user_id=current_user.id,
        inbound_order=inbound_order,
        warehouse=inbound_order.warehouse,
    )
    report_inventory_list.save(False)

    for allocated_product in products_info_json:
        full_product_qty_received = 0
        allocated_product_obj = db.session.get(
            m.ProductAllocated, allocated_product.allocated_product_id
        )
        for new_package_info in allocated_product.packages:
            product_quantity_group: m.ProductQuantityGroup = db.session.scalar(
                m.ProductQuantityGroup.select().where(
                    m.ProductQuantityGroup.id
                    == new_package_info.product_quantity_group_id,
                    m.ProductQuantityGroup.product_allocated_id
                    == allocated_product.allocated_product_id,
                    m.ProductQuantityGroup.product_allocated.has(
                        m.ProductAllocated.inbound_order_id
                        == form_edit.inbound_order_id.data
                    ),
                )
            )
            if not product_quantity_group:
                log(
                    log.WARNING,
                    "There is no product_quantity_group with id: [%s]",
                    new_package_info.product_quantity_group_id,
                )
                flash("There is no such product_quantity_group", "danger")
                return redirect(url_for("incoming_stock.get_all"))

            if new_package_info.quantity_received != product_quantity_group.quantity:
                log(
                    log.INFO,
                    "Inbound order accepted! Ordered quantity: [%s], != received quantity: [%s]",
                    product_quantity_group.quantity,
                    new_package_info.quantity_received,
                )
                flash(
                    f"Inbound order accepted! Ordered qty: {product_quantity_group.quantity}, \
                        != received qty: {new_package_info.quantity_received}",
                    "warning",
                )

            product_quantity_group.quantity_received = (
                new_package_info.quantity_received
            )
            full_product_qty_received += new_package_info.quantity_received

            # update or create package info
            if product_quantity_group.package_info_id:
                product_quantity_group.package_info.quantity_carton_master = (
                    new_package_info.quantity_carton_master
                )
                product_quantity_group.package_info.quantity_per_wrap = (
                    new_package_info.quantity_per_wrap
                )
                product_quantity_group.package_info.quantity_wrap_carton = (
                    new_package_info.quantity_wrap_carton
                )
            else:
                create_package_info = m.PackageInfo(
                    quantity_carton_master=new_package_info.quantity_carton_master,
                    quantity_per_wrap=new_package_info.quantity_per_wrap,
                    quantity_wrap_carton=new_package_info.quantity_wrap_carton,
                    product_quantity_group_id=product_quantity_group.id,
                )
                create_package_info.save(False)

            # update or create warehouse product
            warehouse_product: m.WarehouseProduct = db.session.scalar(
                m.WarehouseProduct.select().where(
                    m.WarehouseProduct.product_id
                    == product_quantity_group.product_allocated.product_id,
                    m.WarehouseProduct.warehouse_id == inbound_order.warehouse_id,
                    m.WarehouseProduct.group_id == product_quantity_group.group_id,
                )
            )
            if warehouse_product:
                qty_before = warehouse_product.product_quantity
                warehouse_product.product_quantity += new_package_info.quantity_received
            else:
                warehouse_product = m.WarehouseProduct(
                    product_id=product_quantity_group.product_allocated.product_id,
                    warehouse_id=inbound_order.warehouse_id,
                    product_quantity=new_package_info.quantity_received,
                    group_id=product_quantity_group.group_id,
                )
                qty_before = 0

            warehouse_product.save(False)

            # NOTE create report for inventory
            report_inventory = m.ReportInventory(
                qty_before=qty_before,
                qty_after=new_package_info.quantity_received,
                report_inventory_list_id=report_inventory_list.id,
                product_id=warehouse_product.product_id,
                warehouse_product=warehouse_product,
            )
            report_inventory.save(False)

            m.ReportSKU(
                qty_before=qty_before,
                qty_after=new_package_info.quantity_received,
                product_id=product_quantity_group.product_allocated.product_id,
                inbound_order=inbound_order,
                type=s.ReportSKUType.inbound_order.value,
                status="Inbound order accepted",
                warehouse_product=warehouse_product,
            ).save(False)

        allocated_product_obj.quantity_received = full_product_qty_received
        allocated_product_obj.quantity_remains = full_product_qty_received
        allocated_product_obj.save(False)

    inbound_order.status = s.InboundOrderStatus.delivered
    log(log.INFO, "Inbound order accepted. Inbound order: [%s]", inbound_order)

    db.session.commit()

    return redirect(url_for("incoming_stock.get_all"))


@incoming_stock_blueprint.route("/cancel/<int:id>", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def cancel(id: int):
    io: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(m.InboundOrder.id == id)
    )
    if not io:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404
    io.status = s.InboundOrderStatus.cancelled
    io.save()

    log(log.INFO, "Inbound order cancelled. Inbound order: [%s]", io)
    flash("Inbound order cancelled!", "success")
    return "ok", 200


@incoming_stock_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def sort():
    # TODO: move to incoming stocks get request
    if (
        request.method == "GET"
        and request.args.get("page", type=str, default=None) is None
    ):
        flash("Sort without any arguments", "danger")
        return redirect(url_for("incoming_stock.get_all"))
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create = f.InboundOrderCreateForm()
    form_edit = f.InboundOrderUpdateForm()
    if not form_sort.validate_on_submit() and request.method == "POST":
        # NOTE: this is drop filters action
        return redirect(url_for("incoming_stock.get_all"))

    filtered = True
    status = form_sort.sort_by.data if request.method == "POST" else "Draft"

    q = request.args.get("q", type=str, default=None)
    query = (
        m.InboundOrder.select()
        .where(m.InboundOrder.status == s.InboundOrderStatus(status))
        .order_by(m.InboundOrder.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.InboundOrder.status == s.InboundOrderStatus(status))
        .select_from(m.InboundOrder)
    )
    if q:
        query = query.where(
            m.InboundOrder.title.ilike(f"%{q}%")
            | m.InboundOrder.quantity.ilike(f"%{q}%"),
        )

        count_query = count_query.where(
            m.InboundOrder.title.ilike(f"%{q}%")
            | m.InboundOrder.quantity.ilike(f"%{q}%"),
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "incoming_stock/incoming_stocks.html",
        inbound_orders=db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ),
        page=pagination,
        search_query=q,
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)).all(),
        delivery_agents=db.session.scalars(
            m.DeliveryAgent.select().order_by(m.DeliveryAgent.id)
        ).all(),
        warehouses=db.session.scalars(
            m.Warehouse.select().order_by(m.Warehouse.id)
        ).all(),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)).all(),
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        filtered=filtered,
        inbound_orders_status=s.InboundOrderStatus,
    )


@incoming_stock_blueprint.route("/notes", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def notes():
    form_note: f.InboundOrderPickupForm = f.InboundOrderPickupForm()

    if not form_note.validate_on_submit():
        log(log.ERROR, "Incoming stock form errors: [%s]", form_note.errors)
        flash(f"{form_note.errors}", "danger")
        return redirect(url_for("incoming_stock.get_all"))

    inbound_order: m.InboundOrder = db.session.get(
        m.InboundOrder, int(form_note.inbound_order_id.data)
    )

    if not inbound_order:
        log(
            log.INFO,
            "There is no inbound order with id: [%s]",
            form_note.inbound_order_id.data,
        )
        flash("There is no such inbound order", "danger")
        return redirect(url_for("incoming_stock.get_all"))

    inbound_order.wm_notes = form_note.wm_notes.data
    inbound_order.save()

    log(log.INFO, "Warehouse manager notes updated. Inbound order: [%s]", inbound_order)
    flash("Warehouse manager notes updated!", "success")
    return redirect(url_for("incoming_stock.get_all"))
