from typing import Tuple, Type
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
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.ReportRequestShare]], sa.Select[Tuple[int]]]:
        query = sa.select(m.ReportRequestShare).order_by(m.ReportRequestShare.id)
        count_query = sa.select(sa.func.count()).select_from(m.ReportRequestShare)

        if report_filter.master_group and not report_filter.target_group:
            where_stmt = m.ReportRequestShare.request_share.has(
                m.RequestShare.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == report_filter.master_group
                    )
                )
            ) | m.ReportRequestShare.request_share.has(
                m.RequestShare.from_group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == report_filter.master_group
                    )
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.target_group:
            where_stmt = m.ReportRequestShare.request_share.has(
                m.RequestShare.group.has(m.Group.name == report_filter.target_group)
            ) | m.ReportRequestShare.request_share.has(
                m.RequestShare.from_group.has(
                    m.Group.name == report_filter.target_group
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.user:
            where_stmt = m.ReportRequestShare.user.has(
                m.User.username == report_filter.user
            )  # type: ignore
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
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            where_stmt = m.ReportRequestShare.created_at >= datetime.strptime(
                report_filter.start_date, "%m/%d/%Y"
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.end_date:
            where_stmt = m.ReportRequestShare.created_at <= datetime.strptime(
                report_filter.end_date, "%m/%d/%Y"
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.action_type_request_share:
            where_stmt = sa.and_(
                m.ReportRequestShare.type
                == report_filter.action_type_request_share.value
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.brand:
            where_stmt = m.ReportRequestShare.request_share.has(
                m.RequestShare.product.has(
                    m.Product.groups.any(m.GroupProduct.name == report_filter.brand)
                )
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        return query, count_query

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query, count_query = cls.get_search_result(report_filter)
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

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter) -> dict[str, list]:
        query, _ = cls.get_search_result(report_filter)

        reports = db.session.scalars(query)
        dataset = {
            "Name": [],
            "SKU": [],
            "Brand": [],
            "Quantity": [],
            "From": [],
            "To": [],
            "Status": [],
            "Created At": [],
            "Approved At": [],
            "User Approved": [],
            "Declined At": [],
            "User Declined": [],
        }  # type: dict[str, list]

        for request_share_report in reports:
            add_share_requests_dataset_row(dataset, request_share_report.request_share)

        return dataset


def add_share_requests_dataset_row(
    dataset: dict[str, list],
    request_share: m.RequestShare,
):
    dataset["Name"].append(request_share.product.name)
    dataset["SKU"].append(request_share.product.SKU)
    dataset["Brand"].append(request_share.product.brand)
    dataset["Quantity"].append(request_share.desire_quantity)
    dataset["From"].append(request_share.from_group.name)
    dataset["To"].append(request_share.group.name)
    dataset["Status"].append(request_share.status)
    dataset["Created At"].append(request_share.created_at.strftime("%m/%d/%Y %H:%M:%S"))

    approved_report = None
    declined_report = None
    for report in request_share.reports:
        if report.type == s.ReportRequestShareActionType.SHARED.value:
            approved_report = report
        if report.type == s.ReportRequestShareActionType.DECLINED.value:
            declined_report = report

    dataset["Approved At"].append(
        "-"
        if not approved_report
        else approved_report.created_at.strftime("%m/%d/%Y %H:%M:%S")
    )
    dataset["User Approved"].append(
        "-" if not approved_report else approved_report.user.username
    )
    dataset["Declined At"].append(
        "-"
        if not declined_report
        else declined_report.created_at.strftime("%m/%d/%Y %H:%M:%S")
    )
    dataset["User Declined"].append(
        "-" if not declined_report else declined_report.user.username
    )

    return dataset
