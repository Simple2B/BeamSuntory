from typing import Type
import sqlalchemy as sa

from flask import render_template

from app import db, schema as s, models as m
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataInboundOrders(ReportData):
    type: s.ReportType = s.ReportType.INBOUND_ORDER
    ResponseModel: Type[s.ReportInboundOrderResponse] = s.ReportInboundOrderResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query = m.ReportInboundOrder.select().order_by(sa.desc(m.ReportInboundOrder.id))
        count_query = sa.select(sa.func.count()).select_from(m.ReportInboundOrder)

        if report_filter.q:
            query = query.where(
                m.ReportInboundOrder.inbound_order.has(
                    m.InboundOrder.products_allocated.any(
                        m.ProductAllocated.product.has(
                            m.Product.name.ilike(f"%{report_filter.q}%")
                        )
                    )
                )
                | m.ReportInboundOrder.user.has(
                    m.User.username.ilike(f"%{report_filter.q}%")
                )
                | m.ReportInboundOrder.inbound_order.has(
                    m.InboundOrder.title.ilike(f"%{report_filter.q}%")
                )
            )
            count_query = count_query.where(
                m.ReportInboundOrder.inbound_order.has(
                    m.InboundOrder.products_allocated.any(
                        m.ProductAllocated.product.has(
                            m.Product.name.ilike(f"%{report_filter.q}%")
                        )
                    )
                )
                | m.ReportInboundOrder.user.has(
                    m.User.username.ilike(f"%{report_filter.q}%")
                )
                | m.ReportInboundOrder.inbound_order.has(
                    m.InboundOrder.title.ilike(f"%{report_filter.q}%")
                )
            )

        if report_filter.search_sku:
            where_stmt = m.ReportInboundOrder.inbound_order.has(
                m.InboundOrder.products_allocated.any(
                    m.ProductAllocated.product.has(
                        m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
                    )
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        master_groups = [
            report_filter.brand,
            report_filter.category,
            report_filter.premises,
        ]

        if master_groups.count(None) != len(master_groups):
            for group in master_groups:
                if not group:
                    continue
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

        if report_filter.start_date:
            query = query.where(
                m.ReportInboundOrder.created_at >= report_filter.start_date
            )
            count_query = count_query.where(
                m.ReportInboundOrder.created_at >= report_filter.start_date
            )

        if report_filter.end_date:
            query = query.where(
                m.ReportInboundOrder.created_at <= report_filter.end_date
            )
            count_query = count_query.where(
                m.ReportInboundOrder.created_at <= report_filter.end_date
            )

        pagination = create_pagination(total=db.session.scalar(count_query))

        reports = db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        )
        return pagination, reports

    @classmethod
    def render(cls, pagination: sa.ScalarResult, reports: sa.ScalarResult) -> str:
        return render_template(
            "report/inbound_order/reports_inbound_orders_table.html",
            page=pagination,
            reports=reports,
        )
