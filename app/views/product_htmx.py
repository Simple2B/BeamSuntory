from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import (
    role_required,
)

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


product_htmx = Blueprint("htmx", __name__, url_prefix="/htmx")


@product_htmx.route("/add", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_add_form():
    """htmx"""
    form = f.NewProductForm()
    supliers = db.session.scalars(sa.select(m.Supplier)).all()
    master_product_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).order_by(m.MasterGroupProduct.name.asc())
    ).all()
    return render_template(
        "product/modal_add.html",
        form=form,
        suppliers=supliers,
        currencies=[c.value for c in s.Currency],
        master_product_groups=master_product_groups,
    )


@product_htmx.route("/<product_id>/edit", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_edit_form(product_id: int):
    """htmx"""
    product = db.session.get(m.Product, product_id)
    if not product:
        log(log.ERROR, "Not found product by id : [%s]", product_id)
        return render_template(
            "toast.html", message="Product not found", category="danger"
        )
    form = f.ProductForm(
        product_id=product.id,
        name=product.name,
        supplier=product.supplier_id,
        currency=product.currency.value if product.currency else s.Currency.CAD.value,
        regular_price=product.regular_price,
        retail_price=product.retail_price,
        description=product.description,
        SKU=product.SKU,
        low_stock_level=product.low_stock_level,
        program_year=product.program_year,
        package_qty=product.package_qty,
        numb_of_items_per_case=product.numb_of_items_per_case,
        numb_of_cases_per_outer_case=product.numb_of_cases_per_outer_case,
        expiry_date=product.expiry_date,
        comments=product.comments,
        notes_location=product.notes_location,
        weight=product.weight,
        length=product.length,
        width=product.width,
        height=product.height,
        image=product.image_obj,
    )

    supliers = db.session.scalars(sa.select(m.Supplier)).all()
    master_product_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).order_by(m.MasterGroupProduct.name.asc())
    ).all()

    return render_template(
        "product/modal_edit.html",
        form=form,
        product=product,
        suppliers=supliers,
        currencies=[c.value for c in s.Currency],
        master_product_groups=master_product_groups,
    )


@product_htmx.route("/get-master-groups", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_product_master_groups():
    """htmx"""
    master_product_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).order_by(m.MasterGroupProduct.name.asc())
    ).all()
    sub_groups = (
        master_product_groups[0].groups_for_product if master_product_groups else []
    )

    return render_template(
        "product/product_master_group.html",
        master_product_groups=master_product_groups,
        sub_groups=sub_groups,
    )


@product_htmx.route("/get-product-group", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_product_group():
    """htmx"""
    master_group_id = request.args.get("master_group_id", type=int, default=0)
    groups = []

    master_group = db.session.get(m.MasterGroupProduct, master_group_id)
    if master_group:
        groups = master_group.groups_for_product

    return render_template(
        "product/product_group.html",
        groups=groups,
    )


@product_htmx.route("/delete-group-for-product", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def delete_group_for_product():
    """htmx"""
    product_id = request.args.get("product_id", type=int, default=None)
    group_id = request.args.get("group_id", type=int, default=None)
    if not product_id or not group_id:
        log(log.ERROR, "Product id or group id not found")
        return "Product id or group id not found", 202

    prod_group = db.session.scalar(
        sa.select(m.ProductGroup).where(
            m.ProductGroup.product_id == product_id, m.ProductGroup.group_id == group_id
        )
    )
    if not prod_group:
        log(log.ERROR, "Product group not found")
        return "Product group not found", 202

    db.session.delete(prod_group)
    db.session.commit()

    return "ok", 200


@product_htmx.route("/<int:product_id>/adjust", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_adjust_form(product_id: int):
    """htmx"""
    product = db.session.get(m.Product, product_id)
    if not product:
        log(log.ERROR, "Not found product by id : [%s]", product_id)
        return render_template(
            "toast.html", message="Product not found", category="danger"
        )

    form: f.AdjustProductForm = f.AdjustProductForm(product_id=product.id)

    return render_template(
        "product/modal_adjust.html",
        form=form,
        product=product,
    )
