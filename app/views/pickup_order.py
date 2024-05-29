from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    current_app as app,
)
from flask_login import login_required, current_user
from flask_mail import Message
import sqlalchemy as sa
from sqlalchemy import desc
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db, mail
from app import forms as f
from app.logger import log
from app.constants import DELIVERY_AGENT_ROLES

# NOTE pickup order IS ship request. Meaning good going from warehouse to store
pickup_order_blueprint = Blueprint("pickup_order", __name__, url_prefix="/pickup_order")


@pickup_order_blueprint.route("/", methods=["GET"])
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def get_all():
    # TODO needs to refactor
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
    warehouses_rows = db.session.execute(sa.select(m.Warehouse)).scalars()
    warehouses = [{"name": w.name, "id": w.id} for w in warehouses_rows]

    return render_template(
        "pickup_order/pickup_orders.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        warehouses=warehouses,
        ship_requests_status=s.ShipRequestStatus,
    )


@pickup_order_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def save():
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if not form_edit.validate_on_submit():
        log(log.ERROR, "Cart item save errors: [%s]", form_edit.errors)
        flash(f"{form_edit.errors}", "danger")
        return redirect(url_for("pickup_order.get_all"))

    ship_request = db.session.get(m.ShipRequest, int(form_edit.ship_request_id.data))
    if not ship_request:
        log(
            log.ERROR,
            "Not found ship request item by id : [%s]",
            form_edit.ship_request_id.data,
        )
        flash("Cannot save item data", "danger")
        return redirect(url_for("pickup_order.get_all"))

    if ship_request.status == s.ShipRequestStatus.in_transit:
        flash("Cannot edit ship request in transit", "danger")
        return redirect(url_for("pickup_order.get_all"))

    ship_request.da_notes = form_edit.da_notes.data
    ship_request.status = s.ShipRequestStatus.in_transit

    report_shipping = m.ReportShipping(
        type=s.ReportShipRequestActionType.PICKED_UP.value,
        ship_request=ship_request,
        user=current_user,
    )
    db.session.add(report_shipping)
    # TODO should we report SKU on pickup??
    # for cart in ship_request.carts:
    # m.ReportSKU(
    #         product_id=cart.product_id,
    #         ship_request=ship_request,
    #         type=s.ReportSKUType.ship_request.value,
    #         status="Ship request created.",
    #     ).save(False)
    ship_request.save()

    if form_edit.next_url.data:
        return redirect(form_edit.next_url.data)
    return redirect(url_for("pickup_order.get_all"))


@pickup_order_blueprint.route("/update_notes", methods=["POST"])
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def update_notes():
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if not form_edit.validate_on_submit():
        log(log.ERROR, "Ship request item save errors: [%s]", form_edit.da_notes.data)
        flash("Note for warehouse manager has not been updated", "danger")
        return redirect(url_for("pickup_order.get_all"))
    ship_request = db.session.get(m.ShipRequest, form_edit.ship_request_id.data)
    if not ship_request:
        log(
            log.ERROR,
            "Not found ship request item by id : [%s]",
            form_edit.ship_request_id.data,
        )
        flash("Cannot save item data", "danger")
        return redirect(url_for("pickup_order.get_all"))

    ship_request.proof_of_delivery = form_edit.proof_of_delivery.data
    ship_request.tracking = form_edit.tracking.data

    if form_edit.da_notes.data:
        ship_request.da_notes = form_edit.da_notes.data
        ship_request.save()
        log(log.INFO, "Ship Request note updated. Ship Request: [%s]", ship_request)
        flash("Note has been updated!", "success")
        return redirect(url_for("pickup_order.get_all"))

    ship_request.save()

    if form_edit.next_url.data:
        log(log.INFO, "Redirecting to: [%s]", form_edit.next_url.data)
        return redirect(form_edit.next_url.data)
    return redirect(url_for("pickup_order.get_all"))


@pickup_order_blueprint.route("/deliver/<int:id>", methods=["GET"])
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def deliver(id: int):
    ship_request: m.ShipRequest = db.session.scalar(
        m.ShipRequest.select().where(m.ShipRequest.id == id)
    )
    if not ship_request:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    ship_request.status = s.ShipRequestStatus.delivered
    report_shipping = m.ReportShipping(
        type=s.ReportShipRequestActionType.DELIVERED.value,
        user=current_user,
        ship_request=ship_request,
    )
    db.session.add(report_shipping)
    db.session.commit()

    if ship_request.user.is_notify_shipping:
        msg = Message(
            subject=f"Ship request delivered {ship_request.order_numb}",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[ship_request.user.email],
        )
        url = (
            url_for(
                "ship_request.get_all",
                _external=True,
            )
            + f"?q={ship_request.order_numb}"
        )

        msg.html = render_template(
            "email/ship_request.html",
            user=ship_request.user,
            ship_request=ship_request,
            url=url,
        )
        mail.send(msg)

    log(log.INFO, "Ship Request delivered. Ship Request: [%s]", ship_request)
    flash("Ship Request delivered!", "success")
    return "ok", 200


# TODO: need refactor
@pickup_order_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
@role_required(DELIVERY_AGENT_ROLES)
def sort():
    # TODO: handle GET request without
    if (
        request.method == "GET"
        and request.args.get("page", type=str, default=None) is None
    ):
        flash("Sort without any arguments", "danger")
        return redirect(url_for("pickup_order.get_all"))
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    if not form_sort.validate_on_submit() and request.method == "POST":
        # NOTE: this is drop filters action
        return redirect(url_for("pickup_order.get_all"))

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
        )
        for spr in ship_requests
    }
    warehouses_rows = db.session.scalars(sa.select(m.Warehouse))
    warehouses = [{"name": w.name, "id": w.id} for w in warehouses_rows]

    return render_template(
        "pickup_order/pickup_orders.html",
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
