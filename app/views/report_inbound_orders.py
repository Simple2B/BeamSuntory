from flask import (
    Blueprint,
    redirect,
    send_file,
    url_for,
    flash,
)
from flask_login import login_required
import pandas as pd
import io
from app.controllers import role_required

from app import schema as s
from app import models as m, db


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
        flash("Report not found", "error")
        return redirect(url_for("report.index"))

    data = {
        "Name": [],
        "SKU": [],
        "Quantity": [],
        "Group": [],
        "Created At": [],
        "Supplier": [],
        "Arrived": [],
        "Warehouse": [],
    }  # type: dict[str, list]

    for product_allocated in report.inbound_order.products_allocated:
        if product_allocated.product.SKU != SKU:
            continue
        for group in product_allocated.product_quantity_groups:
            data["Name"].append(product_allocated.product.name)
            data["SKU"].append(product_allocated.product.SKU)
            data["Quantity"].append(group.quantity)
            data["Group"].append(group.group.name)
            data["Created At"].append(report.created_at)
            data["Supplier"].append(report.inbound_order.supplier.name)
            data["Arrived"].append(report.inbound_order.finished_date)
            data["Warehouse"].append(report.inbound_order.warehouse.name)

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
