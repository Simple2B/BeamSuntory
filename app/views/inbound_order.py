import json
from datetime import datetime

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
from pydantic import ValidationError

from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


inbound_order_blueprint = Blueprint(
    "inbound_order", __name__, url_prefix="/inbound_order"
)


@inbound_order_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_create = f.InboundOrderUpdateForm()
    form_edit = f.InboundOrderUpdateForm()
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()

    q = request.args.get("q", type=str, default=None)
    current_order_uuid = request.args.get("current_order_uuid", type=str, default=None)
    query = m.InboundOrder.select().order_by(desc(m.InboundOrder.id))

    if current_order_uuid:
        query = query.where(m.InboundOrder.uuid != current_order_uuid)

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

    # TODO pydantic!!
    inbound_orders_json = json.dumps(
        [
            json.loads(io.json)
            for io in db.session.scalars(
                m.InboundOrder.select().order_by(m.InboundOrder.id)
            )
        ]
    )

    current_inbound_order = (
        db.session.scalar(
            m.InboundOrder.select().where(m.InboundOrder.uuid == current_order_uuid)
        )
        if current_order_uuid
        else None
    )

    groups = db.session.scalars(
        m.Group.select().where(m.Group.parent_group_id.is_(None)).order_by(m.Group.name)
    ).all()

    return render_template(
        "inbound_order/inbound_orders.html",
        current_inbound_order=current_inbound_order,
        inbound_orders=db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).all(),
        inbound_orders_json=inbound_orders_json,
        page=pagination,
        search_query=q,
        suppliers=db.session.scalars(
            m.Supplier.select().order_by(m.Supplier.name)
        ).all(),
        warehouses=db.session.scalars(
            m.Warehouse.select().order_by(m.Warehouse.name)
        ).all(),
        products=db.session.scalars(m.Product.select().order_by(m.Product.name)).all(),
        groups=groups,
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        inbound_order_statuses=s.InboundOrderStatus,
    )


@inbound_order_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def create():
    form = f.InboundOrderCreateForm()

    if not form.validate_on_submit():
        flash(f"Inbound order validation failed: {form.errors}", "danger")
        log(log.INFO, "Inbound order validation failed: [%s]", form.errors)
        return redirect(url_for("inbound_order.get_all"))

    # Get supplier
    supplier = db.session.get(m.Supplier, form.supplier_id.data)
    if not supplier:
        flash(f"Supplier with id: {form.supplier_id.data} not found")
        log(
            log.INFO,
            "Inbound order validation failed: cannot find supplier with id [%s]",
            form.supplier_id.data,
        )
        return redirect(url_for("inbound_order.get_all"))

    # Get warehouse
    warehouse = db.session.get(m.Warehouse, form.warehouse_id.data)
    if not warehouse:
        flash(f"Warehouse with id: {form.warehouse_id.data} not found")
        log(
            log.INFO,
            "Inbound order validation failed: cannot find warehouse with id [%s]",
            form.warehouse_id.data,
        )
        return redirect(url_for("inbound_order.get_all"))

    # Create order
    inbound_order = m.InboundOrder(
        active_date=form.active_date.data,
        active_time=form.active_time.data,
        title=form.order_title.data,
        delivery_date=form.delivery_date.data,
        supplier=supplier,
        warehouse=warehouse,
    )

    # save delivered product quantity, so this product would be available in warehouse
    products_data = s.ProductAllocatedList.model_validate_json(form.products.data)
    for product_data in products_data.root:
        product = db.session.get(m.Product, product_data.id)
        # Find product
        if not product:
            flash(f"Product with id: {product_data.id} not found")
            log(
                log.INFO,
                "Inbound order validation failed: cannot find product with id [%s]",
                product_data.id,
            )
            return redirect(url_for("inbound_order.get_all"))
        # Allocate product with all data
        inbound_order.products_allocated.append(
            m.ProductAllocated(
                product=product,
                quantity=product_data.quantity,
                shelf_life_start=product_data.shelf_life_start,
                shelf_life_end=product_data.shelf_life_end,
            )
        )
        m.ReportSKU(
            product=product,
            inbound_order=inbound_order,
            type=s.ReportSKUType.inbound_order.value,
            status="Allocation created",
        ).save(False)

    inbound_order.save()
    inbound_order.set_order_id()
    db.session.commit()

    report_inbound_order = m.ReportInboundOrder(
        type=s.ReportEventType.created.value,
        history="",
        inbound_order_id=inbound_order.id,
        user_id=current_user.id,
        created_at=inbound_order.created_at,
    )

    log(log.INFO, "Form submitted. Inbound order: [%s]", inbound_order)

    report_inbound_order.save()
    flash("Inbound order added!", "success")

    return redirect(
        url_for("inbound_order.get_all", current_order_uuid=inbound_order.uuid)
    )


@inbound_order_blueprint.route("/<inbound_order_id>/view", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_view(inbound_order_id: int):
    inbound_order = db.session.get(m.InboundOrder, inbound_order_id)
    if not inbound_order:
        log(log.INFO, "Inbound order not found with id: [%s]", inbound_order_id)
        return render_template(
            "toast.html", message="Inbound order not found", category="danger"
        )
    return render_template("inbound_order/modal_view.html", inbound_order=inbound_order)


@inbound_order_blueprint.route("/save", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def save():
    form = f.InboundOrderUpdateForm()

    if not form.validate_on_submit():
        log(log.ERROR, "inbound_order save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(
            url_for(
                "inbound_order.get_all",
                current_order_uuid=form.inbound_order_uuid.data,
            )
        )

    inbound_order: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(
            m.InboundOrder.uuid == form.inbound_order_uuid.data
        )
    )
    # Check if inbound order exists
    if not inbound_order:
        log(
            log.ERROR,
            "Not found inbound_order by uuid : [%s]",
            form.inbound_order_uuid.data,
        )
        flash("Cannot save inbound order data", "danger")
        return redirect(url_for("inbound_order.get_all"))

    # check supplier
    supplier = db.session.get(m.Supplier, form.supplier_id.data)
    if not supplier:
        log(
            log.ERROR,
            "Not found supplier with id : [%s]",
            form.supplier_id.data,
        )
        flash("Cannot save inbound order data, no supplier found", "danger")
        return redirect(url_for("inbound_order.get_all"))

    # check warehouse
    warehouse = db.session.get(m.Warehouse, form.warehouse_id.data)
    if not warehouse:
        log(
            log.ERROR,
            "Not found warehouse with id : [%s]",
            form.warehouse_id.data,
        )
        flash("Cannot save inbound order data, no warehouse found", "danger")
        return redirect(url_for("inbound_order.get_all"))

    try:
        product_quantity_groups = s.ProductQuantityGroupsCreate.model_validate_json(
            form.product_groups.data
        )
    except ValidationError:
        log(
            log.ERROR,
            "Wrong quantity groups json format: [%s]",
            form.product_groups.data,
        )
        flash("Cannot save inbound order data, wrong quantity groups ", "danger")
        return redirect(
            url_for(
                "inbound_order.get_all",
                current_order_uuid=inbound_order.uuid,
            )
        )

    history_pure = []
    history_modified = []

    # add history to report
    if inbound_order.status != s.InboundOrderStatus(form.status.data):
        history_modified.append(
            f"Status: {s.InboundOrderStatus(inbound_order.status).value} => {form.status.data}"
        )

    if inbound_order.active_date != form.active_date.data:
        history_modified.append(
            f"Active date: {inbound_order.active_date} => {form.active_date.data}"
        )
    if inbound_order.active_time != form.active_time.data:
        history_modified.append(
            f"Active time: {inbound_order.active_time} => {form.active_time.data}"
        )
    if inbound_order.title != form.order_title.data:
        history_modified.append(
            f"Title: {inbound_order.title} => {form.order_title.data}"
        )
    if inbound_order.delivery_date != form.delivery_date.data:
        history_modified.append(
            f"Delivery date:{inbound_order.delivery_date}=>{form.delivery_date.data}"
        )

    inbound_order.active_date = form.active_date.data
    inbound_order.active_time = form.active_time.data
    inbound_order.title = form.order_title.data
    inbound_order.delivery_date = form.delivery_date.data
    inbound_order.status = s.InboundOrderStatus(form.status.data)

    inbound_order.supplier = supplier
    inbound_order.warehouse = warehouse

    for product_allocated in inbound_order.products_allocated:
        for quantity_groups in product_allocated.product_quantity_groups:
            history_pure.append(
                f"""Group: {quantity_groups.group.name} to product: {product_allocated.product.name.upper()}"""
            )

    for product_quantity_group in product_quantity_groups.root:
        product_allocated: m.ProductAllocated = db.session.scalar(
            m.ProductAllocated.select().where(
                m.ProductAllocated.id == product_quantity_group.product_allocated_id,
                m.ProductAllocated.inbound_order_id == inbound_order.id,
            )
        )

        if not product_allocated:
            log(
                log.ERROR,
                "Inbound order's allocated product not found: [%s] [%s]",
                inbound_order.id,
                product_quantity_group.product_allocated_id,
            )
            flash(
                "Cannot save inbound order data, Inbound order's allocated product not found",
                "danger",
            )
            return redirect(url_for("inbound_order.get_all"))
        product_allocated.quantity = product_quantity_group.product_allocated_quantity

        db.session.execute(
            m.ProductQuantityGroup.delete().where(
                m.ProductQuantityGroup.product_allocated_id == product_allocated.id
            )
        )

        for product_group in product_quantity_group.product_allocated_groups:
            group = db.session.get(m.Group, product_group.group_id)
            history_modified.append(
                f"""Group: {group.name} to product: {product_allocated.product.name.upper()}"""
            )

        for quantity_group in product_quantity_group.product_allocated_groups:
            # Search for group by id
            group = db.session.get(m.Group, quantity_group.group_id)
            if not group:
                log(
                    log.ERROR,
                    "Group not found: [%s]",
                    quantity_group.group_id,
                )
                flash("Cannot save inbound order data, group not found", "danger")
                return redirect(
                    url_for(
                        "inbound_order.get_all",
                        current_order_uuid=inbound_order.uuid,
                    )
                )

            db.session.add(
                m.ProductQuantityGroup(
                    group=group,
                    quantity=quantity_group.quantity,
                    product_allocated_id=product_allocated.id,
                )
            )
            if inbound_order.status == s.InboundOrderStatus.assigned:
                m.ReportSKU(
                    product_id=product_allocated.product_id,
                    inbound_order=inbound_order,
                    type=s.ReportSKUType.inbound_order.value,
                    status="Products allocated. Inbound order assigned.",
                ).save(False)

        if inbound_order.status == s.InboundOrderStatus.assigned:
            sum_all_quantity_groups = sum(
                [
                    allocated_product.quantity
                    for allocated_product in product_quantity_group.product_allocated_groups
                ]
            )

            if product_allocated.quantity != sum_all_quantity_groups:
                log(
                    log.ERROR,
                    "Invalid quantity groups sum: [%s] needs: [%s]",
                    sum_all_quantity_groups,
                    product_allocated.quantity,
                )
                flash(
                    "Allocated product quantity doesn't match groups total quantity",
                    "danger",
                )
                return redirect(
                    url_for(
                        "inbound_order.get_all",
                        current_order_uuid=inbound_order.uuid,
                    )
                )

    history = set(history_modified).symmetric_difference(set(history_pure))

    m.ReportInboundOrder(
        type=s.ReportEventType.updated.value,
        history=", ".join(history),
        inbound_order_id=inbound_order.id,
        user_id=current_user.id,
        created_at=datetime.now(),
    ).save(False)

    db.session.commit()
    if form.next_url.data:
        return redirect(form.next_url.data)
    return redirect(url_for("inbound_order.get_all"))


@inbound_order_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def delete(id: int):
    inbound_order: m.InboundOrder = db.session.get(m.InboundOrder, id)

    if not inbound_order:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404

    db.session.execute(
        m.ReportSKU.delete().where(m.ReportSKU.inbound_order_id == inbound_order.id)
    )

    db.session.execute(
        m.ReportInboundOrder.delete().where(
            m.ReportInboundOrder.inbound_order_id == inbound_order.id
        )
    )

    db.session.execute(
        m.PackageInfo.delete().where(
            m.PackageInfo.product_quantity_group.has(
                m.ProductQuantityGroup.product_allocated.has(
                    m.ProductAllocated.inbound_order_id == inbound_order.id,
                )
            )
        )
    )

    db.session.execute(
        m.ProductQuantityGroup.select().where(
            m.ProductAllocated.product_quantity_groups.any(
                m.ProductAllocated.inbound_order_id == inbound_order.id
            )
        )
    )

    db.session.delete(inbound_order)
    db.session.commit()

    db.session.execute(
        m.ProductAllocated.delete().where(
            m.ProductAllocated.inbound_order_id == inbound_order.id
        )
    )
    log(log.INFO, "Inbound order deleted. Inbound order: [%s]", inbound_order)
    flash("Inbound order deleted!", "success")
    return "ok", 200


@inbound_order_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
def sort():
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create = f.InboundOrderCreateForm()
    form_edit = f.InboundOrderUpdateForm()

    if not form_sort.validate_on_submit() and request.method == "POST":
        # NOTE: this is drop filters action
        return redirect(url_for("inbound_order.get_all"))

    status = form_sort.sort_by.data if request.method == "POST" else "Draft"

    q = request.args.get("q", type=str, default=None)
    query = (
        m.InboundOrder.select()
        .where(m.InboundOrder.status == s.InboundOrderStatus(status))
        .order_by(desc(m.InboundOrder.id))
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.InboundOrder.status == s.InboundOrderStatus(status))
        .select_from(m.InboundOrder)
    )
    if q:
        query = query.where(m.InboundOrder.title.ilike(f"%{q}%"))

        count_query = count_query.where(m.InboundOrder.title.ilike(f"%{q}%"))

    pagination = create_pagination(total=db.session.scalar(count_query))

    inbound_orders_json = json.dumps(
        [
            json.loads(io.json)
            for io in db.session.scalars(
                m.InboundOrder.select().order_by(desc(m.InboundOrder.id))
            )
        ]
    )

    return render_template(
        "inbound_order/inbound_orders.html",
        inbound_orders=db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).all(),
        inbound_orders_json=inbound_orders_json,
        page=pagination,
        search_query=q,
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)).all(),
        warehouses=db.session.scalars(
            m.Warehouse.select().order_by(m.Warehouse.id)
        ).all(),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)).all(),
        groups=db.session.scalars(m.Group.select().order_by(m.Group.id)).all(),
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        inbound_order_statuses=s.InboundOrderStatus,
        selected_status=status,
    )
