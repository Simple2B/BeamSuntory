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
    bult_ships = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )

    return render_template(
        "bulk_ship/bulk_ships.html",
        bult_ships=bult_ships,
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


@bulk_ship_bp.route("/get-groups", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_groups():
    """htmx"""
    master_group_id = request.args.get("master_group_id", default=None, type=int)
    group_id = request.args.get("group_id", default=None, type=int)

    groups = []

    if master_group_id:
        groups = db.session.scalars(
            sa.select(m.Group).where(m.Group.master_group_id == master_group_id)
        ).all()

    if group_id:
        groups = db.session.scalars(
            sa.select(m.Group).where(m.Group.parent_group_id == group_id)
        ).all()
        return render_template("bulk_ship/sub_group_select.html", groups=groups)

    return render_template("bulk_ship/group_select.html", groups=groups)


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
