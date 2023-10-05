from typing import Type
from datetime import datetime
import sqlalchemy as sa

from flask import render_template

from app import db, schema as s, models as m
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataShipping(ReportData):
    type: s.ReportType = s.ReportType.SHIPPING
    ResponseModel: Type[s.ReportShippingResponse] = s.ReportShippingResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query = m.ReportShipping.select().order_by(m.ReportShipping.id)
        count_query = sa.select(sa.func.count()).select_from(m.ReportShipping)

        if report_filter.q:
            where_stmt = m.ReportShipping.ship_request.has(
                m.ShipRequest.store.has(
                    m.Store.store_name.ilike(f"%{report_filter.q}%")
                )
            ) | m.ReportShipping.user.has(m.User.username.ilike(f"%{report_filter.q}%"))

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.division:
            where_stmt = m.ReportShipping.user.has(
                m.User.role == report_filter.division,
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            where_stmt = m.ReportShipping.created_at >= datetime.strptime(
                report_filter.start_date, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date_to:
            where_stmt = m.ReportShipping.created_at <= datetime.strptime(
                report_filter.start_date_to, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.action_type_shipping:
            where_stmt = (
                m.ReportShipping.type == report_filter.action_type_shipping.value
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.target_group:
            where_stmt = m.ReportShipping.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.group.has((m.Group.name == report_filter.target_group))
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        for group_name in (
            report_filter.brand,
            report_filter.language,
            report_filter.category,
            report_filter.premises,
        ):
            if group_name:
                where_stmt = m.ReportShipping.ship_request.has(
                    m.ShipRequest.carts.any(
                        m.Cart.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(
                                    m.GroupProduct.name == group_name
                                )
                            )
                        )
                    )
                )
                query = query.where(where_stmt)
                count_query = count_query.where(where_stmt)

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
            "report/shipping/reports_table.html", page=pagination, reports=reports
        )
