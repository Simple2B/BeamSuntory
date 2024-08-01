import io
from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    send_file,
    url_for,
)
from flask_login import login_required
import pandas as pd
from app.controllers import role_required
from app.controllers.report import create_share_requests_dataset
from app import schema as s
from app import models as m, db
from app.logger import log

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

    data = create_share_requests_dataset(request_share)

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


@report_request_share_blueprint.route(
    "/<int:request_share_id>/detail-modal", methods=["GET"]
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
def detail_modal(request_share_id: int):
    request_share = db.session.get(m.RequestShare, request_share_id)
    if not request_share:
        log(log.ERROR, "Report RequestShare not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )

    data = create_share_requests_dataset(request_share)

    return render_template(
        "report/request_share/detail_modal.html", data=data, request_share=request_share
    )
