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

        if report_filter.user:
            where_stmt = m.ReportRequestShare.user.has(
                m.User.username == report_filter.user
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

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
    def render(cls, pagination: sa.ScalarResult, reports: sa.ScalarResult, _) -> str:
        return render_template(
            "report/request_share/reports_table.html",
            page=pagination,
            reports=reports,
        )


def create_share_requests_dataset(
    request_share: m.RequestShare,
):
    data = dict()  # type: dict[str, list]
    data["Name"] = [request_share.product.name]
    data["SKU"] = [request_share.product.SKU]
    data["Quantity"] = [request_share.desire_quantity]
    data["From"] = [request_share.from_group.name]
    data["To"] = [request_share.group.name]
    data["Status"] = [request_share.status]
    data["Created At"] = [request_share.created_at.strftime("%m/%d/%Y %H:%M:%S")]

    for report in request_share.reports:
        if report.type == s.ReportRequestShareActionType.SHARED.value:
            data["Approved At"] = [report.created_at.strftime("%m/%d/%Y %H:%M:%S")]
            data["User Approved"] = [report.user.username]
        if report.type == s.ReportRequestShareActionType.DECLINED.value:
            data["Declined At"] = [report.created_at.strftime("%m/%d/%Y %H:%M:%S")]
            data["User Declined"] = [report.user.username]

    return data
