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


def get_assigns_report():
    filter_assign = s.FilterReportAssign.model_validate(dict(request.args))

    query = m.Assign.select().order_by(m.Assign.id)
    count_query = sa.select(sa.func.count()).select_from(m.Assign)

    if filter_assign.q:
        query = query.where(
            m.Assign.product.has(m.Product.name.ilike(f"%{filter_assign.q}%"))
            | m.Assign.product.has(m.Product.SKU.ilike(f"%{filter_assign.q}%"))
            | m.Assign.user.has(m.User.username.ilike(f"%{filter_assign.q}%"))
        )
        count_query = count_query.where(
            m.Assign.product.has(m.Product.name.ilike(f"%{filter_assign.q}%"))
            | m.Assign.product.has(m.Product.SKU.ilike(f"%{filter_assign.q}%"))
            | m.Assign.user.has(m.User.username.ilike(f"%{filter_assign.q}%"))
        )

    if filter_assign.username:
        query = query.where(
            m.Assign.user.has(m.User.username == filter_assign.username)
        )

    if filter_assign.master_group:
        query = query.where(
            m.Assign.product.has(
                m.Product.product_groups.any(
                    m.ProductGroup.parent.has(
                        m.GroupProduct.name.ilike(f"%{filter_assign.master_group}%")
                    )
                )
            )
        )

    if filter_assign.start_date:
        print(filter_assign.start_date)
        query = query.where(m.Assign.created_at >= filter_assign.start_date)

    if filter_assign.end_date:
        query = query.where(m.Assign.created_at <= filter_assign.end_date)

    print(query)

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


@report_blueprint.route("/assign")
@login_required
def assigns():
    users = db.session.scalars(sa.select(m.User))

    product_master_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).order_by(m.MasterGroupProduct.id)
    ).all()

    return render_template(
        "report/assign/assigns.html",
        users=users,
        product_master_groups=product_master_groups,
    )


@report_blueprint.route("assign/search")
@login_required
def search_report_assigns():
    pagination, reports = get_assigns_report()

    return render_template(
        "report/assign/reports_assign_table.html", page=pagination, reports=reports
    )
