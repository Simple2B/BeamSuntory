from datetime import datetime
from flask import (
    Blueprint,
    request,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import schema as s
from app import models as m, db


report_blueprint = Blueprint("report", __name__, url_prefix="/report")


def get_events_report():
    q = request.args.get("q", type=str, default=None)
    start_from = request.args.get("start_from", type=str, default=None)
    start_to = request.args.get("start_to", type=str, default=None)
    end_from = request.args.get("end_from", type=str, default=None)
    end_to = request.args.get("end_to", type=str, default=None)

    query = m.ReportEvent.select().order_by(m.ReportEvent.created_at)

    count_query = sa.select(sa.func.count()).select_from(m.ReportEvent)
    if q:
        query = query.where(
            m.ReportEvent.event.has(m.Event.product.has(m.Product.name.ilike(f"%{q}%")))
            | m.ReportEvent.event.has(
                m.Event.product.has(m.Product.SKU.ilike(f"%{q}%"))
            )
            | m.ReportEvent.event.has(m.Event.user.has(m.User.username.ilike(f"%{q}%")))
        )

        count_query = count_query.where(
            m.ReportEvent.event.has(m.Event.product.has(m.Product.name.ilike(f"%{q}%")))
            | m.ReportEvent.event.has(
                m.Event.product.has(m.Product.SKU.ilike(f"%{q}%"))
            )
            | m.ReportEvent.event.has(m.Event.user.has(m.User.username.ilike(f"%{q}%")))
        )

    if start_from:
        query = query.where(
            m.ReportEvent.event.has(
                m.Event.date_from >= datetime.strptime(start_from, "%m/%d/%Y")
            )
        )

    if start_to:
        query = query.where(
            m.ReportEvent.event.has(
                m.Event.date_from <= datetime.strptime(start_to, "%m/%d/%Y")
            )
        )

    if end_from:
        query = query.where(
            m.ReportEvent.event.has(
                m.Event.date_to >= datetime.strptime(end_from, "%m/%d/%Y")
            )
        )

    if end_to:
        query = query.where(
            m.ReportEvent.event.has(
                m.Event.date_to <= datetime.strptime(end_to, "%m/%d/%Y")
            )
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_blueprint.route("/event/api", methods=["GET"])
@login_required
def get_events_json():
    pagination, events = get_events_report()
    return s.EventsApiOut(pagination=pagination, events=events.all()).model_dump_json(
        by_alias=True
    )


@report_blueprint.route("/event", methods=["GET"])
@login_required
def events():
    q = request.args.get("q", type=str, default=None)
    start_from = request.args.get("start_from", type=str, default=None)
    start_to = request.args.get("start_to", type=str, default=None)
    end_from = request.args.get("end_from", type=str, default=None)
    end_to = request.args.get("end_to", type=str, default=None)

    pagination, reports = get_events_report()

    return render_template(
        "report/events.html",
        reports=reports,
        page=pagination,
        search_query=q,
        start_from=start_from,
        start_to=start_to,
        end_from=end_from,
        end_to=end_to,
    )
