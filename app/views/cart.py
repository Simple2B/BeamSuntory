import json
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
from app.controllers import (
    create_pagination,
    role_required,
    get_query_params_from_headers,
)

from app import models as m, db

from app import schema as s
from app import forms as f
from app.logger import log
from config import SALES_REP_LOCKER_NAME


cart_blueprint = Blueprint("cart", __name__, url_prefix="/cart")


@cart_blueprint.route("/", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def get_all():
    form = f.CartForm()

    q = request.args.get("q", type=str, default=None)
    query = (
        sa.select(m.Cart)
        .where(
            m.Cart.status == s.CartStatus.PENDING.value,
            m.Cart.user_id == current_user.id,
        )
        .order_by(m.Cart.id)
    )
    count_query = sa.select(sa.func.count()).select_from(m.Cart)
    if q:
        query = (
            m.Cart.select().where(m.Cart.order_numb.ilike(f"%{q}%")).order_by(m.Cart.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Cart.order_numb.ilike(f"%{q}%"))
            .select_from(m.Cart)
        )

    locker_id = db.session.execute(
        m.StoreCategory.select()
        .where(m.StoreCategory.name == SALES_REP_LOCKER_NAME)
        .with_only_columns(m.StoreCategory.id)
    ).scalar()

    pagination = create_pagination(total=db.session.scalar(count_query))

    stores = db.session.scalars(
        m.Store.select().where(m.Store.store_category_id != locker_id)
    ).all()

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

    store_categories = db.session.scalars(
        sa.select(m.StoreCategory).where(m.StoreCategory.id != locker_id)
    ).all()

    is_locker_store_category = False

    if (
        current_user.role_obj.role_name == s.UserRole.SALES_REP.value
        and db.session.execute(
            m.Store.select().where(m.Store.user_id == current_user.id)
        )
        is not None
    ):
        is_locker_store_category = True

    cart_items = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).all()
    event_carts = [
        {
            "group": cart.group.name,
            "id": cart.id,
            "quantity": cart.quantity,
            "product_id": cart.product_id,
        }
        for cart in cart_items
        if cart.group.master_group.name == s.Events.name.value
    ]

    return render_template(
        "cart.html",
        cart_items=cart_items,
        page=pagination,
        form=form,
        stores=stores,
        store_categories=store_categories,
        carts=json.dumps(event_carts),
        is_locker_store_category=is_locker_store_category,
    )


@cart_blueprint.route("/get-base-select", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.SALES_REP.value,
    ]
)
def get_base_select():
    """htmx"""
    locker_id = db.session.execute(
        m.StoreCategory.select()
        .where(m.StoreCategory.name == SALES_REP_LOCKER_NAME)
        .with_only_columns(m.StoreCategory.id)
    ).scalar()

    stores = db.session.scalars(
        m.Store.select().where(m.Store.store_category_id != locker_id)
    ).all()

    store_categories = db.session.scalars(
        sa.select(m.StoreCategory).where(m.StoreCategory.id != locker_id)
    ).all()

    return render_template(
        "cart/base_select.html",
        store_categories=store_categories,
        stores=stores,
        is_locker_store_category=True,
    )


@cart_blueprint.route("/ship-to-locker", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.SALES_REP.value,
    ]
)
def get_ship_to_locker():
    """htmx"""
    stores = db.session.scalars(
        sa.select(m.Store).where(m.Store.user_id == current_user.id)
    ).all()

    store_categories = db.session.scalars(
        sa.select(m.StoreCategory)
        .join(m.Store)
        .where(m.Store.user_id == current_user.id)
    ).all()

    return render_template(
        "cart/locker_select.html",
        is_locker_store_category=True,
        store_categories=store_categories,
        stores=stores,
    )


@cart_blueprint.route("/get-stores", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def get_stores_options():
    """htmx"""

    category_id = request.args.get("store_category", type=str, default=None)
    is_favorites = request.args.get("is_favorites", type=bool, default=False)
    query = (
        sa.select(m.Store)
        .join(m.StoreCategory)
        .where(m.StoreCategory.name != SALES_REP_LOCKER_NAME)
    )
    if category_id:
        query = query.where(m.Store.store_category_id == category_id)

    if is_favorites:
        query = query.where(
            m.Store.id.in_(
                db.session.execute(
                    sa.select(m.FavoriteStoreUser.store_id).where(
                        m.FavoriteStoreUser.user_id == current_user.id
                    )
                ).scalars()
            )
        )

    stores = db.session.scalars(query.order_by(m.Store.store_name)).all()

    return render_template("cart/store_options.html", stores=stores)


@cart_blueprint.route("/create", methods=["POST"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.MANAGER.value,
        s.UserRole.SALES_REP.value,
    ]
)
def create():
    form: f.NewCartForm = f.NewCartForm()
    query_params = get_query_params_from_headers()

    if not form.validate_on_submit():
        log(log.ERROR, "Item creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all", **query_params))

    warehouse_product = db.session.get(
        m.WarehouseProduct, form.warehouse_product_id.data
    )

    if not warehouse_product:
        log(log.ERROR, "Not found warehouse products")
        return render_template(
            "error_modal.html", message="Can't find product warehouse"
        )

    is_event = False
    if warehouse_product.group.master_group.name == s.Events.name.value:
        is_event = True

    available_quantity = warehouse_product.available_quantity

    if form.quantity.data > available_quantity:
        flash("Not enough products in stock", "danger")
        return redirect(url_for("product.get_all"))

    cart_product_amount = (
        db.session.execute(
            sa.select(sa.func.sum(m.Cart.quantity)).where(
                m.Cart.user_id == current_user.id,
                m.Cart.product_id == warehouse_product.product_id,
                m.Cart.group_id == warehouse_product.group_id,
                m.Cart.from_warehouse_product_id == warehouse_product.id,
                m.Cart.status == s.CartStatus.PENDING.value,
            )
        ).scalar()
        or 0
    )
    new_quantity = int(form.quantity.data)

    if (cart_product_amount + new_quantity) > available_quantity:
        log(log.ERROR, "The cart is full,not enough products in stock")
        flash("The cart is full, not enough products in stock", "danger")
        return redirect(url_for("product.get_all"))

    item = m.Cart(
        product_id=warehouse_product.product_id,
        group_id=warehouse_product.group_id,
        quantity=new_quantity,
        from_warehouse_product_id=warehouse_product.id,
        user_id=current_user.id,
    )
    log(log.INFO, "Form submitted. Cart: [%s]", item)
    item.save()
    flash("Item added!", "success")
    if is_event:
        return redirect(url_for("product.get_all", is_event="true", **query_params))
    return redirect(url_for("product.get_all", **query_params))


@cart_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.MANAGER.value,
        s.UserRole.SALES_REP.value,
    ]
)
def save():
    form: f.CartForm = f.CartForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Cart item save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("cart.get_all"))

    cart = db.session.scalar(
        sa.select(m.Cart).where(m.Cart.id == int(form.cart_id.data))
    )

    if not cart:
        log(log.ERROR, "Not found cart item by id : [%s]", form.cart_id.data)
        flash("Cannot save item data", "danger")
        return redirect(url_for("cart.get_all"))

    available_quantity = cart.from_warehouse_product.available_quantity

    if not available_quantity:
        log(log.ERROR, "Not enough products in stock")
        flash("Cannot save item data", "danger")
        return redirect(url_for("cart.get_all"))

    cart_product_amount = (
        db.session.execute(
            sa.select(sa.func.sum(m.Cart.quantity)).where(
                m.Cart.id != cart.id,
                m.Cart.user_id == current_user.id,
                m.Cart.product_id == cart.product_id,
                m.Cart.from_warehouse_product_id == cart.from_warehouse_product_id,
                m.Cart.group_id == cart.group_id,
                m.Cart.status == s.CartStatus.PENDING.value,
            )
        ).scalar()
        or 0
    )
    if (
        form.quantity.data > available_quantity
    ) or cart_product_amount + form.quantity.data > available_quantity:
        log(log.ERROR, "The cart is full, not enough products in stock")
        flash("The cart is full, not enough products in stock", "danger")
        return redirect(url_for("cart.get_all"))

    cart.quantity = form.quantity.data
    cart.save()
    return redirect(url_for("cart.get_all"))


@cart_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def delete(id: int):
    cart = db.session.get(m.Cart, id)
    if not cart:
        log(log.INFO, "There is no cart item with id: [%s]", id)
        flash("There is no such item", "danger")
        return "no item", 404

    db.session.execute(m.Event.delete().where(m.Event.cart_id == id))
    db.session.delete(cart)
    db.session.commit()
    log(log.INFO, "Cart item deleted. cart_id: [%s]", id)
    flash("Item deleted!", "success")
    return "ok", 200
