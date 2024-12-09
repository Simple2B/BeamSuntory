from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import login_required
import pandas as pd
from app.controllers import role_required

from app import schema as s
from app import models as m, db
from app.controllers.report import send_xlsx_response

from app.controllers.report.report_outbound_billable import (
    create_outbound_billable_modal_dataset,
)
from app.logger import log

report_outbound_billable_blueprint = Blueprint(
    "report_outbound_billable",
    __name__,
    url_prefix="/report_outbound_billable",
)


@report_outbound_billable_blueprint.route(
    "<int:outbound_id>/download-csv", methods=["GET"]
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
def download_csv(outbound_id: int):
    # Create a DataFrame with sample data
    outbound_order = db.session.get(m.ShipRequest, outbound_id)
    brand = request.args.get("brand", default="", type=str)

    if not outbound_order:
        flash("Report not found", "danger")
        return redirect(url_for("report.index"))

    dataset = create_outbound_billable_modal_dataset(
        outbound_order, brand, download=True
    )
    df = pd.DataFrame(dataset, index=[0])

    # Save the DataFrame to a CSV file in memory
    return send_xlsx_response(df)


@report_outbound_billable_blueprint.route("<int:outbound_id>/detail_modal")
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
def detail_modal(outbound_id: int):
    # Create a DataFrame with sample data
    outbound_order = db.session.get(m.ShipRequest, outbound_id)
    brand = request.args.get("brand", default="", type=str)

    if not outbound_order:
        log(log.ERROR, "Report not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )

    dataset = create_outbound_billable_modal_dataset(outbound_order, brand)

    return render_template(
        "report/outbound_billable/detail_modal.html",
        data=dataset,
        outbound_order=outbound_order,
        brand=brand,
    )
