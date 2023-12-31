from typing import Type
from datetime import datetime
import sqlalchemy as sa

from flask import render_template

from app import db, schema as s, models as m
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataEvents(ReportData):
    type: s.ReportType = s.ReportType.EVENTS
    ResponseModel: Type[s.ReportEventResponse] = s.ReportEventResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query = m.ReportEvent.select().order_by(m.ReportEvent.id)
        count_query = sa.select(sa.func.count()).select_from(m.ReportEvent)

        if report_filter.q:
            query = query.where(
                m.ReportEvent.ship_request.has(
                    m.ShipRequest.carts.any(
                        m.Cart.event.has(
                            m.Event.product.has(
                                m.Product.name.ilike(f"%{report_filter.q}%")
                            )
                        )
                    )
                )
                | m.ReportEvent.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
            )

            count_query = count_query.where(
                m.ReportEvent.ship_request.has(
                    m.ShipRequest.carts.any(
                        m.Cart.event.has(
                            m.Event.product.has(
                                m.Product.name.ilike(f"%{report_filter.q}%")
                            )
                        )
                    )
                )
            )

        if report_filter.search_sku:
            where_stmt = m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(
                            m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
                        )
                    )
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            query = query.where(
                m.ReportEvent.ship_request.has(
                    m.ShipRequest.carts.any(
                        m.Cart.event.has(
                            m.Event.date_from
                            >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
                        )
                    )
                )
            )

        if report_filter.start_date_to:
            query = query.where(
                m.ReportEvent.ship_request.has(
                    m.ShipRequest.carts.any(
                        m.Cart.event.has(
                            m.Event.date_from
                            <= datetime.strptime(
                                report_filter.start_date_to, "%m/%d/%Y"
                            )
                        )
                    )
                )
            )

        if report_filter.end_date:
            query = query.where(
                m.ReportEvent.ship_request.has(
                    m.ShipRequest.carts.any(
                        m.Cart.event.has(
                            m.Event.date_from
                            >= datetime.strptime(report_filter.end_date, "%m/%d/%Y")
                        )
                    )
                )
            )

        if report_filter.end_date_to:
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.date_from
                        <= datetime.strptime(report_filter.end_date_to, "%m/%d/%Y")
                    )
                )
            )

        if report_filter.user:
            query = query.where(
                m.ReportEvent.user.has(m.User.username == report_filter.user)
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
            "report/event/reports_table.html", page=pagination, reports=reports
        )
