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


report_adjustment_blueprint = Blueprint(
    "report_adjustment", __name__, url_prefix="/report_adjustment"
)


def get_adjustment_report():
    filter_adjustments = s.FilterReportAdjustments.model_validate(dict(request.args))
    query = m.Adjust.select().order_by(m.Adjust.id)

    count_query = sa.select(sa.func.count()).select_from(m.Adjust)

    if filter_adjustments.q:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(
                            m.Product.name.ilike(f"%{filter_adjustments.q}%")
                        )
                    )
                )
            )
            | m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(
                            m.Product.SKU.ilike(f"%{filter_adjustments.q}%")
                        )
                    )
                )
            )
            | m.ReportEvent.user.has(m.User.username.ilike(f"%{filter_adjustments.q}%"))
        )

        count_query = count_query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(
                            m.Product.name.ilike(f"%{filter_adjustments.q}%")
                        )
                    )
                )
            )
        )

    if filter_adjustments.start_from:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.date_from
                        >= datetime.strptime(filter_adjustments.start_from, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_adjustments.start_to:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.date_from
                        <= datetime.strptime(filter_adjustments.start_to, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_adjustments.end_from:
        query = query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.date_from
                        >= datetime.strptime(filter_adjustments.end_from, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_adjustments.end_to:
        m.ReportEvent.ship_request.has(
            m.ShipRequest.carts.any(
                m.Cart.event.has(
                    m.Event.date_from
                    <= datetime.strptime(filter_adjustments.end_to, "%m/%d/%Y")
                )
            )
        )

    if filter_adjustments.username:
        query = query.where(
            m.ReportEvent.user.has(m.User.username == filter_adjustments.username)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_adjustment_blueprint.route("/adjustment/api", methods=["GET"])
@login_required
def get_adjustments_json():
    pagination, reports = get_adjustment_report()
    report_list_schema = s.AdjustList.model_validate(reports)

    return s.AdjustResponse(
        pagination=pagination, report_adjustments=report_list_schema.root
    ).model_dump_json(by_alias=True)


@report_adjustment_blueprint.route("/adjustment", methods=["GET"])
@login_required
def adjustments():
    users = db.session.scalars(sa.select(m.User))

    return render_template(
        "report/adjustment/adjustments.html",
        users=users,
    )


@report_adjustment_blueprint.route("adjustment/search")
@login_required
def search_report_adjustments():
    pagination, reports = get_adjustment_report()

    return render_template(
        "report/adjustment/reports_table.html", page=pagination, reports=reports
    )
