from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required
import sqlalchemy as sa
from sqlalchemy.orm import aliased
from sqlalchemy.exc import IntegrityError
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


group_for_product_blueprint = Blueprint(
    "group_product", __name__, url_prefix="/group_for_product"
)


@group_for_product_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def get_all():
    form_create: f.NewGroupProductForm = f.NewGroupProductForm()
    form_edit: f.GroupProductForm = f.GroupProductForm()

    master_group = aliased(m.MasterGroupProduct)
    q = request.args.get("q", type=str, default=None)
    query = m.GroupProduct.select().order_by(m.GroupProduct.name.asc())
    count_query = sa.select(sa.func.count()).select_from(m.GroupProduct)
    if q:
        query = (
            m.GroupProduct.select()
            .join(master_group, m.GroupProduct.master_group_id == master_group.id)
            .where(
                m.GroupProduct.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%")
            )
            .order_by(m.GroupProduct.name.asc())
        )
        count_query = (
            sa.select(sa.func.count())
            .join(master_group, m.GroupProduct.master_group_id == master_group.id)
            .where(
                m.GroupProduct.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%")
            )
            .select_from(m.GroupProduct)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    master_groups_rows_objs = db.session.execute(m.MasterGroupProduct.select()).all()
    master_groups = [row[0] for row in master_groups_rows_objs]

    return render_template(
        "group_for_product/groups_for_product.html",
        groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        master_groups=master_groups,
        main_master_groups=master_groups,
        form_create=form_create,
        form_edit=form_edit,
    )


@group_for_product_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form: f.NewGroupProductForm = f.NewGroupProductForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Group_for_product creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("group_product.get_all"))

    master_group_product = db.session.get(m.MasterGroupProduct, form.master_group.data)
    if not master_group_product:
        log(
            log.ERROR,
            "Not found master_group_product by id : [%s]",
            form.master_group.data,
        )
        flash("Not found master group for product", "danger")
        return redirect(url_for("group_product.get_all"))

    group = m.GroupProduct(
        name=form.name.data,
        master_group_id=master_group_product.id,
    )
    log(log.INFO, "Form submitted. Group for product: [%s]", group)
    group.save()
    flash("Group for product added!", "success")
    return redirect(url_for("group_product.get_all"))


@group_for_product_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form: f.GroupProductForm = f.GroupProductForm()
    if not form.validate_on_submit():
        log(log.ERROR, "group_for_product save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("group_product.get_all"))

    product_group = db.session.get(m.GroupProduct, form.group_product_id.data)
    if not product_group:
        log(
            log.ERROR,
            "Not found group_for_product by id : [%s]",
            form.group_product_id.data,
        )
        flash("Cannot save group for product data", "danger")
        return redirect(url_for("group_product.get_all"))

    master_group_product = db.session.get(m.MasterGroupProduct, form.master_group.data)
    if not master_group_product:
        log(
            log.ERROR,
            "Not found master_group_product by id : [%s]",
            form.master_group.data,
        )
        flash("Not found master group for product", "danger")
        return redirect(url_for("group_product.get_all"))

    product_group.name = form.name.data
    product_group.master_group_id = form.master_group.data
    product_group.save()
    if form.next_url.data:
        return redirect(form.next_url.data)
    return redirect(url_for("group_product.get_all"))


@group_for_product_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    group = db.session.get(m.GroupProduct, id)
    if not group:
        log(log.INFO, "There is no group_for_product with id: [%s]", id)
        flash("There is no such group for product", "danger")
        return "no group_for_product", 404

    delete_u = sa.delete(m.GroupProduct).where(m.GroupProduct.id == id)
    try:
        db.session.execute(delete_u)
        db.session.commit()
    except IntegrityError as e:
        log(log.ERROR, "Group deletion error: [%s]", e)
        db.session.rollback()
        flash("Unable to delete group, group has dependencies", "danger")
        return "Unable to delete group, group has dependencies", 409
    log(log.INFO, "Group deleted. Group for product: [%s]", group)
    flash("Group for product deleted!", "success")
    return "ok", 200
