from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, db


inventory_blueprint = Blueprint("inventory", __name__, url_prefix="/inventory")


@inventory_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
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
    )
