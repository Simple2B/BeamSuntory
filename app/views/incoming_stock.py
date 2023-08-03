import json
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


# NOTE incoming stock IS inbound order. Meaning goods going from supplier to warehouse
incoming_stock_blueprint = Blueprint(
    "incoming_stock", __name__, url_prefix="/incoming_stock"
)


@incoming_stock_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewInboundOrderForm = f.NewInboundOrderForm()
    form_edit: f.InboundOrderForm = f.InboundOrderForm()

    q = request.args.get("q", type=str, default=None)
    query = m.InboundOrder.select().order_by(m.InboundOrder.id)
    count_query = sa.select(sa.func.count()).select_from(m.InboundOrder)
    if q:
        query = (
            m.InboundOrder.select()
            .where(
                m.InboundOrder.order_title.like(f"{q}%")
                | m.InboundOrder.quantity.like(f"{q}%")
            )
            .order_by(m.InboundOrder.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(
                m.InboundOrder.order_title.like(f"{q}%")
                | m.InboundOrder.quantity.like(f"{q}%")
            )
            .select_from(m.InboundOrder)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "incoming_stock/incoming_stocks.html",
        inbound_orders=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        suppliers=[
            s
            for s in db.session.execute(
                m.Supplier.select().order_by(m.Supplier.id)
            ).scalars()
        ],
        delivery_agents=[
            da
            for da in db.session.execute(
                m.DeliveryAgent.select().order_by(m.DeliveryAgent.id)
            ).scalars()
        ],
        warehouses=[
            w
            for w in db.session.execute(
                m.Warehouse.select().order_by(m.Warehouse.id)
            ).scalars()
        ],
        products=[
            p
            for p in db.session.execute(
                m.Product.select().order_by(m.Product.id)
            ).scalars()
        ],
        form_create=form_create,
        form_edit=form_edit,
    )


@incoming_stock_blueprint.route("/accept", methods=["POST"])
@login_required
def accept():
    form_edit: f.PackageInfoForm = f.PackageInfoForm()
    if form_edit.validate_on_submit():
        package_info: m.PackageInfo = db.session.execute(
            m.PackageInfo.select()
            .order_by(m.PackageInfo.id)
            .where(m.PackageInfo.inbound_order_id == form_edit.inbound_order_id.data)
        ).scalar()
        if package_info:
            package_info.quantity_carton_master = form_edit.quantity_carton_master.data
            package_info.quantity_per_wrap = form_edit.quantity_per_wrap.data
            package_info.quantity_wrap_carton = form_edit.quantity_wrap_carton.data
            package_info.save()
        else:
            package_info = m.PackageInfo(
                inbound_order_id=int(form_edit.inbound_order_id.data),
                quantity_carton_master=form_edit.quantity_carton_master.data,
                quantity_per_wrap=form_edit.quantity_per_wrap.data,
                quantity_wrap_carton=form_edit.quantity_wrap_carton.data,
            )
            package_info.save()

    products_info_json = json.loads(form_edit.received_products.data)

    # NOTE transform json, so it would be easier to compare with db data
    products_received_quantity = {
        f'{i["product_id"]}_{i["group_id"]}': i["quantity_received"]
        for i in products_info_json
    }

    io: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(
            m.InboundOrder.id == int(form_edit.inbound_order_id.data)
        )
    )
    if not io:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404
    io.status = "Delivered"
    io.save()

    # save delivered product quantity, so this product would be available in warehouse
    products_quantity_group: list[m.ProductQuantityGroup] = db.session.execute(
        m.ProductQuantityGroup.select().where(
            m.ProductQuantityGroup.inbound_order_id == io.id,
        )
    ).scalars()
    if not products_quantity_group:
        flash("There is no such ProductQuantityGroup", "danger")
        return "no product quantity group", 404

    for product in products_quantity_group:
        warehouse_product: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == product.product_id,
                m.WarehouseProduct.warehouse_id == product.warehouse_id,
                m.WarehouseProduct.group_id == product.group_id,
            )
        ).scalar()
        real_quantity = products_received_quantity[
            f"{product.product_id}_{product.group_id}"
        ]
        if real_quantity != product.quantity:
            log(
                log.INFO,
                "Inbound order accepted! Ordered quantity: [%s], != received quantity: [%s]",
                product.quantity,
                real_quantity,
            )
            flash(
                f"Inbound order accepted! Ordered quantity: {product.quantity}, != received quantity: {real_quantity}",
                "warning",
            )

        if warehouse_product:
            warehouse_product.product_quantity += real_quantity
            warehouse_product.save()
        else:
            warehouse_product = m.WarehouseProduct(
                product_id=product.product_id,
                warehouse_id=product.warehouse_id,
                product_quantity=real_quantity,
                group_id=product.group_id,
            )
            warehouse_product.save()

    log(log.INFO, "Inbound order accepted. Inbound order: [%s]", io)
    if not real_quantity != product.quantity:
        flash("Inbound order accepted!", "success")
    return redirect(url_for("incoming_stock.get_all"))


@incoming_stock_blueprint.route("/cancel/<int:id>", methods=["GET"])
@login_required
def cancel(id: int):
    io: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(m.InboundOrder.id == id)
    )
    if not io:
        log(log.INFO, "There is no inbound order with id: [%s]", id)
        flash("There is no such inbound order", "danger")
        return "no inbound order", 404
    io.status = "Cancelled"
    io.save()

    log(log.INFO, "Inbound order canceled. Inbound order: [%s]", io)
    flash("Inbound order canceled!", "success")
    return "ok", 200
