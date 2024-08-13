from datetime import datetime
from flask import (
    Blueprint,
    request,
    render_template,
    send_file,
    flash,
    redirect,
    url_for,
)
import pandas as pd
import io
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app.controllers.report import create_inventory_dataset
from app.logger import log

report_inventory_blueprint = Blueprint(
    "report_inventory", __name__, url_prefix="/report_inventory"
)


def get_inventory_reports():
    filter_inventories = s.FilterReportInventories.model_validate(dict(request.args))
    query = m.ReportInventoryList.select().order_by(m.ReportInventoryList.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportInventoryList)

    if filter_inventories.q:
        query = query.where(
            m.ReportInventoryList.ship_request.has(
                m.ShipRequest.order_numb.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventoryList.user.has(
                m.User.username.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventoryList.inbound_order.has(
                m.InboundOrder.order_id.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventoryList.report_inventories.any(
                m.ReportInventory.product.has(
                    m.Product.name.ilike(f"%{filter_inventories.q}%")
                )
            )
            | m.ReportInventoryList.report_inventories.any(
                m.ReportInventory.product.has(
                    m.Product.SKU.ilike(f"%{filter_inventories.q}%")
                )
            )
        )

        count_query = count_query.where(
            m.ReportInventoryList.ship_request.has(
                m.ShipRequest.order_numb.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventoryList.user.has(
                m.User.username.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventoryList.inbound_order.has(
                m.InboundOrder.order_id.ilike(f"%{filter_inventories.q}%")
            )
            | m.ReportInventoryList.report_inventories.any(
                m.ReportInventory.product.has(
                    m.Product.name.ilike(f"%{filter_inventories.q}%")
                )
            )
            | m.ReportInventoryList.report_inventories.any(
                m.ReportInventory.product.has(
                    m.Product.SKU.ilike(f"%{filter_inventories.q}%")
                )
            )
        )

    if filter_inventories.created_from:
        query = query.where(
            m.ReportInventoryList.created_at
            >= datetime.strptime(filter_inventories.created_from, "%m/%d/%Y")
        )

    if filter_inventories.created_to:
        query = query.where(
            m.ReportInventoryList.created_at
            <= datetime.strptime(filter_inventories.created_to, "%m/%d/%Y")
        )

    if filter_inventories.username:
        query = query.where(
            m.ReportInventoryList.user.has(
                m.User.username == filter_inventories.username
            )
        )

    if filter_inventories.master_group:
        query = query.where(
            m.ReportInventoryList.report_inventories.any(
                m.ReportInventory.warehouse_product.has(
                    m.WarehouseProduct.group.has(
                        m.Group.master_group.has(
                            m.MasterGroup.name == filter_inventories.master_group
                        )
                    )
                )
            )
        )

    if filter_inventories.group:
        query = query.where(
            m.ReportInventoryList.report_inventories.any(
                m.ReportInventory.warehouse_product.has(
                    m.WarehouseProduct.group.has(
                        m.Group.name == filter_inventories.group
                    )
                )
            )
        )

    master_groups = [
        filter_inventories.group_brand,
        filter_inventories.group_language,
        filter_inventories.group_categories,
        filter_inventories.group_premises,
        filter_inventories.group_event,
    ]

    if master_groups.count(None) != len(master_groups):
        for group in master_groups:
            # TODO consider better validation for master_groups values
            if group:
                query = query.where(
                    m.ReportInventoryList.report_inventories.any(
                        m.ReportInventory.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
                    )
                )
                count_query = count_query.where(
                    m.ReportInventoryList.report_inventories.any(
                        m.ReportInventory.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
                    )
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
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def get_inventories_json():
    pagination, inventory_reports = get_inventory_reports()
    report_list_schema = s.ReportInventoryListArray.model_validate(inventory_reports)

    return s.ReportInventoryListResponse(
        pagination=pagination, report_inventory_list=report_list_schema.root
    ).model_dump_json(by_alias=True)


@report_inventory_blueprint.route("/inventory", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def inventories():
    users = db.session.scalars(sa.select(m.User))

    # TODO maybe move default master product groups to config
    product_master_groups = db.session.scalars(
        m.MasterGroupProduct.select()
        .where(
            m.MasterGroupProduct.name.in_(
                ["Brand", "Language", "Categories", "Premises", "Events"]
            )
        )
        .order_by(m.MasterGroupProduct.name.asc())
    )
    master_groups = db.session.scalars(
        sa.select(m.MasterGroup).group_by(m.MasterGroup.name.asc())
    )
    groups = db.session.scalars(sa.select(m.Group).group_by(m.Group.name.asc()))

    return render_template(
        "report/inventory/inventories.html",
        users=users,
        master_groups=master_groups,
        groups=groups,
        product_master_groups=product_master_groups,
    )


@report_inventory_blueprint.route("inventory/search")
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def search_inventory_reports():
    pagination, inventory_reports = get_inventory_reports()

    return render_template(
        "report/inventory/reports_table.html",
        page=pagination,
        inventory_reports=inventory_reports,
    )


@report_inventory_blueprint.route("inventory/<int:product_id>/download-csv")
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def download_csv(product_id: int):
    # Create a DataFrame with sample data
    product = db.session.get(m.Product, product_id)
    group = request.args.get("target_group", default="", type=str)
    if not product:
        flash("Report not found", "danger")
        return redirect(url_for("report.index"))

    data = create_inventory_dataset(product, group)
    df = pd.DataFrame(data)

    # Save the DataFrame to a CSV file in memory
    csv_buffer = io.StringIO()
    df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)

    # Send the CSV file as a response
    return send_file(
        io.BytesIO(csv_buffer.getvalue().encode("utf-8")),
        mimetype="text/csv",
        as_attachment=True,
        download_name="report.csv",
    )


@report_inventory_blueprint.route("inventory/<int:product_id>/detail_modal")
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def detail_modal(product_id: int):
    # Create a DataFrame with sample data
    product = db.session.get(m.Product, product_id)
    target_group = request.args.get("target_group", default="", type=str)
    if not product:
        log(log.ERROR, "Report not found")
        return render_template(
            "toast.html", message="Report not found", category="danger"
        )
    data = create_inventory_dataset(product, target_group)

    return render_template(
        "report/inventory/detail_modal.html",
        data=data,
        report=product,
        target_group=target_group,
    )
