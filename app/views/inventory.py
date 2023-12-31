# flake8: noqa
from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db


inventory_blueprint = Blueprint("inventory", __name__, url_prefix="/inventory")


@inventory_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    warehouse = aliased(m.Warehouse)
    product = aliased(m.Product)
    q = request.args.get("q", type=str, default=None)
    query = m.WarehouseProduct.select().order_by(m.WarehouseProduct.id)
    if q:
        query = (
            m.WarehouseProduct.select()
            .join(warehouse, m.WarehouseProduct.warehouse_id == warehouse.id)
            .join(product, m.WarehouseProduct.product_id == product.id)
            .where(
                warehouse.name.ilike(f"%{q}%")
                | product.name.ilike(f"%{q}%")
                | product.SKU.ilike(f"%{q}%")
            )
            .order_by(m.WarehouseProduct.id)
        )

    query_result_list: list[m.WarehouseProduct] = [
        i for i in db.session.execute(query).scalars()
    ]

    warehouse_product_qty = {}

    for wpq in query_result_list:
        warehouse_product_qty_dict = dict()
        wpq_key = f"{wpq.warehouse.name}-{wpq.product.name}"
        if wpq_key in warehouse_product_qty:
            warehouse_product_qty[wpq_key]["qty"] += wpq.product_quantity
        else:
            warehouse_product_qty_dict["warehouse"] = wpq.warehouse
            warehouse_product_qty_dict["product"] = wpq.product
            warehouse_product_qty_dict["qty"] = wpq.product_quantity
            warehouse_product_qty[wpq_key] = warehouse_product_qty_dict

    warehouse_product_qty = list(warehouse_product_qty.values())

    pagination = create_pagination(total=len(warehouse_product_qty))
    return render_template(
        "inventory/inventories.html",
        warehouse_product_qty=warehouse_product_qty[
            pagination.per_page
            * (pagination.page - 1) : (pagination.per_page * pagination.page)
        ],
        page=pagination,
        search_query=q,
    )
