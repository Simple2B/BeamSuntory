from flask import (
    Blueprint,
    flash,
    redirect,
    request,
    render_template,
    url_for,
)
from flask_login import login_required
import pandas as pd
from app.controllers import role_required

from app import schema as s
from app import models as m, db
from app.controllers.report import create_shipping_modal_dataset, send_xlsx_response
from app.logger import log

report_shipping_blueprint = Blueprint(
    "report_shipping",
    __name__,
    url_prefix="/report_shipping",
)


@report_shipping_blueprint.route("<int:ship_id>/download-csv", methods=["GET"])
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
def download_csv(ship_id: int):
    # Create a DataFrame with sample data
    ship_request = db.session.get(m.ShipRequest, ship_id)
    master_group = request.args.get("master_group", default="", type=str)
    target_group = request.args.get("target_group", default="", type=str)
    if not ship_request:
        flash("Report not found", "danger")
        return redirect(url_for("report.index"))

    dataset = create_shipping_modal_dataset(
        ship_request, master_group, target_group, download=True
    )
    df = pd.DataFrame(dataset)

    # Save the DataFrame to a CSV file in memory
    return send_xlsx_response(df)


@report_shipping_blueprint.route("<int:ship_id>/detail_modal")
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
def detail_modal(ship_id: int):
    # Create a DataFrame with sample data
    ship_request = db.session.get(m.ShipRequest, ship_id)
    target_group = request.args.get("target_group", default="", type=str)
    master_group = request.args.get("master_group", default="", type=str)
    if not ship_request:
        log(log.ERROR, "Report not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )

    dataset = create_shipping_modal_dataset(ship_request, master_group, target_group)

    return render_template(
        "report/shipping/detail_modal.html",
        data=dataset,
        ship_request=ship_request,
        target_group=target_group,
        master_group=master_group,
    )
