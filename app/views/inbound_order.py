import datetime
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
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log


inbound_order_blueprint = Blueprint(
    "inbound_order", __name__, url_prefix="/inbound_order"
)


@inbound_order_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewInboundOrderForm = f.NewInboundOrderForm()
    form_edit: f.InboundOrderForm = f.InboundOrderForm()

    q = request.args.get("q", type=str, default=None)
    query = m.InboundOrder.select().order_by(m.InboundOrder.id)
    count_query = sa.select(sa.func.count()).select_from(m.InboundOrder)
    if q:
        query = (
            m.InboundOrder.select()
            .where(
                m.InboundOrder.order_title.like(f"{q}%")
                | m.InboundOrder.quantity.like(f"{q}%")
            )
            .order_by(m.InboundOrder.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(
                m.InboundOrder.order_title.like(f"{q}%")
                | m.InboundOrder.quantity.like(f"{q}%")
            )
            .select_from(m.InboundOrder)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "inbound_order/inbound_orders.html",
        inbound_orders=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        suppliers=[
            s
            for s in db.session.execute(
                m.Supplier.select().order_by(m.Supplier.id)
            ).scalars()
        ],
        delivery_agents=[
            da
            for da in db.session.execute(
                m.DeliveryAgent.select().order_by(m.DeliveryAgent.id)
            ).scalars()
        ],
        warehouses=[
            w
            for w in db.session.execute(
                m.Warehouse.select().order_by(m.Warehouse.id)
            ).scalars()
        ],
        products=[
            p
            for p in db.session.execute(
                m.Product.select().order_by(m.Product.id)
            ).scalars()
        ],
        groups=[
            g
            for g in db.session.execute(m.Group.select().order_by(m.Group.id)).scalars()
        ],
        form_create=form_create,
        form_edit=form_edit,
    )


@inbound_order_blueprint.route("/save", methods=["POST"])
@login_required
def save():
    form: f.InboundOrderForm = f.InboundOrderForm()
    if form.validate_on_submit():
        query = m.InboundOrder.select().where(
            m.InboundOrder.id == int(form.inbound_order_id.data)
        )
        io: m.InboundOrder | None = db.session.scalar(query)
        if not io:
            log(
                log.ERROR,
                "Not found inbound_order by id : [%s]",
                form.inbound_order_id.data,
            )
            flash("Cannot save inbound order data", "danger")

        io.active_date = datetime.datetime.strptime(form.active_date.data, "%m/%d/%Y")
        io.active_time = form.active_time.data
        io.order_title = form.order_title.data
        io.delivery_date = datetime.datetime.strptime(
            form.delivery_date.data, "%m/%d/%Y"
        )
        io.status = form.status.data
        io.supplier_id = form.supplier_id.data
        io.delivery_agent_id = form.delivery_agent_id.data
        io.warehouse_id = form.warehouse_id.data
        io.save()

        # save delivered product quantity, so this product would be available in warehouse
        products = json.loads(form.products.data)

        for product in products:
            product_quantity_group: m.ProductQuantityGroup = db.session.execute(
                m.ProductQuantityGroup.select().where(
                    m.ProductQuantityGroup.product_id == product["product_id"],
                    m.ProductQuantityGroup.group_id == product["group_id"],
                    m.ProductQuantityGroup.warehouse_id == io.warehouse_id,
                    m.ProductQuantityGroup.inbound_order_id == io.id,
                )
            ).scalar()
            if product_quantity_group:
                product_quantity_group.quantity = int(product["quantity"])
                product_quantity_group.group_id = product["group_id"]
                product_quantity_group.save()
            else:
                product_quantity_group = m.ProductQuantityGroup(
                    product_id=product["product_id"],
                    warehouse_id=io.warehouse_id,
                    group_id=product["group_id"],
                    quantity=int(product["quantity"]),
                    inbound_order_id=io.id,
                )
                product_quantity_group.save()
        # NOTE remove product quantity group if it is not in products
        product_quantity_group_rm: list[m.ProductQuantityGroup] = db.session.execute(
            m.ProductQuantityGroup.select().where(
                m.ProductQuantityGroup.warehouse_id == io.warehouse_id,
                m.ProductQuantityGroup.inbound_order_id == io.id,
            )
        ).scalars()
        product_ids = [p["product_id"] for p in products]
        group_ids = [p["group_id"] for p in products]

        for product in product_quantity_group_rm:
            if (
                str(product.product_id) not in product_ids
                and str(product.group_id) not in group_ids
            ):
                delete_p = sa.delete(m.ProductQuantityGroup).where(
                    m.ProductQuantityGroup.id == product.id,
                )
                db.session.execute(delete_p)
                db.session.commit()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("inbound_order.get_all"))

    else:
        log(log.ERROR, "inbound_order save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("inbound_order.get_all"))


@inbound_order_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewInboundOrderForm = f.NewInboundOrderForm()
    if not form.validate_on_submit():
        flash("This order id is already taken.", "danger")
        return redirect(url_for("inbound_order.get_all"))
    if form.validate_on_submit():
        inbound_order = m.InboundOrder(
            order_id=f"IO-BEAM-{int(datetime.datetime.now().timestamp())}",
            active_date=datetime.datetime.strptime(form.active_date.data, "%m/%d/%Y"),
            active_time=form.active_time.data,
            order_title=form.order_title.data,
            delivery_date=datetime.datetime.strptime(
                form.delivery_date.data, "%m/%d/%Y"
            ),
            status=form.status.data,
            supplier_id=form.supplier_id.data,
            warehouse_id=form.warehouse_id.data,
            product_id=form.product_id.data,
            delivery_agent_id=form.delivery_agent_id.data,
        )
        log(log.INFO, "Form submitted. Inbound order: [%s]", inbound_order)
        flash("Inbound order added!", "success")
        inbound_order.save()

        return redirect(url_for("inbound_order.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("inbound_order.get_all"))


@inbound_order_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    io = db.session.scalar(m.InboundOrder.select().where(m.InboundOrder.id == id))
    if not io:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404

    delete_io = sa.delete(m.InboundOrder).where(m.InboundOrder.id == id)
    db.session.execute(delete_io)
    db.session.commit()
    log(log.INFO, "Inbound order deleted. Inbound order: [%s]", io)
    flash("Inbound order deleted!", "success")
    return "ok", 200
