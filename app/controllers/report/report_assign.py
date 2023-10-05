from typing import Type
import sqlalchemy as sa

from flask import render_template

from app import db, schema as s, models as m
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataAssigns(ReportData):
    type: s.ReportType = s.ReportType.ASSIGN
    ResponseModel: Type[s.ReportAssignsResponse] = s.ReportAssignsResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query = m.Assign.select().order_by(sa.desc(m.Assign.id))
        count_query = sa.select(sa.func.count()).select_from(m.Assign)

        if report_filter.q:
            query = query.where(
                m.Assign.product.has(m.Product.name.ilike(f"%{report_filter.q}%"))
                | m.Assign.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
            )
            count_query = count_query.where(
                m.Assign.product.has(m.Product.name.ilike(f"%{report_filter.q}%"))
                | m.Assign.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
            )
            count_query = count_query.where(
                m.Assign.product.has(m.Product.name.ilike(f"%{report_filter.q}%"))
                | m.Assign.product.has(m.Product.SKU.ilike(f"%{report_filter.q}%"))
                | m.Assign.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
            )

        if report_filter.search_sku:
            where_stmt = m.Assign.product.has(
                m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.user:
            query = query.where(
                m.Assign.user.has(m.User.username == report_filter.user)
            )
            count_query = count_query.where(
                m.Assign.user.has(m.User.username == report_filter.user)
            )

        master_groups = [
            report_filter.brand,
            report_filter.category,
            report_filter.language,
            report_filter.premises,
        ]

        if master_groups.count(None) != len(master_groups):
            for group in master_groups:
                query = query.where(
                    m.Assign.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(
                                m.GroupProduct.name.ilike(f"%{group}%")
                            )
                        )
                    )
                )
                count_query = count_query.where(
                    m.Assign.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(
                                m.GroupProduct.name.ilike(f"%{group}%")
                            )
                        )
                    )
                )

        if report_filter.start_date:
            query = query.where(m.Assign.created_at >= report_filter.start_date)
            count_query = count_query.where(
                m.Assign.created_at >= report_filter.start_date
            )

        if report_filter.end_date:
            query = query.where(m.Assign.created_at <= report_filter.end_date)
            count_query = count_query.where(
                m.Assign.created_at <= report_filter.end_date
            )

        if report_filter.group_from:
            query = query.where(
                m.Assign.from_group.has(m.Group.name == report_filter.group_from)
            )

            count_query = count_query.where(
                m.Assign.from_group.has(m.Group.name == report_filter.group_from)
            )

        if report_filter.group_to:
            query = query.where(
                m.Assign.group.has(m.Group.name.ilike(f"%{report_filter.group_to}%"))
            )
            count_query = count_query.where(
                m.Assign.group.has(m.Group.name.ilike(f"%{report_filter.group_to}%"))
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
            "report/assign/reports_assign_table.html", page=pagination, reports=reports
        )
