import io
import json
from datetime import datetime

from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    send_file,
    url_for,
)

from flask_login import login_required, current_user
import pandas as pd
from openpyxl import Workbook, load_workbook
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter
import sqlalchemy as sa
from sqlalchemy import desc
from pydantic import ValidationError
from openpyxl.utils import quote_sheetname
from openpyxl.workbook.defined_name import DefinedName

from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.controllers import validate_bulk_ship_exel
from app.controllers.report import send_xlsx_response
from app.logger import log
from .utils import create_metch


bulk_ship_bp = Blueprint("bulk_ship", __name__, url_prefix="/bulk-ship")


@bulk_ship_bp.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():

    # where_stmt = sa.and_(m.BulkShip.is_deleted.is_(False))

    # query = (
    #     sa.select(m.BulkShip).where(where_stmt).order_by(m.BulkShip.created_at.desc())
    # )
    # count_query = sa.select(sa.func.count()).where(where_stmt).select_from(m.BulkShip)

    pagination = create_pagination(total=0)
    # bulk_ships = db.session.scalars(
    #     query.offset((pagination.page - 1) * pagination.per_page).limit(
    #         pagination.per_page
    #     )
    # )

    return render_template(
        "bulk_ship/bulk_ships.html",
        bulk_ships=[],
        page=pagination,
    )


countries = {
    "USA": ["New York", "Los Angeles", "Chicago"],
    "Canada": ["Toronto", "Vancouver", "Montreal"],
    "UK": ["London", "Manchester", "Birmingham"],
}


@bulk_ship_bp.route("/download-template", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def download_template():

    wb = Workbook()
    main_sheet = wb.active
    main_sheet.title = "Main"

    # Create the product sheet
    products = db.session.scalars(sa.select(m.Product))
    product_count = db.session.scalar(sa.select(sa.func.count()).select_from(m.Product))
    groups_sheet = wb.create_sheet(title="Groups")
    for col, product in enumerate(products, start=1):
        col_letter = get_column_letter(col)
        groups_sheet[f"{col_letter}1"] = product.SKU
        for row, wh_product in enumerate(product.warehouse_products, start=2):
            groups_sheet[f"{col_letter}{row}"] = (
                f"{wh_product.group.name} ({wh_product.available_quantity})"
            )

    store_categories = db.session.scalars(sa.select(m.StoreCategory))
    count_store_categories = db.session.scalar(
        sa.select(sa.func.count()).select_from(m.StoreCategory)
    )

    # Create the store categories sheet
    store_categories_sheet = wb.create_sheet(title="Stores")
    for col, store_category in enumerate(store_categories, start=1):
        col_letter = get_column_letter(col)
        store_categories_sheet[f"{col_letter}1"] = store_category.name
        for row, store in enumerate(store_category.stores, start=2):
            store_categories_sheet[f"{col_letter}{row}"] = store.store_name

    # Set up the main form sheet
    main_sheet["A1"] = "SKU"
    main_sheet["B1"] = "Group"
    main_sheet["C1"] = "Quantity"
    main_sheet["D1"] = "Store Category"
    main_sheet["E1"] = "Store name"

    # Add dropdowns for product SKUs
    last_let = get_column_letter(product_count)
    country_dv = DataValidation(
        type="list",
        formula1=f"{groups_sheet.title}!$A$1:${last_let}$1",
        showDropDown=False,
        allowBlank=False,
        showErrorMessage=True,
    )
    country_dv.error = "Please select a valid SKUs"
    country_dv.errorTitle = "Invalid SKU"
    main_sheet.add_data_validation(country_dv)
    country_dv.add("A2:A100")

    # Add dropdowns for store category
    store_last_let = get_column_letter(count_store_categories)
    store_category_dv = DataValidation(
        type="list",
        formula1=f"{store_categories_sheet.title}!$A$1:${store_last_let}$1",
        showDropDown=False,
        allowBlank=False,
        showErrorMessage=True,
    )
    store_category_dv.error = "Please select a valid store category"
    store_category_dv.errorTitle = "Invalid store category"
    main_sheet.add_data_validation(store_category_dv)
    store_category_dv.add("D2:D100")

    # Create data validation for cities using named ranges
    # offset( reference, rows, cols, height, width)
    # OFFSET(Data!A1,1,MATCH(A2,Data!A1:C1,0) -1,10,1)"

    # Create the named ranges
    for row in range(2, 100):
        store_category_dv = DataValidation(
            type="list",
            formula1=f"OFFSET({store_categories_sheet.title}!A1,1,{create_metch('D' + str(row), store_categories_sheet.title, count_store_categories)},500,1)",
            showDropDown=False,
            allow_blank=False,
            showErrorMessage=True,
        )
        store_category_dv.error = "Please select a valid store"
        store_category_dv.errorTitle = "Invalid store"
        main_sheet.add_data_validation(store_category_dv)
        store_category_dv.add(f"E{row}")

        groups_dv = DataValidation(
            type="list",
            formula1=f"OFFSET({groups_sheet.title}!A1,1,{create_metch('A' + str(row),groups_sheet.title, product_count)},30,1)",
            showDropDown=False,
            allow_blank=False,
            showErrorMessage=True,
        )
        groups_dv.error = "Please select a valid group"
        groups_dv.errorTitle = "Invalid group"
        main_sheet.add_data_validation(groups_dv)
        groups_dv.add(f"B{row}")

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


@bulk_ship_bp.route("/create", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_create_modal():
    """htmx"""
    form = f.NewBulkShipForm()
    return render_template("bulk_ship/modal_add.html", form=form)


# @bulk_ship_bp.route("/add-item", methods=["GET"])
# @login_required
# @role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
# def get_item_inputs():
#     """htmx"""
#     products = db.session.scalars(sa.select(m.Product)).all()
#     master_groups = db.session.scalars(sa.select(m.MasterGroup)).all()
#     store_categories = db.session.scalars(sa.select(m.StoreCategory)).all()
#     return render_template(
#         "bulk_ship/item.html",
#         products=products,
#         master_groups=master_groups,
#         store_categories=store_categories,
#         delete_btn=True,
#     )


# @bulk_ship_bp.route("/get-master-groups", methods=["GET"])
# @login_required
# @role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
# def get_master_groups():
#     """htmx"""
#     product_sku = request.args.get("product_sku", default=None, type=str)

#     master_groups = []
#     if product_sku:
#         master_groups = db.session.scalars(
#             sa.select(m.MasterGroup).where(
#                 m.MasterGroup.groups.any(
#                     m.Group.warehouse_product.any(
#                         m.WarehouseProduct.product.has(m.Product.SKU == product_sku)
#                     )
#                 )
#             )
#         ).all()

#     return render_template(
#         "bulk_ship/master_group_select.html", master_groups=master_groups
#     )


# @bulk_ship_bp.route("/get-groups", methods=["GET"])
# @login_required
# @role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
# def get_groups():
#     """htmx"""
#     master_group_id = request.args.get("master_group_id", default=None, type=int)
#     # group_id = request.args.get("group_id", default=None, type=int)
#     product_sku = request.args.get("product_sku", default=None, type=str)

#     wh_products = []

#     if master_group_id:
#         wh_products = db.session.scalars(
#             sa.select(m.WarehouseProduct).where(
#                 m.WarehouseProduct.product.has(m.Product.SKU == product_sku),
#                 m.WarehouseProduct.group.has(
#                     m.Group.master_group_id == master_group_id
#                 ),
#             )
#         ).all()

#     # if group_id:
#     #     groups = db.session.scalars(
#     #         sa.select(m.WarehouseProduct).where(
#     #             m.WarehouseProduct.product.has(m.Product.SKU == product_sku),
#     #             m.WarehouseProduct.group.has(
#     #                 m.Group.child_groups.any(m.Group.id == group_id)
#     #             ),
#     #         )
#     #     ).all()
#     #     return render_template("bulk_ship/sub_group_select.html", wh_products=groups)

#     return render_template("bulk_ship/group_select.html", wh_products=wh_products)


# @bulk_ship_bp.route("/get-available-qty", methods=["GET"])
# @login_required
# @role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
# def get_available_qty():
#     product_id = request.args.get("product_id", default=None, type=int)
#     group_id = request.args.get("group_id", default=None, type=int)

#     wh_product = db.session.scalar(
#         sa.select(m.WarehouseProduct).where(
#             m.WarehouseProduct.product_id == product_id,
#             m.WarehouseProduct.group_id == group_id,
#         )
#     )

#     res = s.AvailableQtyRes(available_qty=wh_product and wh_product.qty or 0)
#     return res.model_dump_json()


# @bulk_ship_bp.route("/get-stores", methods=["GET"])
# @login_required
# @role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
# def get_stores():
#     """htmx"""
#     store_category_id = request.args.get("store_category_id", default=None, type=int)

#     stores = db.session.scalars(
#         sa.select(m.Store).where(m.Store.store_category_id == store_category_id)
#     ).all()

#     return render_template("bulk_ship/store_select.html", stores=stores)


@bulk_ship_bp.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def create():

    form = f.NewBulkShipForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Form validation failed", form.errors)

        return render_template(
            "bulk_ship/modal_add.html", form=form, errors=form.errors
        )

    errors = validate_bulk_ship_exel()
    if errors:
        log(log.ERROR, "Exel validation failed", errors)
        return render_template("bulk_ship/modal_add.html", form=form, errors=errors)

    return render_template(
        "toast.html", message="Bulk ship created successfully", category="success"
    )


@bulk_ship_bp.route("/<uuid>/edit", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_edit_modal(uuid: str):
    """htmx"""

    return render_template(
        "bulk_ship/modal_edit.html",
    )


@bulk_ship_bp.route("/<uuid>/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def edit(uuid: str):

    return redirect(url_for("bulk_ship.get_all"))
