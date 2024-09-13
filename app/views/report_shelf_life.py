from flask import (
    Blueprint,
    render_template,
    redirect,
    url_for,
    flash,
    send_file,
)
from flask_login import login_required
import pandas as pd
import io

from app.controllers.report import create_shelf_life_dataset
from app.controllers import role_required


from app import schema as s
from app import models as m, db
from app.logger import log

report_shelf_life_blueprint = Blueprint(
    "report_shelf_life", __name__, url_prefix="/report_shelf_life"
)


@report_shelf_life_blueprint.route("/<int:product_allocated_id>/download_csv")
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
def downlaod_csv(product_allocated_id: int):
    product_allocated = db.session.get(m.ProductAllocated, product_allocated_id)
    if not product_allocated:
        flash("Peport not found", "danger")
        return redirect(url_for("report.index"))

    data = create_shelf_life_dataset(product_allocated)

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


@report_shelf_life_blueprint.route("/<int:product_allocated_id>/detail-modal")
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
def detail_modal(product_allocated_id: int):
    product_allocated = db.session.get(m.ProductAllocated, product_allocated_id)
    if not product_allocated:
        log(log.ERROR, "Report product_allocated not found")
        return render_template(
            "toast.html", message="Product not found", category="danger"
        )

    data = create_shelf_life_dataset(product_allocated)

    return render_template(
        "report/shelf_life/detail_modal.html",
        data=data,
        product_allocated=product_allocated,
    )
