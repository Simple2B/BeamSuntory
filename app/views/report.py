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
    filter_events = s.FilterReportEvents.model_validate(dict(request.args))
    query = m.ReportEvent.select().order_by(m.ReportEvent.created_at)

    count_query = sa.select(sa.func.count()).select_from(m.ReportEvent)

    if filter_events.q:
        query = query.where(
            m.ReportEvent.events.any(
                m.Event.product.has(m.Product.name.ilike(f"%{filter_events.q}%"))
            )
            | m.ReportEvent.events.any(
                m.Event.product.has(m.Product.SKU.ilike(f"%{filter_events.q}%"))
            )
            | m.ReportEvent.events.any(
                m.Event.user.has(m.User.username.ilike(f"%{filter_events.q}%"))
            )
        )

        count_query = count_query.where(
            m.ReportEvent.events.any(
                m.Event.product.has(m.Product.name.ilike(f"%{filter_events.q}%"))
            )
            | m.ReportEvent.events.any(
                m.Event.product.has(m.Product.SKU.ilike(f"%{filter_events.q}%"))
            )
            | m.ReportEvent.events.any(
                m.Event.user.has(m.User.username.ilike(f"%{filter_events.q}%"))
            )
        )

    if filter_events.start_from:
        query = query.where(
            m.ReportEvent.events.any(
                m.Event.date_from
                >= datetime.strptime(filter_events.start_from, "%m/%d/%Y")
            )
        )

    if filter_events.start_to:
        query = query.where(
            m.ReportEvent.events.any(
                m.Event.date_from
                <= datetime.strptime(filter_events.start_to, "%m/%d/%Y")
            )
        )

    if filter_events.end_from:
        query = query.where(
            m.ReportEvent.events.any(
                m.Event.date_to >= datetime.strptime(filter_events.end_from, "%m/%d/%Y")
            )
        )

    if filter_events.end_to:
        query = query.where(
            m.ReportEvent.events.any(
                m.Event.date_to <= datetime.strptime(filter_events.end_to, "%m/%d/%Y")
            )
        )

    if filter_events.username:
        query = query.where(
            m.ReportEvent.user.has(m.User.username == filter_events.username)
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
    pagination, reports = get_events_report()
    report_list_schema = s.ReportEventList.model_validate(reports)

    return s.ReportEventResponse(
        pagination=pagination, report_events=report_list_schema.root
    ).model_dump_json(by_alias=True)


@report_blueprint.route("/event", methods=["GET"])
@login_required
def events():
    users = db.session.scalars(sa.select(m.User))
    return render_template(
        "report/event/events.html",
        users=users,
    )


@report_blueprint.route("event/search")
@login_required
def search_report_events():
    pagination, reports = get_events_report()

    return render_template(
        "report/event/reports_table.html", page=pagination, reports=reports
    )
