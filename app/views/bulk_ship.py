import json
from datetime import datetime

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
from sqlalchemy import desc
from pydantic import ValidationError

from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


bulk_ship_bp = Blueprint("bulk_ship", __name__, url_prefix="/bulk-ship")


@bulk_ship_bp.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():

    where_stmt = sa.and_(m.BulkShip.is_deleted.is_(False))

    query = (
        sa.select(m.BulkShip).where(where_stmt).order_by(m.BulkShip.created_at.desc())
    )
    count_query = sa.select(sa.func.count()).where(where_stmt).select_from(m.BulkShip)

    pagination = create_pagination(total=db.session.scalar(count_query))
    bulk_ships = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )

    return render_template(
        "bulk_ship/bulk_ships.html",
        bulk_ships=bulk_ships,
        page=pagination,
    )


@bulk_ship_bp.route("/create", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_create_modal():
    """htmx"""
    form = f.NewBulkShipForm()
    products = db.session.scalars(sa.select(m.Product)).all()
    master_groups = db.session.scalars(sa.select(m.MasterGroup)).all()
    store_categories = db.session.scalars(sa.select(m.StoreCategory)).all()
    return render_template(
        "bulk_ship/modal_add.html",
        form=form,
        products=products,
        master_groups=master_groups,
        store_categories=store_categories,
    )


@bulk_ship_bp.route("/add-item", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_item_inputs():
    """htmx"""
    products = db.session.scalars(sa.select(m.Product)).all()
    master_groups = db.session.scalars(sa.select(m.MasterGroup)).all()
    store_categories = db.session.scalars(sa.select(m.StoreCategory)).all()
    return render_template(
        "bulk_ship/item.html",
        products=products,
        master_groups=master_groups,
        store_categories=store_categories,
        delete_btn=True,
    )


@bulk_ship_bp.route("/get-master-groups", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_master_groups():
    """htmx"""
    product_sku = request.args.get("product_sku", default=None, type=str)

    master_groups = []
    if product_sku:
        master_groups = db.session.scalars(
            sa.select(m.MasterGroup).where(
                m.MasterGroup.groups.any(
                    m.Group.warehouse_product.any(
                        m.WarehouseProduct.product.has(m.Product.SKU == product_sku)
                    )
                )
            )
        ).all()

    return render_template(
        "bulk_ship/master_group_select.html", master_groups=master_groups
    )


@bulk_ship_bp.route("/get-groups", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_groups():
    """htmx"""
    master_group_id = request.args.get("master_group_id", default=None, type=int)
    # group_id = request.args.get("group_id", default=None, type=int)
    product_sku = request.args.get("product_sku", default=None, type=str)

    wh_products = []

    if master_group_id:
        wh_products = db.session.scalars(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product.has(m.Product.SKU == product_sku),
                m.WarehouseProduct.group.has(
                    m.Group.master_group_id == master_group_id
                ),
            )
        ).all()

    # if group_id:
    #     groups = db.session.scalars(
    #         sa.select(m.WarehouseProduct).where(
    #             m.WarehouseProduct.product.has(m.Product.SKU == product_sku),
    #             m.WarehouseProduct.group.has(
    #                 m.Group.child_groups.any(m.Group.id == group_id)
    #             ),
    #         )
    #     ).all()
    #     return render_template("bulk_ship/sub_group_select.html", wh_products=groups)

    return render_template("bulk_ship/group_select.html", wh_products=wh_products)


# @bulk_ship_bp.route("/get-available-qty", methods=["GET"])
# @login_required
# @role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
# def get_available_qty():
#     product_id = request.args.get("product_id", default=None, type=int)
#     group_id = request.args.get("group_id", default=None, type=int)

#     wh_product = db.session.scalar(
#         sa.select(m.WarehouseProduct).where(
#             m.WarehouseProduct.product_id == product_id,
#             m.WarehouseProduct.group_id == group_id,
#         )
#     )

#     res = s.AvailableQtyRes(available_qty=wh_product and wh_product.qty or 0)
#     return res.model_dump_json()


@bulk_ship_bp.route("/get-stores", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_stores():
    """htmx"""
    store_category_id = request.args.get("store_category_id", default=None, type=int)

    stores = db.session.scalars(
        sa.select(m.Store).where(m.Store.store_category_id == store_category_id)
    ).all()

    return render_template("bulk_ship/store_select.html", stores=stores)


@bulk_ship_bp.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def create():

    form = f.NewBulkShipForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Form validation failed", form.errors)
        flash("Form validation failed", "danger")
        return redirect(url_for("bulk_ship.get_all"))

    try:
        bulk_ship_items = s.bulk_ship_items_ad.validate_json(form.items_data.data)
    except ValidationError as e:
        log(log.ERROR, "Validation error %s", e.json())
        flash("Input data is not valid", "danger")
        return redirect(url_for("bulk_ship.get_all"))

    bulk_ship = m.BulkShip(
        status=s.BulkShipStatus.DRAFT.value,
        name=form.name.data,
    )
    db.session.add(bulk_ship)
    store_ids = {item.store_id for item in bulk_ship_items}
    bulk_sh_items: list[m.BulkShipItem] = []
    for item in bulk_ship_items:

        wh_product = db.session.scalar(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product.has(m.Product.SKU == item.product_sku),
                m.WarehouseProduct.group_id == item.group_id,
            )
        )
        total_qty = sum(
            it.qty
            for it in bulk_ship_items
            if it.group_id == item.group_id and it.product_sku == item.product_sku
        )
        if not wh_product or wh_product.available_quantity < total_qty:
            flash(f"Insufficient quantity for {item.product_sku}", "danger")
            return redirect(url_for("bulk_ship.get_all"))

        store = db.session.scalar(sa.select(m.Store).where(m.Store.id == item.store_id))
        if not store:
            log(log.ERROR, "Store not found")
            flash("Store not found", "danger")
            return redirect(url_for("bulk_ship.get_all"))

        bulk_item = m.BulkShipItem(
            bulk_ship=bulk_ship,
            group_id=item.group_id,
            product_id=wh_product.product_id,
            quantity=item.qty,
            store_id=item.store_id,
        )
        bulk_sh_items.append(bulk_item)
        db.session.add_all(bulk_sh_items)

    db.session.commit()

    for store_id in store_ids:
        ship_request = m.ShipRequest(
            status=s.ShipRequestStatus.waiting_for_warehouse,
            store=store,
            store_category=store.store_category,
            comment="",
            order_type="bulk_ship",
            user_id=current_user.id,
        )

        ship_request.save()
        ship_request.set_order_numb()
        db.session.commit()
        report_shipping = m.ReportShipping(
            type=s.ReportShipRequestActionType.CREATED.value,
            ship_request=ship_request,
            user=current_user,
        )

        db.session.add(report_shipping)

        for item in bulk_sh_items:
            if store_id != item.store_id:
                continue
            db.session.add(
                m.Cart(
                    product_id=item.product_id,
                    group_id=item.group_id,
                    quantity=item.quantity,
                    status=s.CartStatus.SUBMITTED.value,
                    ship_request_id=ship_request.id,
                )
            )
        db.session.commit()

    flash("Bulk ship created successfully", "success")

    return redirect(url_for("bulk_ship.get_all"))


@bulk_ship_bp.route("/<uuid>/edit", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_edit_modal(uuid: str):
    """htmx"""

    return render_template(
        "bulk_ship/modal_edit.html",
    )


@bulk_ship_bp.route("/<uuid>/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def edit(uuid: str):

    return redirect(url_for("bulk_ship.get_all"))
