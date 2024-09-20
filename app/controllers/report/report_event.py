from typing import Tuple, Type
from datetime import datetime
import sqlalchemy as sa

from flask import render_template

from app import schema as s, models as m
from app.database import db
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataEvents(ReportData):
    type: s.ReportType = s.ReportType.EVENTS
    ResponseModel: Type[s.ReportEventResponse] = s.ReportEventResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.Event]], sa.Select[Tuple[int]]]:
        query = sa.select(m.Event).order_by(m.Event.id)
        count_query = sa.select(sa.func.count()).select_from(m.Event)

        if report_filter.q:
            where_stmt = sa.or_(
                m.Event.product.has(m.Product.name.ilike(f"%{report_filter.q}%"))
                | m.Event.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
            )
            query = query.where(where_stmt)

            count_query = count_query.where(where_stmt)

        if report_filter.search_sku:
            where_stmt = m.Event.product.has(
                m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            where_stmt = sa.and_(
                m.Event.date_from
                >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date_to:
            where_stmt = sa.and_(
                m.Event.date_from
                <= datetime.strptime(report_filter.start_date_to, "%m/%d/%Y")
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.end_date:
            where_stmt = sa.and_(
                m.Event.date_from
                <= datetime.strptime(report_filter.end_date, "%m/%d/%Y")
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.end_date_to:
            where_stmt = sa.and_(
                m.Event.date_from
                <= datetime.strptime(report_filter.end_date_to, "%m/%d/%Y")
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.user:
            where_stmt = m.Event.user.has(m.User.username == report_filter.user)
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.brand:
            where_stmt = m.Event.product.has(
                m.Product.groups.any(m.GroupProduct.name == report_filter.brand)
            )
            query = query.where()
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
            "report/event/reports_table.html", page=pagination, reports=reports
        )

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter):
        # ['SKU,Name,Quantity,Group,User,Store,Date delivered,Date picked up,Order №'];
        query, _ = cls.get_search_result(report_filter)
        dataset = {
            "SKU": [],
            "Name": [],
            "Brand": [],
            "Quantity": [],
            "Group": [],
            "User": [],
            "Store": [],
            "Date_delivered": [],
            "Date_picked_up": [],
            "Order №": [],
        }  # type: dict[str, list]

        for event in db.session.scalars(query):
            dataset["SKU"].append(event.cart.product.SKU)
            dataset["Name"].append(event.cart.product.name)
            dataset["Brand"].append(event.cart.product.brand)
            dataset["Quantity"].append(event.cart.quantity)
            dataset["Group"].append(event.group.name)
            dataset["User"].append(event.user.username)
            dataset["Store"].append(event.ship_request.store.store_name)
            dataset["Date_delivered"].append(event.ship_request.date_delivered)
            dataset["Date_picked_up"].append(event.ship_request.date_picked_up)
            dataset["Order №"].append(event.ship_request.order_numb)

        return dataset
