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
from pydantic import ValidationError

from app.controllers import create_pagination

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


inbound_order_blueprint = Blueprint(
    "inbound_order", __name__, url_prefix="/inbound_order"
)


@inbound_order_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create = f.InboundOrderUpdateForm()
    form_edit = f.InboundOrderUpdateForm()

    q = request.args.get("q", type=str, default=None)
    current_order_uuid = request.args.get("current_order_uuid", type=str, default=None)
    query = m.InboundOrder.select().order_by(m.InboundOrder.id)

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
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)).all(),
        warehouses=db.session.scalars(
            m.Warehouse.select().order_by(m.Warehouse.id)
        ).all(),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)).all(),
        groups=db.session.scalars(m.Group.select().order_by(m.Group.id)).all(),
        form_create=form_create,
        form_edit=form_edit,
        inbound_order_statuses=s.InboundOrderStatus,
    )


@inbound_order_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form = f.InboundOrderCreateForm()
    if not form.validate_on_submit():
        flash(f"Inbound order validation failed: {form.errors}", "danger")
        log(log.INFO, "Inbound order validation failed: [%s]", form.errors)
        return redirect(url_for("inbound_order.get_all"))
    if form.validate_on_submit():
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
        products_data = s.ProductAllocatedList.parse_raw(form.products.data)
        for product_data in products_data.__root__:
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

        log(log.INFO, "Form submitted. Inbound order: [%s]", inbound_order)
        inbound_order.save()
        flash("Inbound order added!", "success")

        return redirect(
            url_for("inbound_order.get_all", current_order_uuid=inbound_order.uuid)
        )

    flash("Something went wrong!", "danger")
    return redirect(url_for("inbound_order.get_all"))


@inbound_order_blueprint.route("/save", methods=["POST"])
@login_required
def save():
    form = f.InboundOrderUpdateForm()
    if form.validate_on_submit():
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
            flash("Cannot save inbound order data", "danger")
            return redirect(url_for("inbound_order.get_all"))

        # check warehouse
        warehouse = db.session.get(m.Warehouse, form.warehouse_id.data)
        if not warehouse:
            log(
                log.ERROR,
                "Not found warehouse with id : [%s]",
                form.warehouse_id.data,
            )
            flash("Cannot save inbound order data", "danger")
            return redirect(url_for("inbound_order.get_all"))

        inbound_order.active_date = form.active_date.data
        inbound_order.active_time = form.active_time.data
        inbound_order.title = form.order_title.data
        inbound_order.delivery_date = form.delivery_date.data
        inbound_order.status = s.InboundOrderStatus(form.status.data)

        inbound_order.supplier = supplier
        inbound_order.warehouse = warehouse

        try:
            product_quantity_groups = s.ProductQuantityGroupsCreate.parse_raw(
                form.product_groups.data
            )
        except ValidationError:
            log(
                log.ERROR,
                "Wrong quantity groups json format: [%s]",
                form.product_groups.data,
            )
            flash("Cannot save inbound order data", "danger")
            return redirect(
                url_for(
                    "inbound_order.get_all",
                    current_order_uuid=inbound_order.uuid,
                )
            )

        for product_quantity_group in product_quantity_groups.__root__:
            product_allocated = db.session.scalar(
                m.ProductAllocated.select().where(
                    m.ProductAllocated.id
                    == product_quantity_group.product_allocated_id,
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
                flash("Cannot save inbound order data", "danger")
                return redirect(url_for("inbound_order.get_all"))

            db.session.execute(
                m.ProductQuantityGroup.delete().where(
                    m.ProductQuantityGroup.product_allocated_id == product_allocated.id
                )
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
                    flash("Cannot save inbound order data", "danger")
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
            for allocated_product in inbound_order.products_allocated:
                sumAllocatedQuantityGroups = sum(
                    [
                        group.quantity
                        for group in allocated_product.product_quantity_groups
                    ]
                )
                if allocated_product.quantity != sumAllocatedQuantityGroups:
                    log(
                        log.ERROR,
                        "Invalid quantity groups sum: [%s] needs: [%s]",
                        sumAllocatedQuantityGroups,
                        allocated_product.quantity,
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

        db.session.commit()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("inbound_order.get_all"))

    else:
        log(log.ERROR, "inbound_order save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("inbound_order.get_all"))


@inbound_order_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    # TODO needs to check for allocated products
    inbound_order: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(m.InboundOrder.id == id)
    )
    if not inbound_order:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404

    db.session.execute(
        m.ProductQuantityGroup.delete().where(
            m.ProductAllocated.product_quantity_groups.any(
                m.ProductAllocated.inbound_order_id == inbound_order.id
            )
        )
    )
    db.session.execute(
        m.PackageInfo.delete().where(m.PackageInfo.inbound_order_id == inbound_order.id)
    )
    db.session.execute(
        m.ProductAllocated.delete().where(
            m.ProductAllocated.inbound_order_id == inbound_order.id
        )
    )
    db.session.delete(inbound_order)
    db.session.commit()
    log(log.INFO, "Inbound order deleted. Inbound order: [%s]", inbound_order)
    flash("Inbound order deleted!", "success")
    return "ok", 200
