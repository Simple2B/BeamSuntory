from typing import Type
from datetime import datetime

import sqlalchemy as sa

from flask import render_template

from app import schema as s, models as m
from app.database import db
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataShareRequests(ReportData):
    type: s.ReportType = s.ReportType.REQUEST_SHARE
    ResponseModel: Type[s.ReportRequestShareResponse] = s.ReportRequestShareResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query = m.ReportRequestShare.select().order_by(m.ReportRequestShare.id)
        count_query = sa.select(sa.func.count()).select_from(m.ReportRequestShare)

        if report_filter.q:
            where_stmt = m.ReportRequestShare.request_share.has(
                m.RequestShare.product.has(m.Product.name.ilike(f"%{report_filter.q}%"))
            ) | m.ReportRequestShare.user.has(
                m.User.username.ilike(f"%{report_filter.q}%")
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.search_sku:
            where_stmt = m.ReportRequestShare.request_share.has(
                m.RequestShare.product.has(
                    m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            where_stmt = m.ReportRequestShare.created_at >= datetime.strptime(
                report_filter.start_date, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.end_date:
            where_stmt = m.ReportRequestShare.created_at <= datetime.strptime(
                report_filter.end_date, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.action_type_request_share:
            where_stmt = (
                m.ReportRequestShare.type
                == report_filter.action_type_request_share.value
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
            "report/request_share/reports_table.html",
            page=pagination,
            reports=reports,
        )
