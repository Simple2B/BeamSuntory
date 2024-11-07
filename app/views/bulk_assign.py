# flake8: noqa E501

import io
import os
from flask import (
    Blueprint,
    render_template,
    render_template_string,
    request,
    flash,
    send_file,
)

from flask_login import login_required, current_user
from openpyxl import Workbook
import pandas as pd
import sqlalchemy as sa

from app.controllers import (
    create_pagination,
    role_required,
    save_exel_file,
)

from app import models as m, db
from app import schema as s
from app import forms as f
from app.controllers import validate_bulk_assign_excel
from app.controllers.bulk_assign import create_assigns
from app.controllers.excel import (
    create_group_sheet,
    create_store_sheet,
    create_master_group_sheet,
)
from app.controllers.user import requires_bulk_assign
from app.logger import log
from .utils import RELOAD_PAGE_SCRIPT


bulk_assign_bp = Blueprint("bulk_assign", __name__, url_prefix="/bulk-assign")


@bulk_assign_bp.route("/", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
    ],
)
@requires_bulk_assign
def get_all():

    q = request.args.get("q", type=str, default="")

    where_stmt = sa.and_(
        m.BulkAssign.is_deleted.is_(False), m.BulkAssign.user_id == current_user.id
    )

    if q:
        where_stmt = sa.and_(
            where_stmt,
            sa.or_(
                m.BulkAssign.name.ilike(f"%{q}%"),
            ),
        )

    query = (
        sa.select(m.BulkAssign)
        .where(where_stmt)
        .order_by(m.BulkAssign.created_at.desc())
    )
    count_query = sa.select(sa.func.count()).where(where_stmt).select_from(m.BulkAssign)

    pagination = create_pagination(total=db.session.scalar(count_query))
    bulk_assigns = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )

    return render_template(
        "bulk_assign/bulk_assigns.html",
        bulk_assigns=bulk_assigns,
        page=pagination,
        q=q,
    )


@bulk_assign_bp.route("/download-template", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
    ],
)
@requires_bulk_assign
def download_template():

    GROUP_NAMES = [u.name for u in current_user.user_groups]

    wb = Workbook()
    main_sheet = wb.active
    main_sheet.title = "Main"

    create_group_sheet(wb, main_sheet, GROUP_NAMES)
    create_store_sheet(wb, main_sheet, GROUP_NAMES)
    create_master_group_sheet(wb, main_sheet, GROUP_NAMES)

    # Set up the main form sheet
    main_sheet["A1"] = s.BulkAssignFields.SKU.value
    main_sheet["B1"] = s.BulkAssignFields.GROUP_FROM.value
    main_sheet["D1"] = s.BulkAssignFields.PRODUCT_GROUP_TO.value
    main_sheet["E1"] = s.BulkAssignFields.QUANTITY.value
    main_sheet["C1"] = s.BulkAssignFields.MASTER_GROUP_TO.value

    # Save the workbook to a BytesIO object
    output = io.BytesIO()
    wb.save(output)
    output.seek(0)

    # Step 7: Serve the Excel file as a download
    return send_file(
        output,
        as_attachment=True,
        download_name="empty_form_with_dropdowns.xlsx",
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@bulk_assign_bp.route("/create", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
    ],
)
@requires_bulk_assign
def get_create_modal():
    """htmx"""
    form = f.NewBulkAssignForm()
    return render_template("bulk_assign/modal_add.html", form=form)


@bulk_assign_bp.route("/create", methods=["POST"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
    ],
)
@requires_bulk_assign
def create():
    """htmx"""
    form: f.NewBulkAssignForm = f.NewBulkAssignForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Form validation failed", form.errors)

        return render_template(
            "bulk_assign/modal_add.html", form=form, errors=form.errors
        )

    file = request.files.get("exel_file")

    if not file:
        log(log.ERROR, "Form validation failed", form.errors)
        return render_template(
            "bulk_assign/modal_add.html",
            form=form,
            errors={"file": ["File is required"]},
        )

    result = s.ValidateBulkAssignResult(errors=dict())
    file.seek(0)

    # why we forse saving the file and then validate it because after validation file change and save not work properly
    absolute_file_path, upload_file_path = save_exel_file(file, result)
    if result.errors:
        log(log.ERROR, "Exel save failed", result.errors)
        return render_template(
            "bulk_assign/modal_add.html", form=form, errors=result.errors
        )

    assigns = validate_bulk_assign_excel(file, result)

    if result.errors:
        log(log.ERROR, "Exel validation failed", result.errors)

        os.remove(absolute_file_path)

        return render_template(
            "bulk_assign/modal_add.html", form=form, errors=result.errors
        )
    bulk_assign = m.BulkAssign(
        user_id=current_user.id,
        type=s.BulkShipStatus.DRAFT.value,
        name=form.name.data,
        absolute_file_path=str(absolute_file_path),
        uploaded_file_path=str(upload_file_path),
    ).save()

    try:
        create_assigns(assigns, bulk_assign)
    except Exception as e:
        log(log.ERROR, "Bulk assign creation failed", str(e))
        return render_template(
            "toast.html", message="Bulk assign creation failed", category="error"
        )

    flash("Bulk assign created successfully", category="success")

    return render_template_string(RELOAD_PAGE_SCRIPT)


@bulk_assign_bp.route("/<uuid>/download-template", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
    ],
)
@requires_bulk_assign
def bulk_assign_template_download(uuid: str):

    bulk_assign = db.session.scalar(
        sa.select(m.BulkAssign).where(m.BulkAssign.uuid == uuid)
    )
    if not bulk_assign or bulk_assign.is_deleted:
        log(log.ERROR, "Bulk assign not found [%s]", uuid)
        flash("Bulk assign not found", category="danger")
        return "", 404

    if not os.path.exists(bulk_assign.absolute_file_path):
        log(log.ERROR, "File not found [%s]", bulk_assign.absolute_file_path)
        flash("File not found", category="danger")
        return "", 404

    return send_file(
        bulk_assign.uploaded_file_path,
        as_attachment=True,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )


@bulk_assign_bp.route("/<uuid>/view", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
    ],
)
@requires_bulk_assign
def view(uuid: str):
    """htmx"""
    bulk_assign = db.session.scalar(
        sa.select(m.BulkAssign).where(m.BulkAssign.uuid == uuid)
    )
    if not bulk_assign or bulk_assign.is_deleted:
        log(log.ERROR, "Bulk assign not found [%s]", uuid)
        flash("Bulk assign not found", category="danger")
        return render_template_string(RELOAD_PAGE_SCRIPT)

    if not os.path.exists(bulk_assign.absolute_file_path):
        log(log.ERROR, "File not found [%s]", bulk_assign.absolute_file_path)
        flash("File not found", category="danger")
        return "", 404

    df = pd.read_excel(bulk_assign.absolute_file_path)
    excel_html = df.to_html(
        index=False,
    )

    return render_template("bulk_assign/modal_view.html", excel_html=excel_html)
