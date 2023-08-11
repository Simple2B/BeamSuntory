from flask import (
    Blueprint,
    render_template,
    request,
    # flash,
    # redirect,
    # url_for,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, db

# from app import forms as f
# from app.logger import log


inventory_blueprint = Blueprint("inventory", __name__, url_prefix="/inventory")


@inventory_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    # form_create = f.NewMasterGroupForm()
    # form_edit = f.MasterGroupForm()

    q = request.args.get("q", type=str, default=None)
    query = m.WarehouseProduct.select().order_by(m.WarehouseProduct.id)
    count_query = sa.select(sa.func.count()).select_from(m.WarehouseProduct)
    if q:
        query = (
            m.WarehouseProduct.select()
            .where(m.WarehouseProduct.warehouse.name.like(f"{q}%"))
            .order_by(m.WarehouseProduct.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.WarehouseProduct.warehouse.name.like(f"{q}%"))
            .select_from(m.WarehouseProduct)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    query_result_list: list[m.WarehouseProduct] = [
        i for i in db.session.execute(query).scalars()
    ]

    warehouse_product_qty = []

    warehouse_products = {wpq.product_id for wpq in query_result_list}

    for ware_prod in warehouse_products:
        warehouse_product_qty_dict = dict()
        for wpq in query_result_list:
            if wpq.product_id == ware_prod:
                warehouse_product_qty_dict["warehouse"] = wpq.warehouse
                warehouse_product_qty_dict["product"] = wpq.product
                if "qty" in warehouse_product_qty_dict:
                    warehouse_product_qty_dict["qty"] += wpq.product_quantity
                else:
                    warehouse_product_qty_dict["qty"] = wpq.product_quantity

        warehouse_product_qty.append(warehouse_product_qty_dict)

    return render_template(
        "inventory/inventories.html",
        inventories=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        warehouse_product_qty=warehouse_product_qty,
        # form_create=form_create,
        # form_edit=form_edit,
    )


# TODO should we enable manipulating warehouse inventory from this view?
# @inventory_blueprint.route("/create", methods=["POST"])
# @login_required
# def create():
#     form = f.NewMasterGroupForm()
#     if form.validate_on_submit():
#         query = m.MasterGroup.select().where(m.MasterGroup.name == form.name.data)
#         mgr: m.MasterGroup | None = db.session.scalar(query)
#         if mgr:
#             flash("This master group name is already taken.", "danger")
#             return redirect(url_for("inventory.get_all"))
#         inventory = m.MasterGroup(
#             name=form.name.data,
#         )
#         log(log.INFO, "Form submitted. inventory: [%s]", inventory)
#         inventory.save()
#         flash("Master group added!", "success")
#         return redirect(url_for("inventory.get_all"))
#     else:
#         log(log.ERROR, "Master group creation errors: [%s]", form.errors)
#         flash(f"{form.errors}", "danger")
#         return redirect(url_for("inventory.get_all"))


# @inventory_blueprint.route("/edit", methods=["POST"])
# @login_required
# def save():
#     form = f.MasterGroupForm()
#     if form.validate_on_submit():
#         query = m.MasterGroup.select().where(
#             m.MasterGroup.id == int(form.inventory_id.data)
#         )
#         u: m.MasterGroup | None = db.session.scalar(query)
#         if not u:
#             log(
#                 log.ERROR,
#                 "Not found master group by id : [%s]",
#                 form.inventory_id.data,
#             )
#             flash("Cannot save master group data", "danger")
#         u.name = form.name.data
#         u.save()
#         if form.next_url.data:
#             return redirect(form.next_url.data)
#         return redirect(url_for("inventory.get_all"))

#     else:
#         log(log.ERROR, "Master group save errors: [%s]", form.errors)
#         flash(f"{form.errors}", "danger")
#         return redirect(url_for("inventory.get_all"))


# @inventory_blueprint.route("/delete/<int:id>", methods=["DELETE"])
# @login_required
# def delete(id: int):
#     u = db.session.scalar(m.MasterGroup.select().where(m.MasterGroup.id == id))
#     if not u:
#         log(log.INFO, "There is no master group with id: [%s]", id)
#         flash("There is no such master group", "danger")
#         return "no master group", 404

#     query_group = db.session.scalar(
#         m.Group.select().where(m.Group.inventory_id == u.id)
#     )

#     if query_group:
#         flash("Can not delete master group, while groups are connected to it", "danger")
#         return "can not delete master group", 202

#     db.session.delete(u)
#     db.session.commit()
#     log(log.INFO, "Master group deleted. Master group: [%s]", u)
#     flash("Master group deleted!", "success")
#     return "ok", 200
