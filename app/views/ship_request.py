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
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log

ship_request_blueprint = Blueprint("ship_request", __name__, url_prefix="/ship_request")


def get_ship_request():
    filter_ship_request = s.FilterShipRequest.model_validate(dict(request.args))
    stm_where = sa.and_(m.ShipRequest.user_id == current_user.id)
    query = m.ShipRequest.select().where(stm_where).order_by(desc(m.ShipRequest.id))
    count_query = sa.select(sa.func.count()).where(stm_where).select_from(m.ShipRequest)
    if filter_ship_request.q:
        query = (
            m.ShipRequest.select()
            .where(
                m.ShipRequest.order_numb.ilike(f"%{filter_ship_request.q}%")
                | m.ShipRequest.order_type.ilike(f"%{filter_ship_request.q}%")
                | m.ShipRequest.store_category.has(
                    m.StoreCategory.name.ilike(f"%{filter_ship_request.q}%")
                )
                | m.ShipRequest.store.has(
                    m.Store.store_name.ilike(f"%{filter_ship_request.q}%")
                )
            )
            .order_by(m.ShipRequest.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(
                m.ShipRequest.order_numb.ilike(f"%{filter_ship_request.q}%")
                | m.ShipRequest.order_type.ilike(f"%{filter_ship_request.q}%")
                | m.ShipRequest.store_category.has(
                    m.StoreCategory.name.ilike(f"%{filter_ship_request.q}%")
                )
                | m.ShipRequest.store.has(
                    m.Store.store_name.ilike(f"%{filter_ship_request.q}%")
                )
            )
            .select_from(m.ShipRequest)
        )

    if filter_ship_request.ship_request_sort_locker:
        query = query.where(
            m.ShipRequest.user_id == current_user.id,
            m.ShipRequest.store.has(
                m.Store.store_category.has(m.StoreCategory.name == "Locker")
            ),
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

    return pagination, ship_requests, current_order_carts, warehouses


@ship_request_blueprint.route("/", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def get_all():
    # TODO: refactor or delete comments in queries
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()
    ship_requests, current_order_carts, pagination, warehouses = get_ship_request()
    store_categories = db.session.scalars((m.StoreCategory.select()))

    return render_template(
        "ship_request/ship_requests.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        form_create=form_create,
        form_edit=form_edit,
        warehouses=warehouses,
        store_categories=store_categories,
    )


@ship_request_blueprint.route("/create", methods=["POST"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def create():
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    if not form_create.validate_on_submit():
        flash("Validation failed", "danger")
        log(log.ERROR, "Validation failed: [%s]", form_create.errors)
        return redirect(url_for("ship_request.get_all"))

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
    store_category = db.session.get(m.StoreCategory, form_create.store_category.data)
    if not store_category:
        flash("Store category not found", "danger")
        log(
            log.INFO,
            "Store category not found: [%s]",
            form_create.store_category.data,
        )
        return redirect(url_for("product.get_all"))

    carts = db.session.scalars(
        sa.select(m.Cart).where(
            m.Cart.user_id == current_user.id, m.Cart.status == "pending"
        )
    ).all()

    for cart in carts:
        we_ho_product_quantit = db.session.execute(
            sa.select(sa.func.sum(m.WarehouseProduct.product_quantity)).where(
                m.WarehouseProduct.group_id == cart.group_id,
                m.WarehouseProduct.product_id == cart.product_id,
            )
        ).scalar()
        if not we_ho_product_quantit:
            flash("There is not enough in the warehouse", "danger")
            log(
                log.INFO,
                "There is not enough in the warehouse: [%s]",
                cart.product_id,
            )
            return redirect(url_for("cart.get_all"))

        ordered_quantity = db.session.execute(
            sa.select(sa.func.sum(m.Cart.quantity))
            .join(m.ShipRequest)
            .where(
                m.Cart.product_id == cart.product_id,
                m.Cart.group_id == cart.group_id,
                m.Cart.status == "submitted",
                m.ShipRequest.status == "waiting_for_warehouse",
            )
        ).scalar()

        if (
            ordered_quantity
            and ordered_quantity + cart.quantity > we_ho_product_quantit
        ) or cart.quantity > we_ho_product_quantit:
            log(
                log.INFO,
                "There is not enough product in the warehouse: [%s]",
                cart.product_id,
            )
            flash("There is not enough product in the warehouse", "danger")
            return redirect(url_for("cart.get_all"))

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
    ship_request.save()
    ship_request.set_order_numb()
    db.session.commit()

    # Create Report ship request
    report_shipping = m.ReportShipping(
        type=s.ReportShipRequestActionType.CREATED.value,
        ship_request=ship_request,
        user=current_user,
    )

    db.session.add(report_shipping)

    warehouse_event = db.session.scalar(
        m.Warehouse.select().where(
            m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value,
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
                ship_request=ship_request,
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
                group_id=cart.group_id,
            )
            db.session.add(event)
            db.session.add(report_event)
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

    db.session.commit()

    return redirect(url_for("ship_request.get_all"))


@ship_request_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
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


@ship_request_blueprint.route("/sort", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def sort():
    pagination, ship_requests, _, _ = get_ship_request()

    return render_template(
        "ship_request/ship_requests_table.html",
        page=pagination,
        ship_requests=ship_requests,
    )
