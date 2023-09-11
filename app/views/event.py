from datetime import datetime, timedelta
from flask import (
    Blueprint,
    flash,
    redirect,
    request,
    url_for,
    render_template,
)
from flask_login import login_required, current_user
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

    query = m.Event.select().order_by(m.Event.id)
    # product = aliased(m.Product)

    count_query = sa.select(sa.func.count()).select_from(m.Event)
    if q:
        query = query.where(
            m.Event.product.has(m.Product.name.ilike(f"%{q}%"))
            | m.Event.product.has(m.Product.SKU.ilike(f"%{q}%"))
        )

        count_query = count_query.where(
            m.Event.product.has(m.Product.name.ilike(f"%{q}%"))
            | m.Event.product.has(m.Product.SKU.ilike(f"%{q}%"))
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

    events = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, events


@event_blueprint.route("/api", methods=["GET"])
@login_required
def get_events_json():
    pagination, events = get_events()
    return s.EventsApiOut(pagination=pagination, events=events.all()).json(
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
    start_date = datetime.strptime(form.date_from.data, "%m/%d/%Y")
    end_date = datetime.strptime(form.date_to.data, "%m/%d/%Y")
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
        comment=form.comment.data,
    )
    db.session.add(event)

    cart: m.Cart = m.Cart(
        product_id=product.id,
        quantity=form.quantity.data,
        user_id=current_user.id,
        group=form.group.data,
    )
    db.session.add(cart)

    db.session.commit()
    log(log.INFO, "Item added: [%s]", event)
    flash("Item added!", "success")

    return redirect(url_for("product.get_all"))


@event_blueprint.route("/get_available_quantity", methods=["GET"])
@login_required
def get_available_quantity():
    form: f.EventFormCreate = f.EventFormCreate()
    if not form.validate_on_submit():
        flash("Event must validation failed: {form.errors}", "danger")
        log(log.INFO, "Event validation failed: [%s]", form.errors)
        return redirect(url_for("product.get_all"))

    current_date = datetime.now()
    start_date = datetime.strptime(form.date_from.data, "%m/%d/%Y")
    end_date = datetime.strptime(form.date_to.data, "%m/%d/%Y")
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
        comment=form.comment.data,
    )
    db.session.add(event)

    cart: m.Cart = m.Cart(
        product_id=product.id,
        quantity=form.quantity.data,
        user_id=current_user.id,
        group=form.group.data,
    )
    db.session.add(cart)

    db.session.commit()
    log(log.INFO, "Item added: [%s]", event)
    flash("Item added!", "success")

    return redirect(url_for("product.get_all"))
