from flask import (
    Blueprint,
    request,
    render_template,
    send_file,
    flash,
    redirect,
    url_for,
)
import pandas as pd
import io
from flask_login import login_required
from app.controllers import role_required

from app import schema as s
from app import models as m, db
from app.controllers.report.report_inventory import add_dataset_row
from app.logger import log

report_inventory_blueprint = Blueprint(
    "report_inventory", __name__, url_prefix="/report_inventory"
)


@report_inventory_blueprint.route(
    "inventory/<int:product_id>/download-csv", methods=["GET"]
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
def download_csv(product_id: int):
    # Create a DataFrame with sample data
    product = db.session.get(m.Product, product_id)
    group = request.args.get("target_group", default="", type=str)
    master_group = request.args.get("master_group", default="", type=str)
    if not product:
        flash("Report not found", "danger")
        return redirect(url_for("report.index"))

    # data = create_inventory_dataset(product, group, master_group)
    dataset = {
        "Name": [],
        "SKU": [],
        "Quantity": [],
        "Group": [],
        "Brand": [],
        "Warehouse": [],
    }  # type: dict[str, list]

    add_dataset_row(
        dataset,
        product,
        target_group=group,
        master_group=master_group,
    )
    df = pd.DataFrame(dataset)

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


@report_inventory_blueprint.route("inventory/<int:product_id>/detail_modal")
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
def detail_modal(product_id: int):
    # Create a DataFrame with sample data
    product = db.session.get(m.Product, product_id)
    target_group = request.args.get("target_group", default="", type=str)
    master_group = request.args.get("master_group", default="", type=str)
    if not product:
        log(log.ERROR, "Report not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )
    dataset = {
        "Name": [],
        "SKU": [],
        "Quantity": [],
        "Group": [],
        "Brand": [],
        "Warehouse": [],
    }  # type: dict[str, list]

    add_dataset_row(
        dataset,
        product,
        target_group=target_group,
        master_group=master_group,
    )

    return render_template(
        "report/inventory/detail_modal.html",
        data=dataset,
        report=product,
        target_group=target_group,
        master_group=master_group,
    )
