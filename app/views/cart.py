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
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log


cart_blueprint = Blueprint("cart", __name__, url_prefix="/cart")


@cart_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form = f.CartForm()

    q = request.args.get("q", type=str, default=None)
    query = m.Cart.select().where(m.Cart.status == "pending").order_by(m.Cart.id)
    count_query = sa.select(sa.func.count()).select_from(m.Cart)
    if q:
        query = (
            m.Cart.select().where(m.Cart.order_numb.like(f"{q}%")).order_by(m.Cart.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Cart.order_numb.like(f"{q}%"))
            .select_from(m.Cart)
        )
    pagination = create_pagination(total=db.session.scalar(count_query))

    delivery_agents_rows = db.session.execute(sa.select(m.DeliveryAgent)).all()
    delivery_agents = [row[0] for row in delivery_agents_rows]

    warehouses_rows = db.session.execute(sa.select(m.Warehouse)).all()
    warehouses = [row[0] for row in warehouses_rows]

    stores_rows = db.session.execute(sa.select(m.Store)).all()
    stores = [row[0] for row in stores_rows]

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

    warehouse_products = db.session.execute(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id.in_(
                [wp.product_id for wp in db.session.execute(query).scalars()]
            )
        )
    ).scalars()

    available_products = (
        {wp.group.name: wp.product_quantity for wp in warehouse_products}
        if warehouse_products
        else {}
    )
    store_categories = [
        sc for sc in db.session.execute(m.StoreCategory.select()).scalars()
    ]

    return render_template(
        "cart.html",
        cart_items=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        form=form,
        delivery_agents=delivery_agents,
        warehouses=warehouses,
        stores=stores,
        available_products=available_products,
        store_categories=store_categories,
    )


@cart_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewCartForm = f.NewCartForm()
    if form.validate_on_submit():
        item = m.Cart(
            product_id=int(form.product_id.data),
            quantity=int(form.quantity.data),
            user_id=current_user.id,
            group=form.group.data,
        )
        log(log.INFO, "Form submitted. Cart: [%s]", item)
        item.save()
        flash("Item added!", "success")
        return redirect(url_for("product.get_all"))
    else:
        log(log.ERROR, "Item creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


@cart_blueprint.route("/edit", methods=["POST"])
@login_required
def save():
    form: f.CartForm = f.CartForm()
    if form.validate_on_submit():
        query = m.Cart.select().where(m.Cart.id == int(form.cart_id.data))
        c: m.Cart | None = db.session.scalar(query)
        if not c:
            log(log.ERROR, "Not found cart item by id : [%s]", form.cart_id.data)
            flash("Cannot save item data", "danger")
        c.quantity = form.quantity.data
        c.save()
        return redirect(url_for("cart.get_all"))

    else:
        log(log.ERROR, "Cart item save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("cart.get_all"))


@cart_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    c = db.session.scalar(m.Cart.select().where(m.Cart.id == id))
    if not c:
        log(log.INFO, "There is no cart item with id: [%s]", id)
        flash("There is no such item", "danger")
        return "no item", 404

    delete_c = sa.delete(m.Cart).where(m.Cart.id == id)
    db.session.execute(delete_c)
    db.session.commit()
    log(log.INFO, "Cart item deleted. Group: [%s]", c)
    flash("Item deleted!", "success")
    return "ok", 200
