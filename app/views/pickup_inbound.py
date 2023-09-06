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

from app import schema as s
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
    form_create = f.InboundOrderCreateForm()
    form_edit = f.InboundOrderUpdateForm()
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()

    q = request.args.get("q", type=str, default=None)
    query = m.InboundOrder.select().order_by(m.InboundOrder.id)
    count_query = sa.select(sa.func.count()).select_from(m.InboundOrder)
    if q:
        query = query.where(
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.order_id.ilike(f"%{q}%")
        )

        count_query = count_query.where(
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.order_id.ilike(f"%{q}%")
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    inbound_orders = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )

    return render_template(
        "pickup_inbound/pickup_inbounds.html",
        inbound_orders=inbound_orders,
        page=pagination,
        search_query=q,
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)),
        delivery_agents=db.session.scalars(
            m.DeliveryAgent.select().order_by(m.DeliveryAgent.id)
        ),
        warehouses=db.session.scalars(m.Warehouse.select().order_by(m.Warehouse.id)),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)),
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        inbound_orders_status=s.InboundOrderStatus,
    )


@pickup_inbound_blueprint.route("/pickup/<int:id>", methods=["GET"])  # TODO GET -> PUT
@login_required
def pickup(id: int):
    inbound_order: m.InboundOrder = db.session.get(m.InboundOrder, id)
    if not inbound_order:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404
    inbound_order.status = s.InboundOrderStatus.in_transit  # TODO remove
    inbound_order.save()

    log(log.INFO, "Inbound order pickup done. Inbound order: [%s]", inbound_order)
    flash("Inbound order pickup done!", "success")
    return "ok", 200


@pickup_inbound_blueprint.route(
    "/sort", methods=["GET", "POST"]
)  # TODO move pickup inbound sort to GET with params
@login_required
def sort():
    if (
        request.method == "GET"
        and request.args.get("page", type=str, default=None) is None
    ):
        flash("Sort without any arguments", "danger")
        return redirect(url_for("pickup_inbound.get_all"))
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create = f.InboundOrderCreateForm()
    form_edit = f.InboundOrderUpdateForm()
    if not form_sort.validate_on_submit() and request.method == "POST":
        # NOTE: this is drop filters action
        return redirect(url_for("pickup_inbound.get_all"))

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
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.quantity.ilike(f"%{q}%"),
        )

        count_query = count_query.where(
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.quantity.ilike(f"%{q}%"),
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    inbound_orders = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).all()
    package_info = db.session.scalars(
        m.PackageInfo.select().order_by(m.PackageInfo.id)
    ).all()
    package_info_by_io = {pi.inbound_order_id: pi for pi in package_info}

    return render_template(
        "pickup_inbound/pickup_inbounds.html",
        inbound_orders=inbound_orders,
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
        package_info_by_io=package_info_by_io,  # TODO need's refactor
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        filtered=filtered,
        inbound_orders_status=s.ShipRequestStatus,
    )
