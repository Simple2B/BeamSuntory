from werkzeug.urls import url_parse
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
from app.controllers import create_pagination, role_required

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
        m.Cart.select()
        .where(m.Cart.status == "pending", m.Cart.user_id == current_user.id)
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
    pagination = create_pagination(total=db.session.scalar(count_query))

    delivery_agents_rows = db.session.execute(sa.select(m.DeliveryAgent)).all()
    delivery_agents = [row[0] for row in delivery_agents_rows]

    warehouses_rows = db.session.execute(sa.select(m.Warehouse)).all()
    warehouses = [row[0] for row in warehouses_rows]

    locker_id = db.session.execute(
        m.StoreCategory.select()
        .where(m.StoreCategory.name == SALES_REP_LOCKER_NAME)
        .with_only_columns(m.StoreCategory.id)
    ).scalar()

    stores_rows = db.session.execute(
        m.Store.select().where(m.Store.store_category_id != locker_id)
    ).all()
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

    warehouse_products = db.session.scalars(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id.in_(
                [wp.product_id for wp in db.session.execute(query).scalars()]
            )
        )
    ).all()

    available_products = (
        {
            wg.group.name: {
                wprod.product.SKU: wprod.product_quantity
                for wprod in warehouse_products
                if wg.group.name == wprod.group.name
            }
            for wg in warehouse_products
        }
        if warehouse_products
        else {}
    )
    store_categories = [
        sc
        for sc in db.session.execute(
            m.StoreCategory.select().where(m.StoreCategory.id != locker_id)
        ).scalars()
    ]
    sales_rep_role_id = db.session.execute(
        m.Division.select()
        .where(m.Division.role_name == s.UserRole.SALES_REP.value)
        .with_only_columns(m.Division.id)
    ).scalar()
    locker_store_category_ids = None

    if current_user.role == sales_rep_role_id:
        sales_rep_locker = db.session.execute(
            m.Store.select().where(m.Store.user_id == current_user.id)
        ).scalar()
        locker_store_category_ids = [
            sales_rep_locker.id,
            sales_rep_locker.store_category_id,
        ]
    current_user_role_name = (
        db.session.execute(
            m.Division.select().where(m.Division.id == current_user.role)
        )
        .scalar()
        .role_name
    )

    cart_items = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    ).all()
    carts = [
        {
            "group": cart.group.name,
            "id": cart.id,
            "quantity": cart.quantity,
            "product_id": cart.product_id,
        }
        for cart in cart_items
        if db.session.query(m.Group)
        .join(m.MasterGroup)
        .filter(
            m.MasterGroup.name == s.MasterGroupMandatory.events.value,
            m.Group.name == cart.group.name,
        )
        .count()
        > 0
    ]

    return render_template(
        "cart.html",
        cart_items=cart_items,
        page=pagination,
        search_query=q,
        form=form,
        delivery_agents=delivery_agents,
        warehouses=warehouses,
        stores=stores,
        available_products=available_products,
        store_categories=store_categories,
        current_user_role_name=current_user_role_name,
        sales_rep_role=s.UserRole.SALES_REP.value,
        carts=json.dumps(carts),
        locker_store_category_ids=(
            json.dumps(locker_store_category_ids) if locker_store_category_ids else None
        ),
    )


@cart_blueprint.route("/create/<warehouse_product_id>", methods=["POST", "GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def create(warehouse_product_id: int):
    form: f.NewCartForm = f.NewCartForm()
    warehouse_product = db.session.get(m.WarehouseProduct, warehouse_product_id)
    if not warehouse_product:
        log(log.ERROR, "Not found warehouse product by id : [%s]", warehouse_product_id)
        flash("Can not create item", "danger")
        return redirect(url_for("product.get_all"))
    is_event = (
        warehouse_product.group.master_group.name == s.MasterGroupMandatory.events.value
    )
    if request.method == "GET":

        if is_event:
            return render_template(
                "product/test_event.html",
                form=form,
                warehouse_product=warehouse_product,
            )
        return render_template(
            "product/ship.html", form=form, warehouse_product=warehouse_product
        )
    # url = request.referrer
    # query = url_parse(url).query if url else None
    if form.validate_on_submit():
        if form.quantity.data > warehouse_product.product_quantity:
            flash("Not enough products in stock", "danger")
            return redirect(url_for("product.get_all"))
        item = m.Cart(
            product_id=warehouse_product.product_id,
            group_id=warehouse_product.group_id,
            quantity=int(form.quantity.data),
            user_id=current_user.id,
        )
        log(log.INFO, "Form submitted. Cart: [%s]", item)
        item.save()
        flash("Item added!", "success")
        # TODO add query
        if is_event:
            return redirect(url_for("product.get_all", is_event="true"))
        # if query:
        #     return redirect(url_for("product.get_all"))
        return redirect(url_for("product.get_all"))
    else:
        log(log.ERROR, "Item creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        if is_event:
            return redirect(url_for("product.get_all", is_event="true"))
        # if query:
        #     return redirect(url_for("product.get_all"))
        return redirect(url_for("product.get_all"))


@cart_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.MANAGER.value])
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
@role_required([s.UserRole.ADMIN.value, s.UserRole.MANAGER.value])
def delete(id: int):
    c = db.session.scalar(m.Cart.select().where(m.Cart.id == id))
    if not c:
        log(log.INFO, "There is no cart item with id: [%s]", id)
        flash("There is no such item", "danger")
        return "no item", 404

    db.session.execute(m.Event.delete().where(m.Event.cart_id == id))
    db.session.delete(c)
    db.session.commit()
    log(log.INFO, "Cart item deleted. Group: [%s]", c)
    flash("Item deleted!", "success")
    return "ok", 200
