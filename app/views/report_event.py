from datetime import datetime
from flask import (
    Blueprint,
    request,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db


report_event_blueprint = Blueprint(
    "report_events", __name__, url_prefix="/report_events"
)


def get_events_report():
    filter_events = s.FilterReportEvents.model_validate(dict(request.args))
    query = m.ReportEvent.select().order_by(m.ReportEvent.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportEvent)

    if filter_events.q:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(
                            m.Product.name.ilike(f"%{filter_events.q}%")
                        )
                    )
                )
            )
            | m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(m.Product.SKU.ilike(f"%{filter_events.q}%"))
                    )
                )
            )
            | m.ReportEvent.user.has(m.User.username.ilike(f"%{filter_events.q}%"))
        )

        count_query = count_query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(
                            m.Product.name.ilike(f"%{filter_events.q}%")
                        )
                    )
                )
            )
        )

    if filter_events.start_from:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.date_from
                        >= datetime.strptime(filter_events.start_from, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_events.start_to:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.date_from
                        <= datetime.strptime(filter_events.start_to, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_events.end_from:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.date_from
                        >= datetime.strptime(filter_events.end_from, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_events.end_to:
        m.ReportEvent.ship_request.has(
            m.ShipRequest.carts.any(
                m.Cart.event.has(
                    m.Event.date_from
                    <= datetime.strptime(filter_events.end_to, "%m/%d/%Y")
                )
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


@report_event_blueprint.route("/event", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def events():
    users = db.session.scalars(sa.select(m.User))

    return render_template(
        "report/event/events.html",
        users=users,
    )


@report_event_blueprint.route("event/search")
@login_required
@role_required([s.UserRole.ADMIN.value])
def search_report_events():
    pagination, reports = get_events_report()

    return render_template(
        "report/event/reports_table.html", page=pagination, reports=reports
    )
