from datetime import datetime
from typing import Tuple, Type

import sqlalchemy as sa
from flask import render_template

from app import models as m
from app import schema as s
from app.controllers.pagination import create_pagination
from app.database import db

from .report_data import ReportData


class ReportDataBillable(ReportData):
    type: s.ReportType = s.ReportType.BILLABLE
    ResponseModel: Type[s.ReportBillableResponse] = s.ReportBillableResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.ShipRequest]], sa.Select[Tuple[int]]]:
        query = sa.select(m.BillableGroup).order_by(m.BillableGroup.created_at.desc())
        count_query = sa.select(sa.func.count()).select_from(m.BillableGroup)

        if report_filter.q:
            where_stmt = m.BillableGroup.name.ilike(
                f"%{report_filter.q}%"
            ) | m.BillableGroup.master_billable_group.has(
                m.MasterBillableGroup.name.ilike(f"%{report_filter.q}%")
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            where_stmt = m.BillableGroup.created_at >= datetime.strptime(
                report_filter.start_date, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date_to:
            where_stmt = m.BillableGroup.created_at <= datetime.strptime(
                report_filter.start_date_to, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.master_group:
            where_stmt = m.BillableGroup.master_billable_group.has(
                m.MasterBillableGroup.name == report_filter.master_group
            )

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
    def render(
        cls,
        pagination: sa.ScalarResult,
        reports: sa.ScalarResult,
        report_filter: s.ReportFilter,
    ) -> str:
        return render_template(
            "report/billable/reports_table.html",
            page=pagination,
            reports=reports,
            report_filter=report_filter,
        )

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter) -> dict[str, list]:
        query, _ = cls.get_search_result(report_filter)
        dataset = {
            "№": [],
            "Master billable group": [],
            "Billable group": [],
            "Created At": [],
            "Rate": [],
            "Assigned to inbound": [],
            "Assigned to outbound": [],
        }  # type: dict[str, list]

        for report in db.session.scalars(query):
            dataset = add_dataset_row(dataset, report)
        return dataset


def add_dataset_row(dataset: dict[str, list], report: m.BillableGroup):
    dataset["№"].append(report.id)
    dataset["Master billable group"].append(report.master_billable_group_name)
    dataset["Billable group"].append(report.name)
    dataset["Created At"].append(report.created_at.strftime("%m/%d/%Y %H:%M:%S"))
    dataset["Rate"].append(report.rate)
    dataset["Assigned to inbound"].append(report.assigned_to_inbound)
    dataset["Assigned to outbound"].append(report.assigned_to_outbound)

    return dataset


def create_billable_modal_dataset(
    report: m.BillableGroup,
    download: bool = False,
) -> dict[str, list]:

    dataset = {
        "№": report.id,
        "Master billable group": report.master_billable_group_name,
        "Billable group": report.name,
        "Created at": report.created_at.strftime("%m/%d/%Y %H:%M:%S"),
        "Rate": report.rate,
        "Assigned to inbound": report.assigned_to_inbound,
        "Assigned to outbound": report.assigned_to_outbound,
    }  # type: dict[str, list]

    return dataset
