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
def get_all():

    store_category = aliased(m.StoreCategory)
    q = request.args.get("q", type=str, default=None)
    query = m.Store.select().order_by(m.Store.store_name.asc())
    count_query = sa.select(sa.func.count()).select_from(m.Store)

    is_favorite = request.args.get("is_favorite", type=bool, default=False)
    if is_favorite:
        query = (
            m.Store.select()
            .join(
                m.FavoriteStoreUser,
                m.FavoriteStoreUser.store_id == m.Store.id,
            )
            .where(m.FavoriteStoreUser.user_id == current_user.id)
            .order_by(m.Store.store_name.asc())
        )
        count_query = (
            sa.select(sa.func.count())
            .join(
                m.FavoriteStoreUser,
                m.FavoriteStoreUser.store_id == m.Store.id,
            )
            .where(m.FavoriteStoreUser.user_id == current_user.id)
            .select_from(m.Store)
        )

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
            .order_by(m.Store.store_name.asc())
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

    return render_template(
        "store/stores.html",
        is_favorite=is_favorite,
        stores=stores,
        page=pagination,
        search_query=q,
        current_user_id=current_user.id,
    )


@store_blueprint.route("/save/<store_id>", methods=["GET"])
@login_required
def get_edit_form(store_id: int):
    store = db.session.get(m.Store, store_id)
    if not store:
        log(log.ERROR, "Not found store by id : [%s]", store_id)
        return render_template("error_modal.html", message="Can't find store")

    store_categories = db.session.execute(m.StoreCategory.select()).scalars().all()
    form = f.StoreForm(
        store_id=store.id,
        store_name=store.store_name,
        category_id=store.store_category_id,
        contact_person=store.contact_person,
        email=store.email,
        phone_numb=store.phone_numb,
        country=store.country,
        region=store.region,
        city=store.city,
        address=store.address,
        zip=store.zip,
        active=store.active,
    )
    return render_template(
        "store/modal_edit.html", form=form, store_categories=store_categories
    )


@store_blueprint.route("/save", methods=["POST"])
@login_required
def save():
    form: f.StoreForm = f.StoreForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Store save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("store.get_all"))
    store = db.session.get(m.Store, form.store_id.data)
    if not store:
        log(
            log.ERROR,
            "Not found store by id : [%s]",
            form.store_id.data,
        )
        flash("Cannot save store data", "danger")
        return redirect(url_for("store.get_all"))

    if (
        form.category_id.data != store.store_category_id
        and db.session.get(m.StoreCategory, form.category_id.data) is None
    ):
        log(log.ERROR, "Not found store category by id: [%s]", form.category_id.data)
        flash("Cannot save store data", "danger")
        return redirect(url_for("store.get_all"))

    store.store_category_id = form.category_id.data
    store.store_name = form.store_name.data
    store.contact_person = form.contact_person.data
    store.email = form.email.data
    store.phone_numb = form.phone_numb.data
    store.country = form.country.data
    store.region = form.region.data
    store.city = form.city.data
    store.address = form.address.data
    store.zip = form.zip.data
    store.active = form.active.data
    store.save()

    if form.next_url.data:
        return redirect(form.next_url.data)
    return redirect(url_for("store.get_all"))


@store_blueprint.route("/create", methods=["GET"])
@login_required
def get_create_form():
    form: f.NewStoreForm = f.NewStoreForm()
    store_categories = db.session.execute(m.StoreCategory.select()).scalars().all()
    return render_template(
        "store/modal_add.html", form=form, store_categories=store_categories
    )


@store_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewStoreForm = f.NewStoreForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Form validation error: [%s]", form.errors)
        flash(f"Error: {form.errors}", "danger")
        return redirect(url_for("store.get_all"))
    store_category = db.session.get(m.StoreCategory, form.category_id.data)
    if not store_category:
        log(log.ERROR, "Not found store category by id: [%s]", form.category_id.data)
        flash("Cannot save store data", "danger")
        return redirect(url_for("store.get_all"))

    store = m.Store(
        store_category_id=store_category.id,
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


@store_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def delete(id: int):
    """htmx"""
    store = db.session.get(m.Store, id)
    if not store:
        log(log.INFO, "There is no store with id: [%s]", id)
        return render_template(
            "toast.html", category="danger", message="Store not found"
        )

    if (
        db.session.scalars(sa.select(m.ShipRequest).where(m.ShipRequest.store_id == id))
        is not None
    ):
        log(log.INFO, "Store has ship requests. Store: [%s]", store)
        return render_template(
            "toast.html",
            category="danger",
            message="The store has ship requests dependency. Can't delete",
        )
    _ = db.session.scalars(
        sa.delete(m.FavoriteStoreUser).returning(m.FavoriteStoreUser.id)
    ).all()
    db.session.delete(store)
    db.session.commit()
    log(log.INFO, "Store deleted. Store: [%s]", s)
    return render_template("toast.html", category="success", message="Store deleted")


@store_blueprint.route("/set-favorite/<store_id>", methods=["GET"])
@login_required
def set_favorite(store_id: int):
    """htmx"""
    store = db.session.get(m.Store, store_id)
    if not store:
        log(log.INFO, "There is no store with id: [%s]", store_id)
        return render_template(
            "toast.html", category="danger", message="Error while setting favorite"
        )
    favorite_store: m.FavoriteStoreUser = db.session.scalar(
        m.FavoriteStoreUser.select().where(
            m.FavoriteStoreUser.user_id == current_user.id,
            m.FavoriteStoreUser.store_id == store_id,
        )
    )
    if favorite_store:
        db.session.delete(favorite_store)
        db.session.commit()
        return render_template("store/favorite_icon.html", store=store, favorite=False)
    favorite_store = m.FavoriteStoreUser(
        user_id=current_user.id,
        store_id=store_id,
    )
    favorite_store.save()
    return render_template("store/favorite_icon.html", store=store, favorite=True)
