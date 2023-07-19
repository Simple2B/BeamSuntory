import base64
import datetime
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
    query = m.Cart.select().order_by(m.Cart.id)
    count_query = sa.select(sa.func.count()).select_from(m.Cart)
    if q:
        query = (
            m.Cart.select()
            .where(m.ShipRequest.order_numb.like(f"{q}%"))
            .order_by(m.Cart.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Cart.order_numb.like(f"{q}%"))
            .select_from(m.Cart)
        )
    pagination = create_pagination(total=db.session.scalar(count_query))

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
    )


@cart_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form = f.NewCartForm()
    if form.validate_on_submit():
        # query = m.Car.select().where(m.Group.name == form.name.data)
        # gr: m.Group | None = db.session.scalar(query)
        # if gr:
        #     flash("This group name is already taken.", "danger")
        #     return redirect(url_for("group.get_all"))
        item = m.Cart(
            product_id=int(form.product_id.data),
            quantity=int(form.quantity.data),
            user_id=current_user.id,
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
    form = f.GroupForm()
    if form.validate_on_submit():
        query = m.Cart.select().where(m.Cart.id == int(form.group_id.data))
        u: m.Group | None = db.session.scalar(query)
        if not u:
            log(log.ERROR, "Not found group by id : [%s]", form.group_id.data)
            flash("Cannot save group data", "danger")
        u.name = form.name.data
        u.master_group_id = form.master_group.data
        u.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("group.get_all"))

    else:
        log(log.ERROR, "group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("group.get_all"))


@cart_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    u = db.session.scalar(m.Group.select().where(m.Group.id == id))
    if not u:
        log(log.INFO, "There is no group with id: [%s]", id)
        flash("There is no such group", "danger")
        return "no group", 404

    delete_u = sa.delete(m.Group).where(m.Group.id == id)
    db.session.execute(delete_u)
    db.session.commit()
    log(log.INFO, "Group deleted. Group: [%s]", u)
    flash("Group deleted!", "success")
    return "ok", 200
