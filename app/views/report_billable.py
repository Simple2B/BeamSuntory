from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    url_for,
)
from flask_login import login_required
import pandas as pd
from app.controllers import role_required

from app import schema as s
from app import models as m, db
from app.controllers.report import send_xlsx_response
from app.controllers.report.report_billable import create_billable_modal_dataset
from app.logger import log

report_billable_blueprint = Blueprint(
    "report_billable",
    __name__,
    url_prefix="/report_billable",
)


@report_billable_blueprint.route("<int:group_id>/download-csv", methods=["GET"])
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
def download_csv(group_id: int):
    # Create a DataFrame with sample data
    billable_group = db.session.get(m.BillableGroup, group_id)
    if not billable_group:
        flash("Report not found", "danger")
        return redirect(url_for("report.index"))

    dataset = create_billable_modal_dataset(billable_group, download=True)
    df = pd.DataFrame(dataset, index=[0])

    # Save the DataFrame to a CSV file in memory
    return send_xlsx_response(df)


@report_billable_blueprint.route("<int:group_id>/detail_modal")
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
def detail_modal(group_id: int):
    # Create a DataFrame with sample data
    billable_group = db.session.get(m.BillableGroup, group_id)
    if not billable_group:
        log(log.ERROR, "Report not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )

    dataset = create_billable_modal_dataset(billable_group)

    return render_template(
        "report/billable/detail_modal.html",
        data=dataset,
        billable_group=billable_group,
    )
