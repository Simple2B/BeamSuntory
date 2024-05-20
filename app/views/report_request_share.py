import io
from flask import (
    Blueprint,
    flash,
    redirect,
    send_file,
    url_for,
)
from flask_login import login_required
import pandas as pd
from app.controllers import role_required

from app import schema as s
from app import models as m, db


report_request_share_blueprint = Blueprint(
    "report_request_share",
    __name__,
    url_prefix="/report_request_share",
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
