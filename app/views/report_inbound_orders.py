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


report_inbound_orders_blueprint = Blueprint(
    "report_inbound_orders", __name__, url_prefix="/report_inbound_orders"
)


def get_inbound_order_report():
    filter_inbound_order = s.FilterReportInboundOrder.model_validate(dict(request.args))

    query = m.ReportInboundOrder.select().order_by(m.ReportInboundOrder.id)
    count_query = sa.select(sa.func.count()).select_from(m.ReportInboundOrder)

    if filter_inbound_order.q:
        query = query.where(
            m.ReportInboundOrder.inbound_order.has(
                m.InboundOrder.products_allocated.any(
                    m.ProductAllocated.product.has(
                        m.Product.name.ilike(f"%{filter_inbound_order.q}%")
                    )
                )
            )
            | m.ReportInboundOrder.inbound_order.has(
                m.InboundOrder.products_allocated.any(
                    m.ProductAllocated.product.has(
                        m.Product.SKU.ilike(f"%{filter_inbound_order.q}%")
                    )
                )
            )
            | m.ReportInboundOrder.user.has(
                m.User.username.ilike(f"%{filter_inbound_order.q}%")
            )
        )
        count_query = count_query.where(
            m.ReportInboundOrder.inbound_order.has(
                m.InboundOrder.products_allocated.any(
                    m.ProductAllocated.product.has(
                        m.Product.name.ilike(f"%{filter_inbound_order.q}%")
                    )
                )
            )
            | m.ReportInboundOrder.inbound_order.has(
                m.InboundOrder.products_allocated.any(
                    m.ProductAllocated.product.has(
                        m.Product.SKU.ilike(f"%{filter_inbound_order.q}%")
                    )
                )
            )
            | m.ReportInboundOrder.user.has(
                m.User.username.ilike(f"%{filter_inbound_order.q}%")
            )
        )

    master_groups = [
        filter_inbound_order.brand,
        filter_inbound_order.category,
        filter_inbound_order.premises,
    ]

    if master_groups.count(None) != len(master_groups):
        for group in master_groups:
            query = query.where(
                m.ReportInboundOrder.inbound_order.has(
                    m.InboundOrder.products_allocated.any(
                        m.ProductAllocated.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(
                                    m.GroupProduct.name.ilike(f"%{group}%")
                                )
                            )
                        )
                    )
                )
            )
            count_query = count_query.where(
                m.ReportInboundOrder.inbound_order.has(
                    m.InboundOrder.products_allocated.any(
                        m.ProductAllocated.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(
                                    m.GroupProduct.name.ilike(f"%{group}%")
                                )
                            )
                        )
                    )
                )
            )

    if filter_inbound_order.start_date:
        query = query.where(
            m.ReportInboundOrder.created_at >= filter_inbound_order.start_date
        )
        count_query = count_query.where(
            m.ReportInboundOrder.created_at >= filter_inbound_order.start_date
        )

    if filter_inbound_order.end_date:
        query = query.where(
            m.ReportInboundOrder.created_at <= filter_inbound_order.end_date
        )
        count_query = count_query.where(
            m.ReportInboundOrder.created_at <= filter_inbound_order.end_date
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_inbound_orders_blueprint.route("/inbound_orders")
@login_required
def inbound_orders():
    product_master_group_brand = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Brand")
        .order_by(m.MasterGroupProduct.id)
    ).all()

    product_master_group_category = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Category")
        .order_by(m.MasterGroupProduct.id)
    ).all()

    product_master_group_premises = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Premises")
        .order_by(m.MasterGroupProduct.id)
    ).all()

    return render_template(
        "report/inbound_order/inbound_orders.html",
        product_master_group_brand=product_master_group_brand,
        product_master_group_category=product_master_group_category,
        product_master_group_premises=product_master_group_premises,
    )


@report_inbound_orders_blueprint.route("inbound_orders/search")
@login_required
def search_report_inbound_orders():
    pagination, reports = get_inbound_order_report()

    return render_template(
        "report/inbound_order/reports_inbound_orders_table.html",
        page=pagination,
        reports=reports,
    )


@report_inbound_orders_blueprint.route("/inbound_orders/api", methods=["GET"])
@login_required
def get_inbound_orders_json():
    pagination, reports = get_inbound_order_report()
    report_list_schema = s.ReportInboundOrderList.model_validate(reports)

    return s.ReportInboundOrderResponse(
        pagination=pagination, report_inbound_orders=report_list_schema.root
    ).model_dump_json(by_alias=True)
