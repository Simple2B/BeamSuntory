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


store_blueprint = Blueprint("store", __name__, url_prefix="/store")


@store_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewStoreForm = f.NewStoreForm()
    form_edit: f.StoreForm = f.StoreForm()

    q = request.args.get("q", type=str, default=None)
    query = m.Store.select().order_by(m.Store.id)
    count_query = sa.select(sa.func.count()).select_from(m.Store)
    if q:
        query = (
            m.Store.select()
            .where(m.Store.name.like(f"{q}%") | m.Store.email.like(f"{q}%"))
            .order_by(m.Store.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Store.name.like(f"{q}%") | m.Store.email.like(f"{q}%"))
            .select_from(m.Store)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "store/stores.html",
        stores=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
    )


@store_blueprint.route("/save", methods=["POST"])
@login_required
def save():
    form: f.StoreForm = f.StoreForm()
    if form.validate_on_submit():
        query = m.Store.select().where(m.Store.id == int(form.store_id.data))
        s: m.Store | None = db.session.scalar(query)
        if not s:
            log(
                log.ERROR,
                "Not found store by id : [%s]",
                form.store_id.data,
            )
            flash("Cannot save store data", "danger")

        s.store_category = form.store_category.data
        s.store_name = form.store_name.data
        s.contact_person = form.contact_person.data
        s.email = form.email.data
        s.phone_numb = form.phone_numb.data
        s.country = form.country.data
        s.region = form.region.data
        s.city = form.city.data
        s.address = form.address.data
        s.zip = form.zip.data
        s.active = form.active.data
        s.save()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("store.get_all"))

    else:
        log(log.ERROR, "Store save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("store.get_all"))


@store_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewStoreForm = f.NewStoreForm()
    if not form.validate_on_submit():
        flash("This username or email is already taken.", "danger")
        return redirect(url_for("store.get_all"))
    if form.validate_on_submit():
        store = m.Store(
            store_category=form.store_category.data,
            store_name=form.store_name.data,
            contact_person=form.contact_person.data,
            email=form.email.data,
            phone_numb=form.phone_numb.data,
            country=form.country.data,
            region=form.region.data,
            city=form.city.data,
            address=form.address.data,
            zip=form.zip.data,
            active=form.active.data,
        )
        log(log.INFO, "Form submitted. Store: [%s]", store)
        flash("Store added!", "success")
        store.save()

        return redirect(url_for("store.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("store.get_all"))


@store_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    s = db.session.scalar(m.Store.select().where(m.Store.id == id))
    if not s:
        log(log.INFO, "There is no store with id: [%s]", id)
        flash("There is no such store", "danger")
        return "no store", 404

    delete_s = sa.delete(m.Store).where(m.Store.id == id)
    db.session.execute(delete_s)
    db.session.commit()
    log(log.INFO, "Store deleted. Store: [%s]", s)
    flash("Store deleted!", "success")
    return "ok", 200
