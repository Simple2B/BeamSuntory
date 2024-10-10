from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    url_for,
)
from flask_login import login_required
import pandas as pd
import sqlalchemy as sa
from app.controllers import role_required
from app.controllers.report import add_share_requests_dataset_row, send_xlsx_response
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

    master_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).where(
            m.MasterGroupProduct.name != s.Events.name.value
        )
    ).all()

    dataset = {
        "Name": [],
        "SKU": [],
        "Brand": [],
        "Quantity": [],
        "From": [],
        "To": [],
        "Status": [],
        "Created At": [],
        "Approved At": [],
        "User Approved": [],
        "Declined At": [],
        "User Declined": [],
        "Last transaction data": [],
    }  # type: dict[str, list]

    data = add_share_requests_dataset_row(
        dataset, request_share, master_groups, download=True
    )

    df = pd.DataFrame(data)

    # Save the DataFrame to a CSV file in memory
    return send_xlsx_response(df)


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

    master_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).where(
            m.MasterGroupProduct.name != s.Events.name.value
        )
    ).all()
    dataset = {
        "Name": [],
        "SKU": [],
        "Brand": [],
        "Quantity": [],
        "From": [],
        "To": [],
        "Status": [],
        "Created At": [],
        "Approved At": [],
        "User Approved": [],
        "Declined At": [],
        "User Declined": [],
        "Last transaction data": [],
    }  # type: dict[str, list]

    data = add_share_requests_dataset_row(dataset, request_share, master_groups)

    return render_template(
        "report/request_share/detail_modal.html", data=data, request_share=request_share
    )
