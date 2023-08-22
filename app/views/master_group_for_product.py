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
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log


master_group_for_product_blueprint = Blueprint(
    "master_group_product", __name__, url_prefix="/master_group_for_product"
)


@master_group_for_product_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewMasterGroupProductForm = f.NewMasterGroupProductForm()
    form_edit: f.MasterGroupProductForm = f.MasterGroupProductForm()

    q = request.args.get("q", type=str, default=None)
    query = m.MasterGroupProduct.select().order_by(m.MasterGroupProduct.id)
    count_query = sa.select(sa.func.count()).select_from(m.MasterGroupProduct)
    if q:
        query = (
            m.MasterGroupProduct.select()
            .where(m.MasterGroupProduct.name.ilike(f"%{q}%"))
            .order_by(m.MasterGroupProduct.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.MasterGroupProduct.name.ilike(f"%{q}%"))
            .select_from(m.MasterGroupProduct)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    master_groups_rows = db.session.execute(sa.select(m.MasterGroupProduct)).all()

    return render_template(
        "master_group_for_product/master_groups_for_product.html",
        master_groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        main_master_groups=[i[0] for i in master_groups_rows],
        form_create=form_create,
        form_edit=form_edit,
    )


@master_group_for_product_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewMasterGroupProductForm = f.NewMasterGroupProductForm()
    if form.validate_on_submit():
        query = m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.name == form.name.data
        )
        mgr: m.MasterGroupProduct | None = db.session.scalar(query)
        if mgr:
            flash("This master group name is already taken.", "danger")
            return redirect(url_for("master_group_product.get_all"))
        master_group = m.MasterGroupProduct(
            name=form.name.data,
        )
        log(log.INFO, "Form submitted. master_group: [%s]", master_group)
        master_group.save()
        flash("Master group added!", "success")
        return redirect(url_for("master_group_product.get_all"))
    else:
        log(log.ERROR, "Master group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("master_group_product.get_all"))


@master_group_for_product_blueprint.route("/edit", methods=["POST"])
@login_required
def save():
    form: f.MasterGroupProductForm = f.MasterGroupProductForm()
    if form.validate_on_submit():
        query = m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.id == int(form.master_group_product_id.data)
        )
        u: m.MasterGroupProduct | None = db.session.scalar(query)
        if not u:
            log(
                log.ERROR,
                "Not found master group by id : [%s]",
                form.master_group_product_id.data,
            )
            flash("Cannot save master group data", "danger")
        u.name = form.name.data
        u.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("master_group_product.get_all"))

    else:
        log(log.ERROR, "Master group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("master_group_product.get_all"))


@master_group_for_product_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    u = db.session.scalar(
        m.MasterGroupProduct.select().where(m.MasterGroupProduct.id == id)
    )
    if not u:
        log(log.INFO, "There is no master group with id: [%s]", id)
        flash("There is no such master group", "danger")
        return "no master group", 404

    delete_u = sa.delete(m.MasterGroupProduct).where(m.MasterGroupProduct.id == id)
    db.session.execute(delete_u)
    db.session.commit()
    log(log.INFO, "Master group deleted. Master group: [%s]", u)
    flash("Master group deleted!", "success")
    return "ok", 200
