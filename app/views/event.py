import json
from datetime import datetime
from http import HTTPStatus
import functools
from flask import Blueprint, jsonify, request, render_template, redirect, url_for, flash
from flask_login import login_required
import sqlalchemy as sa
from sqlalchemy import and_, or_
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app.logger import log
from app import forms as f


event_blueprint = Blueprint("event", __name__, url_prefix="/event")


def get_events():
    q = request.args.get("q", type=str, default=None)
    start_from = request.args.get("start_from", type=str, default=None)
    start_to = request.args.get("start_to", type=str, default=None)
    end_from = request.args.get("end_from", type=str, default=None)
    end_to = request.args.get("end_to", type=str, default=None)

    query = m.Event.select().order_by(m.Event.created_at)

    count_query = sa.select(sa.func.count()).select_from(m.Event)
    if q:
        query = query.where(
            m.Event.product.has(m.Product.name.ilike(f"%{q}%"))
            | m.Event.product.has(m.Product.SKU.ilike(f"%{q}%"))
            | m.Event.user.has(m.User.username.ilike(f"%{q}%"))
        )

        count_query = count_query.where(
            m.Event.product.has(m.Product.name.ilike(f"%{q}%"))
            | m.Event.product.has(m.Product.SKU.ilike(f"%{q}%"))
            | m.Event.user.has(m.User.username.ilike(f"%{q}%"))
        )

    if start_from:
        query = query.where(
            m.Event.date_from >= datetime.strptime(start_from, "%m/%d/%Y")
        )

    if start_to:
        query = query.where(
            m.Event.date_from <= datetime.strptime(start_to, "%m/%d/%Y")
        )

    if end_from:
        query = query.where(m.Event.date_to >= datetime.strptime(end_from, "%m/%d/%Y"))

    if end_to:
        query = query.where(m.Event.date_to <= datetime.strptime(end_to, "%m/%d/%Y"))

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@event_blueprint.route("/api", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_events_json():
    pagination, events = get_events()
    return s.EventsApiOut(pagination=pagination, events=events.all()).model_dump_json(
        by_alias=True
    )


@event_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_edit = f.InboundOrderUpdateForm()

    q = request.args.get("q", type=str, default=None)
    start_from = request.args.get("start_from", type=str, default=None)
    start_to = request.args.get("start_to", type=str, default=None)
    end_from = request.args.get("end_from", type=str, default=None)
    end_to = request.args.get("end_to", type=str, default=None)

    pagination, events = get_events()

    return render_template(
        "event/events.html",
        events=events,
        page=pagination,
        search_query=q,
        start_from=start_from,
        start_to=start_to,
        end_from=end_from,
        end_to=end_to,
        form_edit=form_edit,
    )


@event_blueprint.route("/get_available_quantity", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.MANAGER.value,
    ]
)
def get_available_quantity():
    timestamps: list[str] = json.loads(request.args.get("dates"))
    product_id = request.args.get("product_id", type=int, default=None)
    group_name = request.args.get("group_name", type=str, default=None)
    group = db.session.scalar(m.Group.select().where(m.Group.name == group_name))
    if not group:
        log(log.INFO, "Group not found")
        return "Group not found", 404
    warehouse: m.Warehouse = db.session.scalar(
        m.Warehouse.select().where(
            m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value
        )
    )
    if not warehouse:
        log(log.INFO, "Warehouse not found")
        return "Warehouse not found", 404

    warehouse_product: m.WarehouseProduct = db.session.scalar(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id == product_id,
            m.WarehouseProduct.warehouse_id == warehouse.id,
            m.WarehouseProduct.group_id == group.id,
        )
    )
    if not warehouse_product:
        log(log.INFO, "Warehouse product not found")
        return "Warehouse product not found", 404

    total_available_quantity = []
    for timestamp in timestamps:
        day_filter = datetime.fromtimestamp(int(timestamp) // 1000)
        events: list[m.Event] = db.session.scalars(
            m.Event.select().where(
                m.Event.date_reserve_from <= day_filter,
                m.Event.date_reserve_to >= day_filter,
                m.Event.product_id == product_id,
                m.Event.group_id == group.id,
            )
        ).all()
        total_quantity = functools.reduce(lambda a, b: a + b.quantity, events, 0)
        quantity = warehouse_product.product_quantity - total_quantity
        total_available_quantity.append(
            {
                "date": timestamp,
                "quantity": quantity,
            }
        )

    log(log.INFO, "Total available quantity: [%s]", len(total_available_quantity))
    return jsonify(total_available_quantity)


@event_blueprint.route("/get_available_quantity_by_date", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.MANAGER.value,
    ]
)
def get_available_quantity_by_date():
    date_from = request.args.get("date_from", type=str, default=None)
    date_to = request.args.get("date_to", type=str, default=None)
    product_id = request.args.get("product_id", type=int, default=None)
    group_name = request.args.get("group_name", type=str, default=None)
    quantity_desired = request.args.get("quantity", type=int, default=None)
    group = db.session.scalar(m.Group.select().where(m.Group.name == group_name))
    # TODO: use cases or better solution
    if not group_name:
        log(log.INFO, "Group_name query param not found")
        return "Group name not found", 404
    if not quantity_desired:
        log(log.INFO, "Quantity query param not found")
        return "Quantity not found", 404
    if not product_id:
        log(log.INFO, "Product_id query param not found")
        return "Product id not found", 404
    if not date_from:
        log(log.INFO, "Date_from query param not found")
        return "Date from not found", 404
    if not date_to:
        log(log.INFO, "Date_to query param not found")
        return "Date to not found", 404
    if not group:
        log(log.INFO, "Group not found")
        return "Group not found", 404
    product: m.Product = db.session.get(m.Product, product_id)
    if not product:
        log(log.INFO, "Product not found")
        return "Product not found", 404
    warehouse: m.Warehouse = db.session.scalar(
        m.Warehouse.select().where(
            m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value
        )
    )
    if not warehouse:
        log(log.INFO, "Warehouse not found")
        return "Warehouse not found", 404
    warehouse_product: m.WarehouseProduct = db.session.scalar(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id == product_id,
            m.WarehouseProduct.warehouse_id == warehouse.id,
            m.WarehouseProduct.group_id == group.id,
        )
    )
    if not warehouse_product:
        log(log.INFO, "Warehouse product not found. Product id: [%s]", product_id)
        return "Warehouse product not found", 404

    date_start = datetime.strptime(date_from, "%Y_%m_%d")
    date_end = datetime.strptime(date_to, "%Y_%m_%d")
    events: list[m.Event] = db.session.scalars(
        m.Event.select().where(
            m.Event.date_reserve_from <= date_start,
            m.Event.date_reserve_to >= date_end,
            m.Event.product_id == product_id,
            m.Event.group_id == group.id,
        )
    ).all()
    total_quantity = functools.reduce(lambda a, b: a + b.quantity, events, 0)
    available_quantity = warehouse_product.product_quantity - total_quantity
    quantity = available_quantity - quantity_desired
    if quantity < 0:
        log(log.INFO, "Not enough quantity: [%s]", quantity)
        return (
            jsonify(
                f"Product: {product.name}, available quantity: {available_quantity}"
            ),
            HTTPStatus.BAD_REQUEST,
        )
    return "ok", HTTPStatus.OK


@event_blueprint.route("/save_reserved_days_amount", methods=["POST"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ]
)
def save_reserved_days_amount():
    form: f.EventUpdateReservedDaysAmount = f.EventUpdateReservedDaysAmount()
    if form.validate_on_submit():
        query = m.Event.select().where(m.Event.id == int(form.event_id.data))
        event: m.Event | None = db.session.scalar(query)
        if not event:
            log(
                log.ERROR,
                "Not found store by id : [%s]",
                form.event_id.data,
            )
            flash("Cannot save event data", "danger")
        event.date_reserve_to = form.date_reserve_to.data
        event.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("event.get_all"))

    else:
        log(log.ERROR, "event save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("event.get_all"))


@event_blueprint.route("/get_adjust_available_quantity", methods=["GET"])
@login_required
def get_adjust_available_quantity():
    filter_events = s.FilterEvents.model_validate(dict(request.args))
    # TODO: use cases or better solution
    if not filter_events.group_id:
        log(log.INFO, "Group query param not found")
        return "Group not found", HTTPStatus.NOT_FOUND
    if not filter_events.quantity:
        log(log.INFO, "Quantity query param not found")
        return "Quantity not found", HTTPStatus.NOT_FOUND
    if not filter_events.product_id:
        log(log.INFO, "Product_id query param not found")
        return "Product id not found", HTTPStatus.NOT_FOUND

    group = db.session.get(m.Group, filter_events.group_id)
    if not group:
        log(log.INFO, "Group not found: [%s]", filter_events.group_id)
        return "Group not found", HTTPStatus.NOT_FOUND

    product: m.Product = db.session.get(m.Product, filter_events.product_id)
    if not product:
        log(log.INFO, "Product not found: [%s]", filter_events.product_id)
        return "Product not found", HTTPStatus.NOT_FOUND
    warehouse: m.Warehouse = db.session.scalar(
        m.Warehouse.select().where(
            m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value
        )
    )
    if not warehouse:
        log(
            log.INFO,
            "Warehouse not found: [%s]",
            s.WarehouseMandatory.warehouse_events.value,
        )
        return "Warehouse not found", HTTPStatus.NOT_FOUND
    warehouse_product: m.WarehouseProduct = db.session.scalar(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id == filter_events.product_id,
            m.WarehouseProduct.warehouse_id == warehouse.id,
            m.WarehouseProduct.group_id == filter_events.group_id,
        )
    )
    if not warehouse_product:
        log(
            log.INFO,
            "Warehouse product not found. Product id: [%s]",
            filter_events.product_id,
        )
        return "Warehouse product not found", HTTPStatus.NOT_FOUND

    today = datetime.today()
    events: list[m.Event] = db.session.scalars(
        m.Event.select().where(
            and_(
                or_(
                    m.Event.date_reserve_from >= today, m.Event.date_reserve_to >= today
                ),
                m.Event.product_id == filter_events.product_id,
                m.Event.group_id == filter_events.group_id,
            )
        )
    ).all()
    total_quantity = functools.reduce(lambda a, b: a + b.quantity, events, 0)
    if filter_events.quantity < total_quantity:
        log(
            log.INFO,
            "Can not adjust this product, desired quantity < total quantity: [%s] - [%s]",
            filter_events.quantity,
            total_quantity,
        )
        return (
            jsonify(
                f"Product: {product.name} in group: {group.name} has total booking quantity: {total_quantity}."
            ),
            HTTPStatus.BAD_REQUEST,
        )
    return "ok", HTTPStatus.OK
