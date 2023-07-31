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


# NOTE pickup inbound IS inbound order. Meaning goods going from supplier to warehouse
pickup_inbound_blueprint = Blueprint(
    "pickup_inbound", __name__, url_prefix="/pickup_inbound"
)


@pickup_inbound_blueprint.route("/", methods=["GET"])
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

    inbound_orders = [
        i
        for i in db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars()
    ]
    package_info = [
        p
        for p in db.session.execute(
            m.PackageInfo.select().order_by(m.PackageInfo.id)
        ).scalars()
    ]
    package_info_by_io = {pi.inbound_order_id: pi for pi in package_info}

    return render_template(
        "pickup_inbound/pickup_inbounds.html",
        inbound_orders=inbound_orders,
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
        package_info_by_io=package_info_by_io,
        form_create=form_create,
        form_edit=form_edit,
    )


@pickup_inbound_blueprint.route("/pickup/<int:id>", methods=["GET"])
@login_required
def pickup(id: int):
    io: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(m.InboundOrder.id == id)
    )
    if not io:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404
    io.status = "In transit"
    io.save()

    log(log.INFO, "Inbound order pickup done. Inbound order: [%s]", io)
    flash("Inbound order pickup done!", "success")
    return "ok", 200


@pickup_inbound_blueprint.route("/package_info", methods=["POST"])
@login_required
def package_info():
    form_edit: f.PackageInfoForm = f.PackageInfoForm()
    if not form_edit.validate_on_submit():
        return redirect(url_for("pickup_inbound.get_all"))
    if form_edit.validate_on_submit():
        package_info: m.PackageInfo = db.session.execute(
            m.PackageInfo.select()
            .order_by(m.PackageInfo.id)
            .where(m.PackageInfo.inbound_order_id == form_edit.inbound_order_id.data)
        ).scalar()
        if package_info:
            package_info.quantity_carton_master = form_edit.quantity_carton_master.data
            package_info.quantity_per_wrap = form_edit.quantity_per_wrap.data
            package_info.quantity_wrap_carton = form_edit.quantity_wrap_carton.data
            package_info.save()
        else:
            package_info = m.PackageInfo(
                inbound_order_id=int(form_edit.inbound_order_id.data),
                quantity_carton_master=form_edit.quantity_carton_master.data,
                quantity_per_wrap=form_edit.quantity_per_wrap.data,
                quantity_wrap_carton=form_edit.quantity_wrap_carton.data,
            )
            package_info.save()
        # NOTE: json list of dicts with product_id and quantity.
        recieved_products = json.loads(form_edit.recieved_products.data)
        type(recieved_products)
        return redirect(url_for("pickup_inbound.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("inbound_order.get_all"))
