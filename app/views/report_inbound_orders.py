from flask import (
    Blueprint,
    redirect,
    request,
    send_file,
    url_for,
    flash,
    render_template,
)
from flask_login import login_required
import pandas as pd
import io
from app.controllers import role_required

from app.controllers.report import create_inbound_order_dataset, send_xlsx_response
from app import schema as s
from app import models as m, db
from app.logger import log


report_inbound_orders_blueprint = Blueprint(
    "report_inbound_orders", __name__, url_prefix="/report_inbound_orders"
)


@report_inbound_orders_blueprint.route("/<int:report_id>/download_csv", methods=["GET"])
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
def download_csv(report_id: int):
    report = db.session.get(m.InboundOrder, report_id)
    target_group = request.args.get("target_group", default="", type=str)
    master_group = request.args.get("master_group", default="", type=str)
    if not report:
        log(log.ERROR, "Report not found")
        flash("Report not found", "error")
        return redirect(url_for("report.index"))

    data = create_inbound_order_dataset(report, master_group, target_group)

    df = pd.DataFrame(data)

    # Save the DataFrame to a CSV file in memory
    return send_xlsx_response(df)


@report_inbound_orders_blueprint.route("/<int:report_id>/detail_modal", methods=["GET"])
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
def detail_modal(report_id: int):
    report = db.session.get(m.InboundOrder, report_id)
    target_group = request.args.get("target_group", default="", type=str)
    master_group = request.args.get("master_group", default="", type=str)
    if not report:
        log(log.ERROR, "Report not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )

    data = create_inbound_order_dataset(report, master_group, target_group)

    return render_template(
        "report/inbound_order/detail_modal.html",
        data=data,
        report=report,
        target_group=target_group,
        master_group=master_group,
    )
