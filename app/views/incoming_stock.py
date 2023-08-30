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

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log
from config import BaseConfig


# NOTE incoming stock IS inbound order. Meaning goods going from supplier to warehouse
incoming_stock_blueprint = Blueprint(
    "incoming_stock", __name__, url_prefix="/incoming_stock"
)


@incoming_stock_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create: f.NewInboundOrderForm = f.NewInboundOrderForm()
    form_edit: f.InboundOrderForm = f.InboundOrderForm()
    filtered = False

    q = request.args.get("q", type=str, default=None)
    query = m.InboundOrder.select().order_by(m.InboundOrder.id)
    count_query = sa.select(sa.func.count()).select_from(m.InboundOrder)
    if q:
        query = query.where(
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.order_id.ilike(f"%{q}%")
        )
        count_query = count_query.where(
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.order_id.ilike(f"%{q}%")
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    inbound_orders = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )

    return render_template(
        "incoming_stock/incoming_stocks.html",
        inbound_orders=inbound_orders,
        page=pagination,
        search_query=q,
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)),
        warehouses=db.session.scalars(m.Warehouse.select().order_by(m.Warehouse.id)),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)),
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        filtered=filtered,
        inbound_orders_status=s.InboundOrderStatus,
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
        log(
            log.INFO,
            "There is no inbound order with id: [%s]",
            int(form_edit.inbound_order_id.data),
        )
        flash("There is no such inbound order", "danger")
        return redirect(url_for("incoming_stock.get_all"))

    # save delivered product quantity, so this product would be available in warehouse
    products_quantity_group: list[m.ProductQuantityGroup] = db.session.execute(
        m.ProductQuantityGroup.select().where(
            m.ProductQuantityGroup.inbound_order_id == io.id,
        )
    ).scalars()
    if not products_quantity_group:
        log(
            log.INFO,
            "There is no ProductQuantityGroup for inbound order with id: [%s]",
            int(form_edit.inbound_order_id.data),
        )
        flash("There is no such ProductQuantityGroup", "danger")
        return redirect(url_for("incoming_stock.get_all"))

    for product in products_quantity_group:
        warehouse_product: m.WarehouseProduct = db.session.scalar(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == product.product_id,
                m.WarehouseProduct.warehouse_id == product.warehouse_id,
                m.WarehouseProduct.group_id == product.group_id,
            )
        )

        # TODO: validate real quantity
        quantity_received = int(
            products_received_quantity[f"{product.product_id}_{product.group_id}"]
        )
        product.quantity_received = quantity_received
        product.save()

        if quantity_received != product.quantity:
            log(
                log.INFO,
                "Inbound order accepted! Ordered quantity: [%s], != received quantity: [%s]",
                product.quantity,
                quantity_received,
            )
            flash(
                f"Inbound order accepted! Ordered qty: {product.quantity}, != received qty: {quantity_received}",
                "warning",
            )

        if warehouse_product:
            warehouse_product.product_quantity += quantity_received
            warehouse_product.save()
        else:
            warehouse_product = m.WarehouseProduct(
                product_id=product.product_id,
                warehouse_id=product.warehouse_id,
                product_quantity=quantity_received,
                group_id=product.group_id,
            )
            warehouse_product.save()

    io.status = s.InboundOrderStatus.delivered
    io.save()
    log(log.INFO, "Inbound order accepted. Inbound order: [%s]", io)
    if not quantity_received != product.quantity:
        flash("Inbound order accepted!", "success")
    else:
        flash(
            "Inbound order accepted! But received quantity is different from ordered",
            "warning",
        )
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
    io.status = s.InboundOrderStatus.cancelled
    io.save()

    log(log.INFO, "Inbound order cancelled. Inbound order: [%s]", io)
    flash("Inbound order cancelled!", "success")
    return "ok", 200


@incoming_stock_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
def sort():
    # TODO: move to incoming stocks get request
    if (
        request.method == "GET"
        and request.args.get("page", type=str, default=None) is None
    ):
        flash("Sort without any arguments", "danger")
        return redirect(url_for("incoming_stock.get_all"))
    form_sort: f.SortByStatusInboundOrderForm = f.SortByStatusInboundOrderForm()
    form_create: f.NewInboundOrderForm = f.NewInboundOrderForm()
    form_edit: f.InboundOrderForm = f.InboundOrderForm()
    if not form_sort.validate_on_submit() and request.method == "POST":
        # NOTE: this is drop filters action
        return redirect(url_for("incoming_stock.get_all"))

    filtered = True
    status = form_sort.sort_by.data if request.method == "POST" else "Draft"

    q = request.args.get("q", type=str, default=None)
    query = (
        m.InboundOrder.select()
        .where(m.InboundOrder.status == s.InboundOrderStatus(status))
        .order_by(m.InboundOrder.id)
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.InboundOrder.status == s.InboundOrderStatus(status))
        .select_from(m.InboundOrder)
    )
    if q:
        query = query.where(
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.quantity.ilike(f"%{q}%"),
        )

        count_query = count_query.where(
            m.InboundOrder.order_title.ilike(f"%{q}%")
            | m.InboundOrder.quantity.ilike(f"%{q}%"),
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "incoming_stock/incoming_stocks.html",
        inbound_orders=db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ),
        page=pagination,
        search_query=q,
        suppliers=db.session.scalars(m.Supplier.select().order_by(m.Supplier.id)).all(),
        delivery_agents=db.session.scalars(
            m.DeliveryAgent.select().order_by(m.DeliveryAgent.id)
        ).all(),
        warehouses=db.session.scalars(
            m.Warehouse.select().order_by(m.Warehouse.id)
        ).all(),
        products=db.session.scalars(m.Product.select().order_by(m.Product.id)).all(),
        form_create=form_create,
        form_edit=form_edit,
        form_sort=form_sort,
        filtered=filtered,
        inbound_orders_status=BaseConfig.Config.INBOUND_ORDER_STATUS,  # TODO replace with enum
    )
