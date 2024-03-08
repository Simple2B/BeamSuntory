import base64

from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required, current_user
import sqlalchemy as sa
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


store_category_blueprint = Blueprint(
    "store_category", __name__, url_prefix="/store_category"
)


@store_category_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def get_all():
    form_create: f.NewStoreCategoryForm = f.NewStoreCategoryForm()
    form_edit: f.StoreCategoryForm = f.StoreCategoryForm()

    q = request.args.get("q", type=str, default=None)
    query = m.StoreCategory.select().order_by(m.StoreCategory.id)
    count_query = sa.select(sa.func.count()).select_from(m.StoreCategory)
    if q:
        query = (
            m.StoreCategory.select()
            .where(m.StoreCategory.name.ilike(f"%{q}%"))
            .order_by(m.StoreCategory.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.StoreCategory.name.ilike(f"%{q}%"))
            .select_from(m.StoreCategory)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    store_categories = [
        store_category
        for store_category in db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars()
    ]

    return render_template(
        "store_category/store_categories.html",
        store_categories=store_categories,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        current_user_id=current_user.id,
    )


@store_category_blueprint.route("/save", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form: f.StoreCategoryForm = f.StoreCategoryForm()
    if form.validate_on_submit():
        query = m.StoreCategory.select().where(
            m.StoreCategory.id == int(form.store_category_id.data)
        )
        sc: m.StoreCategory | None = db.session.scalar(query)
        if not sc:
            log(
                log.ERROR,
                "Not found store category by id : [%s]",
                form.store_category_id.data,
            )
            flash("Cannot save store category data", "danger")

        sc.name = form.name.data
        sc.parent_category = form.parent_category.data
        image = request.files["image"]
        image_string = base64.b64encode(image.read()).decode()
        sc.image = image_string if len(image_string) != 0 else sc.image
        sc.active = form.active.data
        sc.save()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("store_category.get_all"))

    else:
        log(log.ERROR, "Store Category save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("store_category.get_all"))


@store_category_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form: f.NewStoreCategoryForm = f.NewStoreCategoryForm()
    if form.validate_on_submit():
        image = request.files["image"]
        image_string = base64.b64encode(image.read()).decode()
        store_category = m.StoreCategory(
            name=form.name.data,
            parent_category=form.parent_category.data,
            image=image_string,
            active=form.active.data,
        )
        log(log.INFO, "Form submitted. Store Category: [%s]", store_category)
        flash("Store Category added!", "success")
        store_category.save()

        return redirect(url_for("store_category.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("store_category.get_all"))


@store_category_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    s = db.session.scalar(m.StoreCategory.select().where(m.StoreCategory.id == id))
    if not s:
        log(log.INFO, "There is no store category with id: [%s]", id)
        flash("There is no such store category", "danger")
        return "no store category", 404

    delete_s = sa.delete(m.StoreCategory).where(m.StoreCategory.id == id)
    db.session.execute(delete_s)
    db.session.commit()
    log(log.INFO, "Store Category deleted. Store Category: [%s]", s)
    flash("Store Category deleted!", "success")
    return "ok", 200
