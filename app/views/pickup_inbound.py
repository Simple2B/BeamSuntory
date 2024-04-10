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
from sqlalchemy import desc
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log

from app.constants import DELIVERY_AGENT_ROLES

# NOTE pickup inbound IS inbound order. Meaning goods going from supplier to warehouse
pickup_inbound_blueprint = Blueprint(
    "pickup_inbound", __name__, url_prefix="/pickup_inbound"
)


def get_pickup_inbound():
    filter_pickup_inbound = s.FilterInboundOrder.model_validate(dict(request.args))

    query = m.InboundOrder.select().order_by(desc(m.InboundOrder.id))
    count_query = sa.select(sa.func.count()).select_from(m.InboundOrder)

    if filter_pickup_inbound.q:
        query = query.where(
            m.InboundOrder.title.ilike(f"%{filter_pickup_inbound.q}%")
            | m.InboundOrder.order_id.ilike(f"%{filter_pickup_inbound.q}%")
        )

        count_query = count_query.where(
            m.InboundOrder.title.ilike(f"%{filter_pickup_inbound.q}%")
            | m.InboundOrder.order_id.ilike(f"%{filter_pickup_inbound.q}%")
        )

    if filter_pickup_inbound.status:
        query = query.where(
            m.InboundOrder.status == s.InboundOrderStatus(filter_pickup_inbound.status)
        )

        count_query = count_query.where(
            m.InboundOrder.status == s.InboundOrderStatus(filter_pickup_inbound.status)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    orders = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, orders


@pickup_inbound_blueprint.route("/", methods=["GET"])
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def get_all():
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    return render_template(
        "pickup_inbound/pickup_inbounds.html",
        form_edit=form_edit,
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)),
        delivery_agents=db.session.scalars(
            m.DeliveryAgent.select().order_by(m.DeliveryAgent.id)
        ),
        warehouses=db.session.scalars(m.Warehouse.select().order_by(m.Warehouse.id)),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)),
        inbound_orders_status=s.InboundOrderStatus,
    )


@pickup_inbound_blueprint.route("/pickup", methods=["POST"])
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def pickup():
    form_pickup: f.InboundOrderPickupForm = f.InboundOrderPickupForm()

    if not form_pickup.validate_on_submit():
        log(log.ERROR, "Pickup inbound form errors: [%s]", form_pickup.errors)
        flash(f"{form_pickup.errors}", "danger")
        return redirect(url_for("pickup_inbound.get_all"))

    inbound_order: m.InboundOrder = db.session.get(
        m.InboundOrder, int(form_pickup.inbound_order_id.data)
    )

    if not inbound_order:
        log(
            log.INFO,
            "There is no inbound order with id: [%s]",
            form_pickup.inbound_order_id.data,
        )
        flash("There is no such inbound order", "danger")
        return redirect(url_for("pickup_inbound.get_all"))

    # new fields
    inbound_order.proof_of_delivery = form_pickup.proof_of_delivery.data
    inbound_order.tracking = form_pickup.tracking.data

    inbound_order.status = s.InboundOrderStatus.in_transit
    inbound_order.da_notes = form_pickup.da_notes.data
    inbound_order.save(False)

    report_skus: list[m.ReportSKU] = db.session.scalars(
        m.ReportSKU.select().where(
            m.ReportSKU.inbound_order_id == inbound_order.id,
            m.ReportSKU.status == "Products allocated. Inbound order assigned.",
        )
    )
    for report_sku in report_skus:
        m.ReportSKU(
            product_id=report_sku.product_id,
            inbound_order=inbound_order,
            type=s.ReportSKUType.inbound_order.value,
            status="Inbound order in transit",
        ).save(False)

    db.session.commit()

    log(log.INFO, "Inbound order pickup done. Inbound order: [%s]", inbound_order)
    flash("Inbound order pickup done!", "success")
    return redirect(url_for("pickup_inbound.get_all"))


@pickup_inbound_blueprint.route(
    "/sort", methods=["GET", "POST"]
)  # TODO move pickup inbound sort to GET with params
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def sort():
    pagination, orders = get_pickup_inbound()

    return render_template(
        "pickup_inbound/pickup_inbounds_table.html",
        page=pagination,
        orders=orders,
    )
