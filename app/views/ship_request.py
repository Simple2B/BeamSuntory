from datetime import datetime, timedelta
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
from app.controllers import create_pagination

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log

ship_request_blueprint = Blueprint("ship_request", __name__, url_prefix="/ship_request")


@ship_request_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    # TODO: refactor or delete comments in queries
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()

    store_category = aliased(m.StoreCategory)
    store = aliased(m.Store)
    q = request.args.get("q", type=str, default=None)
    query = m.ShipRequest.select().order_by(desc(m.ShipRequest.id))
    count_query = sa.select(sa.func.count()).select_from(m.ShipRequest)
    if q:
        query = (
            m.ShipRequest.select()
            .join(store, m.ShipRequest.store_id == store.id)
            .join(
                store_category,
                m.ShipRequest.store_category_id == store_category.id,
            )
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
            .join(store, m.ShipRequest.store_id == store.id)
            .join(
                store_category,
                m.ShipRequest.store_category_id == store_category.id,
            )
            .where(
                m.ShipRequest.order_numb.ilike(f"%{q}%")
                | m.ShipRequest.order_type.ilike(f"%{q}%")
                | store_category.name.ilike(f"%{q}%")
                | store.store_name.ilike(f"%{q}%")
            )
            .select_from(m.ShipRequest)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    ship_requests = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).all()

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
    store_categories = [
        sc for sc in db.session.execute(m.StoreCategory.select()).scalars()
    ]

    return render_template(
        "ship_request/ship_requests.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        warehouses=warehouses,
        store_categories=store_categories,
    )


@ship_request_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    if not form_create.validate_on_submit():
        flash("Validation failed", "danger")
        log(log.ERROR, "Validation failed: [%s]", form_create.errors)
        return redirect(url_for("ship_request.get_all"))
    if form_create.validate_on_submit():
        # TODO move into form validation
        event_date_range = form_create.event_date_range.data
        start_date = None
        end_date = None
        if event_date_range:
            current_date = datetime.now()
            date_from = event_date_range.split(" - ")[0]
            date_to = event_date_range.split(" - ")[1]
            start_date = datetime.strptime(date_from, "%Y-%m-%d")
            end_date = datetime.strptime(date_to, "%Y-%m-%d")
            difference_date = start_date - current_date

            if difference_date < timedelta(days=5):
                flash("The event must be created more than 5 days in advance", "danger")
                log(
                    log.INFO,
                    "The event must be created more than 5 days: [%s]",
                    start_date,
                )
                return redirect(url_for("product.get_all"))

        # Check for store
        store = db.session.get(m.Store, form_create.store.data)
        if not store:
            flash("Store not found", "danger")
            log(
                log.INFO,
                "Store not found: [%s]",
                form_create.store.data,
            )
            return redirect(url_for("product.get_all"))

        # Check for store category
        store_category = db.session.get(
            m.StoreCategory, form_create.store_category.data
        )
        if not store_category:
            flash("Store category not found", "danger")
            log(
                log.INFO,
                "Store category not found: [%s]",
                form_create.store_category.data,
            )
            return redirect(url_for("product.get_all"))

        # check if there are events in the ship request
        # if yes - create event report
        events_exist = False

        # Create ship request
        ship_request = m.ShipRequest(
            # NOTE: what status is default?
            # TODO make shiprequest status UPPERCASE (Enum)
            status=s.ShipRequestStatus.waiting_for_warehouse,
            store=store,
            store_category=store_category,
            comment=form_create.comment.data,
            # TODO: ask client about store_delivery
            order_type="store_delivery",
            user_id=current_user.id,
        )
        ship_request.save(False)

        # Create Report ship request
        report_shipping = m.ReportShipping(
            type=s.ReportShipRequestType.CREATED.value,
            ship_request=ship_request,
            user=current_user,
        )

        db.session.add(report_shipping)

        warehouse_event = db.session.scalar(
            m.Warehouse.select().where(
                m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value,
            )
        )

        carts: list[m.Cart] = db.session.scalars(
            m.Cart.select().where(
                m.Cart.user_id == current_user.id, m.Cart.status == "pending"
            )
        )

        for cart in carts:
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
            if event_date_range and is_group_in_master_group:
                report_event = m.ReportEvent(
                    # TODO make report event type UPPERCASE (Enum)
                    type=s.ReportEventType.created.value,
                    user=current_user,
                )
                events_exist = True
                # creation event
                event = m.Event(
                    date_reserve_from=start_date - timedelta(days=5),
                    date_reserve_to=end_date + timedelta(days=5),
                    date_from=start_date,
                    date_to=end_date,
                    quantity=cart.quantity,
                    product_id=cart.product_id,
                    cart_id=cart.id,
                    comment=form_create.event_comment.data,
                    user=current_user,
                )
                ship_request.report_event = report_event
                db.session.add(event)
                log(log.INFO, "Event added. Event: [%s]", event)

                cart.warehouse = warehouse_event

            m.ReportSKU(
                product_id=cart.product_id,
                ship_request=ship_request,
                type=s.ReportSKUType.ship_request.value,
                status="Ship request created.",
            ).save(False)

            cart.status = "submitted"
            cart.order_numb = ship_request.order_numb
            cart.ship_request_id = ship_request.id
            cart.save()

        log(log.INFO, "Form submitted. Ship Request: [%s]", ship_request)
        flash("Ship request added!", "success")
        if events_exist:
            ship_request.report_event = report_event
            report_event.save(False)

        ship_request.save(False)

        db.session.commit()

        return redirect(url_for("ship_request.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("ship_request.get_all"))


@ship_request_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    ship_request: m.ShipRequest = db.session.scalar(
        m.ShipRequest.select().where(m.ShipRequest.id == id)
    )
    if not ship_request:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    delete_sr = sa.delete(m.ShipRequest).where(m.ShipRequest.id == id)

    ship_requests = db.session.execute(
        m.Cart.select().where(m.Cart.ship_request_id == ship_request.id)
    ).scalars()

    for ship_request in ship_requests:
        db.session.delete(ship_request)

    db.session.execute(delete_sr)
    db.session.commit()
    log(log.INFO, "Ship Request deleted. Ship Request: [%s]", ship_request)
    flash("Ship Request deleted!", "success")
    return "ok", 200
