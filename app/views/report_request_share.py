from datetime import datetime
import io
from flask import (
    Blueprint,
    flash,
    redirect,
    request,
    render_template,
    jsonify,
    send_file,
    url_for,
)
from flask_login import login_required
import pandas as pd
import sqlalchemy as sa
from app.controllers import create_pagination, role_required

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
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def index():
    return render_template(
        "report/request_share/index.html",
        report_types=s.ReportRequestShareActionType,
    )


@report_request_share_blueprint.route("/api", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
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
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def search():
    pagination, reports = get_request_share_report()

    return render_template(
        "report/request_share/reports_table.html", page=pagination, reports=reports
    )


@report_request_share_blueprint.route(
    "/<int:request_share_id>/download_csv", methods=["GET"]
)
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def download_csv(request_share_id: int):
    request_share = db.session.get(m.RequestShare, request_share_id)
    if not request_share:
        flash("Report request share not found", "danger")
        return redirect(url_for("report.index"))

    data = dict()  # type: dict[str, list]
    data["Name"] = [request_share.product.name]
    data["SKU"] = [request_share.product.SKU]
    data["Quantity"] = [request_share.desire_quantity]
    data["From"] = [request_share.from_group.name]
    data["To"] = [request_share.group.name]
    data["Status"] = [request_share.status]
    data["Created At"] = [request_share.created_at]

    for report in request_share.reports:
        if report.type == s.ReportRequestShareActionType.SHARED.value:
            data["Approved At"] = [report.created_at]
            data["User Approved"] = [report.user.username]
        if report.type == s.ReportRequestShareActionType.DECLINED.value:
            data["Declined At"] = [report.created_at]
            data["User Declined"] = [report.user.username]

    df = pd.DataFrame(data)

    # Save the DataFrame to a CSV file in memory
    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)

    # Send the CSV file as a response
    return send_file(
        io.BytesIO(csv_buffer.getvalue().encode("utf-8")),
        mimetype="text/csv",
        as_attachment=True,
        download_name="report.csv",
    )
