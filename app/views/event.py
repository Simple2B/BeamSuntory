from datetime import datetime, timedelta
from datetime import date as Date
import functools
import calendar
from flask import (
    Blueprint,
    flash,
    jsonify,
    redirect,
    request,
    url_for,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log


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
def get_events_json():
    pagination, events = get_events()
    return s.EventsApiOut(pagination=pagination, events=events.all()).model_dump_json(
        by_alias=True
    )


@event_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
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
    )


@event_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.EventFormCreate = f.EventFormCreate()
    if not form.validate_on_submit():
        flash("Event must validation failed: {form.errors}", "danger")
        log(log.INFO, "Event validation failed: [%s]", form.errors)
        return redirect(url_for("product.get_all"))

    current_date = datetime.now()
    date_from = form.date_range.data.split(" - ")[0]
    date_to = form.date_range.data.split(" - ")[1]
    start_date = datetime.strptime(date_from, "%Y-%m-%d")
    end_date = datetime.strptime(date_to, "%Y-%m-%d")
    difference_date = start_date - current_date
    if difference_date < timedelta(days=5):
        flash("The event must be created more than 5 days in advance", "danger")
        log(
            log.INFO,
            "The event must be created more than 5 days: [%s]",
            form.product_id.data,
        )
        return redirect(url_for("product.get_all"))

    # check product
    product = db.session.get(m.Product, form.product_id.data)
    if not product:
        flash("Product not found")
        log(
            log.INFO,
            "Product validation failed: cannot find product with id [%s]",
            form.product_id.data,
        )
        return redirect(url_for("product.get_all"))

    # create event
    event: m.Event = m.Event(
        date_from=start_date,
        date_to=end_date,
        quantity=form.quantity.data,
        product=product,
        cart_id=form.cart_id.data,
        comment=form.comment.data,
    )
    db.session.add(event)

    cart: m.Cart = db.session.get(m.Cart, form.cart_id.data)
    if cart:
        cart.quantity = form.quantity.data
        log(log.INFO, "Cart item quantity updated. Cart: [%s]", cart)

    db.session.commit()
    log(log.INFO, "Item added: [%s]", event)
    flash("Item added!", "success")

    return redirect(url_for("product.get_all"))


@event_blueprint.route("/get_available_quantity", methods=["GET"])
@login_required
def get_available_quantity():
    month_from = request.args.get("month_from", type=int, default=None)
    year_from = request.args.get("year_from", type=int, default=None)
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

    num_days = calendar.monthrange(year_from, month_from)[1]
    total_available_quantity = []
    for day in range(1, num_days + 1):
        current_date = Date(year_from, month_from, day)
        events: list[m.Event] = db.session.scalars(
            m.Event.select().where(
                m.Event.date_from <= current_date,
                m.Event.date_to >= current_date,
                m.Event.product_id == product_id,
            )
        ).all()
        total_quantity = functools.reduce(lambda a, b: a + b.quantity, events, 0)
        quantity = warehouse_product.product_quantity - total_quantity
        date = current_date.strftime("%Y-%m-%d")
        total_available_quantity.append({"date": date, "quantity": quantity})

    log(log.INFO, "Total available quantity: [%s]", quantity)
    return jsonify(total_available_quantity)


@event_blueprint.route("/get_available_quantity_by_date", methods=["GET"])
@login_required
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
            m.Event.date_from <= date_start,
            m.Event.date_to >= date_end,
            m.Event.product_id == product_id,
        )
    ).all()
    total_quantity = functools.reduce(lambda a, b: a + b.quantity, events, 0)
    quantity = warehouse_product.product_quantity - total_quantity - quantity_desired
    if quantity < 0:
        log(log.INFO, "Not enough quantity: [%s]", quantity)
        return "Not enough quantity", 400
    return "ok", 200
