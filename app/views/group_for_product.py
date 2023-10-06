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
    query = m.GroupProduct.select().order_by(m.GroupProduct.id)
    count_query = sa.select(sa.func.count()).select_from(m.GroupProduct)
    if q:
        query = (
            m.GroupProduct.select()
            .join(master_group, m.GroupProduct.master_group_id == master_group.id)
            .where(
                m.GroupProduct.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%")
            )
            .order_by(m.GroupProduct.id)
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
    if form.validate_on_submit():
        query = m.GroupProduct.select().where(m.GroupProduct.name == form.name.data)
        gr: m.GroupProduct | None = db.session.scalar(query)
        if gr:
            flash("This group_for_product name is already taken.", "danger")
            return redirect(url_for("group_product.get_all"))
        group = m.GroupProduct(
            name=form.name.data,
            master_group_id=form.master_group.data,
        )
        log(log.INFO, "Form submitted. Group for product: [%s]", group)
        group.save()
        flash("Group for product added!", "success")
        return redirect(url_for("group_product.get_all"))
    else:
        log(log.ERROR, "Group_for_product creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("group_product.get_all"))


@group_for_product_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form: f.GroupProductForm = f.GroupProductForm()
    if form.validate_on_submit():
        query = m.GroupProduct.select().where(
            m.GroupProduct.id == int(form.group_product_id.data)
        )
        u: m.GroupProduct | None = db.session.scalar(query)
        if not u:
            log(
                log.ERROR,
                "Not found group_for_product by id : [%s]",
                form.group_product_id.data,
            )
            flash("Cannot save group_for_product data", "danger")
        u.name = form.name.data
        u.master_group_id = form.master_group.data
        u.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("group_product.get_all"))

    else:
        log(log.ERROR, "group_for_product save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("group_product.get_all"))


@group_for_product_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    u = db.session.scalar(m.GroupProduct.select().where(m.GroupProduct.id == id))
    if not u:
        log(log.INFO, "There is no group_for_product with id: [%s]", id)
        flash("There is no such group_for_product", "danger")
        return "no group_for_product", 404

    delete_u = sa.delete(m.GroupProduct).where(m.GroupProduct.id == id)
    db.session.execute(delete_u)
    db.session.commit()
    log(log.INFO, "Group deleted. Group for product: [%s]", u)
    flash("Group_for_product deleted!", "success")
    return "ok", 200
