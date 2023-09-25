from datetime import datetime
from flask import (
    Blueprint,
    request,
    render_template,
    jsonify,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import schema as s
from app import models as m, db


report_request_share_blueprint = Blueprint(
    "report_request_share",
    __name__,
    url_prefix="/report_request_share",
)


def get_request_share_report():
    # Clear args from empty values
    filter_args = {field: value for field, value in dict(request.args).items() if value}
    filter_events = s.FilterRequestShare.model_validate(filter_args)
    query = m.ReportRequestShare.select().order_by(m.ReportRequestShare.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportRequestShare)

    if filter_events.q:
        where_stmt = (
            m.ReportRequestShare.request_share.has(
                m.RequestShare.product.has(m.Product.name.ilike(f"%{filter_events.q}%"))
            )
            | m.ReportRequestShare.user.has(
                m.User.username.ilike(f"%{filter_events.q}%")
            )
            | m.ReportRequestShare.request_share.has(
                m.RequestShare.product.has(m.Product.SKU.ilike(f"%{filter_events.q}%"))
            )
        )

        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter_events.created_from:
        where_stmt = m.ReportRequestShare.created_at >= datetime.strptime(
            filter_events.created_from, "%m/%d/%Y"
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter_events.created_to:
        where_stmt = m.ReportRequestShare.created_at <= datetime.strptime(
            filter_events.created_to, "%m/%d/%Y"
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter_events.report_type:
        where_stmt = m.ReportRequestShare.type == filter_events.report_type.value
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_request_share_blueprint.route("/", methods=["GET"])
@login_required
def index():
    return render_template(
        "report/request_share/index.html",
        report_types=s.ReportRequestShareType,
    )


@report_request_share_blueprint.route("/api", methods=["GET"])
@login_required
def report_json():
    pagination, reports = get_request_share_report()
    report_list_schema = s.ReportRequestShareList.model_validate(reports)

    return jsonify(
        s.ReportRequestShareResponse(
            pagination=pagination, reports=report_list_schema.root
        ).model_dump_json(by_alias=True)
    )


@report_request_share_blueprint.route("search")
@login_required
def search():
    pagination, reports = get_request_share_report()

    return render_template(
        "report/request_share/reports_table.html", page=pagination, reports=reports
    )
