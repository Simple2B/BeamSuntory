from datetime import datetime
from flask import (
    Blueprint,
    request,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import schema as s
from app import models as m, db


report_inventory_blueprint = Blueprint(
    "report_inventory", __name__, url_prefix="/report_inventory"
)


def get_inventory_reports():
    filter_inventories = s.FilterReportInventories.model_validate(dict(request.args))
    query = m.ReportInventory.select().order_by(m.ReportInventory.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportInventory)

    if filter_inventories.q:
        query = query.where(
            m.ReportInventory.ship_request.has(
                m.ShipRequest.order_numb.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventory.ship_request.has(
                m.ShipRequest.status.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventory.user.has(
                m.User.username.ilike(f"%{filter_inventories.q}%")
            )
        )

        count_query = count_query.where(
            m.ReportInventory.ship_request.has(
                m.ShipRequest.order_numb.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventory.ship_request.has(
                m.ShipRequest.status.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventory.user.has(
                m.User.username.ilike(f"%{filter_inventories.q}%")
            )
        )

    if filter_inventories.start_from:
        query = query.where(
            m.ReportInventory.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.inventory.has(
                        m.Inventory.date_from
                        >= datetime.strptime(filter_inventories.start_from, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_inventories.start_to:
        query = query.where(
            m.ReportInventory.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.inventory.has(
                        m.Inventory.date_from
                        <= datetime.strptime(filter_inventories.start_to, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_inventories.end_from:
        query = query.where(
            m.ReportInventory.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.inventory.has(
                        m.Inventory.date_from
                        >= datetime.strptime(filter_inventories.end_from, "%m/%d/%Y")
                    )
                )
            )
        )

    if filter_inventories.end_to:
        m.ReportInventory.ship_request.has(
            m.ShipRequest.carts.any(
                m.Cart.inventory.has(
                    m.Inventory.date_from
                    <= datetime.strptime(filter_inventories.end_to, "%m/%d/%Y")
                )
            )
        )

    if filter_inventories.username:
        query = query.where(
            m.ReportInventory.user.has(m.User.username == filter_inventories.username)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    inventory_reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, inventory_reports


@report_inventory_blueprint.route("/inventory/api", methods=["GET"])
@login_required
def get_inventories_json():
    pagination, inventory_reports = get_inventory_reports()
    report_list_schema = s.ReportInventoryList.model_validate(inventory_reports)

    return s.ReportInventoryResponse(
        pagination=pagination, inventory_reports=report_list_schema.root
    ).model_dump_json(by_alias=True)


@report_inventory_blueprint.route("/inventory", methods=["GET"])
@login_required
def inventories():
    users = db.session.scalars(sa.select(m.User))

    return render_template(
        "report/inventory/inventories.html",
        users=users,
    )


@report_inventory_blueprint.route("inventory/search")
@login_required
def search_inventory_reports():
    pagination, inventory_reports = get_inventory_reports()

    return render_template(
        "report/inventory/reports_table.html",
        page=pagination,
        inventory_reports=inventory_reports,
    )
