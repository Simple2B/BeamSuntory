from flask import Blueprint, redirect, send_file, url_for, flash, render_template
from flask_login import login_required
import pandas as pd
import io
from app.controllers import role_required

from app.controllers.report import create_inbound_order_dataset
from app import schema as s
from app import models as m, db
from app.logger import log


report_inbound_orders_blueprint = Blueprint(
    "report_inbound_orders", __name__, url_prefix="/report_inbound_orders"
)


@report_inbound_orders_blueprint.route(
    "/<int:report_id>/<SKU>/download_csv", methods=["GET"]
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
def download_csv(report_id: int, SKU: str):
    report = db.session.get(m.ReportInboundOrder, report_id)
    if not report:
        log(log.ERROR, "Report not found")
        flash("Report not found", "error")
        return redirect(url_for("report.index"))

    data = create_inbound_order_dataset(report, SKU=SKU)

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


@report_inbound_orders_blueprint.route(
    "/<int:report_id>/<SKU>/detail_modal", methods=["GET"]
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
def detail_modal(report_id: int, SKU: str):
    report = db.session.get(m.ReportInboundOrder, report_id)
    if not report:
        log(log.ERROR, "Report not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )

    data = create_inbound_order_dataset(report, SKU=SKU)

    return render_template(
        "report/inbound_order/detail_modal.html", data=data, report=report, SKU=SKU
    )
