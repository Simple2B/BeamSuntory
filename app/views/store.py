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
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


store_blueprint = Blueprint("store", __name__, url_prefix="/store")


@store_blueprint.route("/", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def get_all():
    form_create: f.NewStoreForm = f.NewStoreForm()
    form_edit: f.StoreForm = f.StoreForm()

    store_category = aliased(m.StoreCategory)
    q = request.args.get("q", type=str, default=None)
    query = m.Store.select().order_by(m.Store.id)
    count_query = sa.select(sa.func.count()).select_from(m.Store)
    if q:
        query = (
            m.Store.select()
            .join(
                store_category,
                m.Store.store_category_id == store_category.id,
            )
            .where(
                m.Store.store_name.ilike(f"%{q}%")
                | m.Store.email.ilike(f"%{q}%")
                | store_category.name.ilike(f"%{q}%")
            )
            .order_by(m.Store.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .join(
                store_category,
                m.Store.store_category_id == store_category.id,
            )
            .where(
                m.Store.store_name.ilike(f"%{q}%")
                | m.Store.email.ilike(f"%{q}%")
                | store_category.name.ilike(f"%{q}%")
            )
            .select_from(m.Store)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    stores = [
        store
        for store in db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars()
    ]

    for store in stores:
        store.favorite = db.session.execute(
            sa.select(m.FavoriteStoreUser)
            .where(m.FavoriteStoreUser.user_id == current_user.id)
            .where(m.FavoriteStoreUser.store_id == store.id)
        ).scalar()
        if store.favorite:
            store.favorite = True
        else:
            store.favorite = False

    store_categories = db.session.execute(m.StoreCategory.select()).scalars().all()

    return render_template(
        "store/stores.html",
        stores=stores,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        current_user_id=current_user.id,
        store_categories=store_categories,
    )


@store_blueprint.route("/save", methods=["POST"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
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

        s.store_category_id = int(form.store_category.data)
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
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def create():
    form: f.NewStoreForm = f.NewStoreForm()
    if form.validate_on_submit():
        store = m.Store(
            store_category_id=int(form.store_category.data),
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

        favorite_store: m.FavoriteStoreUser = m.FavoriteStoreUser(
            user_id=current_user.id,
            store_id=store.id,
        )
        favorite_store.save()

        return redirect(url_for("store.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("store.get_all"))


@store_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
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


@store_blueprint.route("/add-favorite", methods=["POST"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def add_favorite():
    store_user_ids = request.json
    favorite_user_store: m.FavoriteStoreUser = db.session.execute(
        m.FavoriteStoreUser.select().where(
            m.FavoriteStoreUser.user_id == store_user_ids["user_id"],
            m.FavoriteStoreUser.store_id == store_user_ids["store_id"],
        )
    ).scalar()
    if favorite_user_store:
        delete_favorite_user_store = sa.delete(m.FavoriteStoreUser).where(
            m.FavoriteStoreUser.id == favorite_user_store.id
        )
        db.session.execute(delete_favorite_user_store)
        db.session.commit()
        return "ok", 200
    else:
        favorite_store = m.FavoriteStoreUser(
            user_id=store_user_ids["user_id"],
            store_id=store_user_ids["store_id"],
        )
        favorite_store.save()
        return "ok", 200
