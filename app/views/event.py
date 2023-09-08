from datetime import datetime, timedelta
from flask import (
    Blueprint,
    flash,
    redirect,
    request,
    url_for,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination


from app import models as m, db
from app import forms as f
from app.logger import log


event_blueprint = Blueprint("event", __name__, url_prefix="/event")


@event_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
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

    event.save()
    log(log.INFO, "Event added: [%s]", event)
    flash("Event added!", "success")

    return redirect(url_for("product.get_all"))
