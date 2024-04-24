from datetime import datetime
from flask import (
    Blueprint,
    request,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db


report_sku_blueprint = Blueprint("report_sku", __name__, url_prefix="/report_sku")


def get_sku_reports():
    filter_skus = s.FilterReportInventories.model_validate(dict(request.args))
    query = m.ReportSKU.select().order_by(m.ReportSKU.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportSKU)

    if filter_skus.q:
        query = query.where(
            m.ReportSKU.status.ilike(f"%{filter_skus.q}%")
            | m.ReportSKU.type.ilike(f"%{filter_skus.q}%")
            | m.ReportSKU.ship_request.has(
                m.ShipRequest.order_numb.ilike(f"%{filter_skus.q}%")
            )
            # | m.ReportSKU.user.has(m.User.username.ilike(f"%{filter_skus.q}%"))
            | m.ReportSKU.inbound_order.has(
                m.InboundOrder.order_id.ilike(f"%{filter_skus.q}%")
            )
            | m.ReportSKU.product.has(m.Product.name.ilike(f"%{filter_skus.q}%"))
            | m.ReportSKU.product.has(m.Product.SKU.ilike(f"%{filter_skus.q}%"))
        )

        count_query = count_query.where(
            m.ReportSKU.status.ilike(f"%{filter_skus.q}%")
            | m.ReportSKU.type.ilike(f"%{filter_skus.q}%")
            | m.ReportSKU.ship_request.has(
                m.ShipRequest.order_numb.ilike(f"%{filter_skus.q}%")
            )
            # | m.ReportSKU.user.has(m.User.username.ilike(f"%{filter_skus.q}%"))
            | m.ReportSKU.inbound_order.has(
                m.InboundOrder.order_id.ilike(f"%{filter_skus.q}%")
            )
            | m.ReportSKU.product.has(m.Product.name.ilike(f"%{filter_skus.q}%"))
            | m.ReportSKU.product.has(m.Product.SKU.ilike(f"%{filter_skus.q}%"))
        )

    if filter_skus.created_from:
        query = query.where(
            m.ReportSKU.created_at
            >= datetime.strptime(filter_skus.created_from, "%m/%d/%Y")
        )

    if filter_skus.created_to:
        query = query.where(
            m.ReportSKU.created_at
            <= datetime.strptime(filter_skus.created_to, "%m/%d/%Y")
        )

    if filter_skus.report_type:
        query = query.where(m.ReportSKU.type == filter_skus.report_type)

    if filter_skus.master_group:
        query = query.where(
            m.ReportSKU.warehouse_product.has(
                m.WarehouseProduct.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == filter_skus.master_group
                    )
                )
            )
        )

    if filter_skus.group:
        query = query.where(
            m.ReportSKU.warehouse_product.has(
                m.WarehouseProduct.group.has(m.Group.name == filter_skus.group)
            )
        )

    master_groups = [
        filter_skus.group_brand,
        filter_skus.group_language,
        filter_skus.group_categories,
        filter_skus.group_premises,
    ]

    if master_groups.count(None) != len(master_groups):
        for group in master_groups:
            if group:
                query = query.where(
                    m.ReportSKU.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(m.GroupProduct.name == group)
                        )
                    )
                )
                count_query = count_query.where(
                    m.ReportSKU.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(m.GroupProduct.name == group)
                        )
                    )
                )

    pagination = create_pagination(total=db.session.scalar(count_query))

    sku_reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, sku_reports


@report_sku_blueprint.route("/sku/api", methods=["GET"])
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
def get_skus_json():
    pagination, sku_reports = get_sku_reports()
    report_list_schema = s.ReportSKUList.model_validate(sku_reports)

    return s.ReportSKUResponse(
        pagination=pagination, report_sku_list=report_list_schema.root
    ).model_dump_json(by_alias=True)


@report_sku_blueprint.route("/sku", methods=["GET"])
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
def skus():
    users = db.session.scalars(sa.select(m.User))

    # TODO maybe move default master product groups to config
    product_master_groups = db.session.scalars(
        m.MasterGroupProduct.select()
        .where(
            m.MasterGroupProduct.name.in_(
                ["Brand", "Language", "Categories", "Premises"]
            )
        )
        .order_by(m.MasterGroupProduct.name.asc())
    )
    master_groups = db.session.scalars(
        sa.select(m.MasterGroup).order_by(m.MasterGroup.name.asc())
    )
    groups = db.session.scalars(sa.select(m.Group).order_by(m.Group.name.asc()))

    return render_template(
        "report/sku/skus.html",
        users=users,
        master_groups=master_groups,
        groups=groups,
        product_master_groups=product_master_groups,
        report_types_enum=s.ReportSKUType,
    )


@report_sku_blueprint.route("sku/search")
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
def search_sku_reports():
    pagination, sku_reports = get_sku_reports()

    return render_template(
        "report/sku/reports_table.html",
        page=pagination,
        sku_reports=sku_reports,
    )
