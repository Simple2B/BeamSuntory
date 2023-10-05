from datetime import datetime, timedelta
from typing import Type
import sqlalchemy as sa

from flask import render_template

from app import db, schema as s, models as m
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataShelfLife(ReportData):
    type: s.ReportType = s.ReportType.SHELF_LIFE
    ResponseModel: Type[s.ReportShelfLifeResponse] = s.ReportShelfLifeResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        # report_filter = s.FilterReportShelfLife.model_validate(dict(request.args))
        query = m.ProductAllocated.select().order_by(m.ProductAllocated.id)

        count_query = sa.select(sa.func.count()).select_from(m.ReportSKU)

        if report_filter.q:
            query = query.where(
                m.ProductAllocated.shelf_life_start.ilike(f"%{report_filter.q}%")
                | m.ProductAllocated.shelf_life_end.ilike(f"%{report_filter.q}%")
                # | m.ProductAllocated.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
                | m.ProductAllocated.product.has(
                    m.Product.name.ilike(f"%{report_filter.q}%")
                )
                | m.ProductAllocated.product.has(
                    m.Product.SKU.ilike(f"%{report_filter.q}%")
                )
            )

            count_query = count_query.where(
                m.ProductAllocated.shelf_life_start.ilike(f"%{report_filter.q}%")
                | m.ProductAllocated.shelf_life_end.ilike(f"%{report_filter.q}%")
                # | m.ProductAllocated.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
                | m.ProductAllocated.product.has(
                    m.Product.name.ilike(f"%{report_filter.q}%")
                )
                | m.ProductAllocated.product.has(
                    m.Product.SKU.ilike(f"%{report_filter.q}%")
                )
            )

        if report_filter.start_date:
            query = query.where(
                m.ProductAllocated.shelf_life_start
                >= datetime.strptime(report_filter.created_from, "%m/%d/%Y")
            )

        if report_filter.end_date:
            query = query.where(
                m.ProductAllocated.shelf_life_end
                <= datetime.strptime(report_filter.created_to, "%m/%d/%Y")
            )

        if report_filter.expire_in:
            query = query.where(
                m.ProductAllocated.shelf_life_end
                <= datetime.now() + timedelta(days=int(report_filter.expire_in))
            )

        if report_filter.master_group:
            mg_product_ids = db.session.scalars(
                m.WarehouseProduct.select()
                .with_only_columns(m.WarehouseProduct.product_id)
                .where(
                    m.WarehouseProduct.group.has(
                        m.Group.master_group.has(
                            m.MasterGroup.name == report_filter.master_group
                        )
                    )
                )
            ).all()

            query = query.where(m.ProductAllocated.product_id.in_(mg_product_ids))

        if report_filter.target_group:
            product_ids = db.session.scalars(
                m.WarehouseProduct.select()
                .with_only_columns(m.WarehouseProduct.product_id)
                .where(
                    m.WarehouseProduct.group.has(
                        m.Group.name == report_filter.target_group
                    )
                )
            ).all()

            query = query.where(m.ProductAllocated.product_id.in_(product_ids))

        master_groups = [
            report_filter.brand,
            report_filter.language,
            report_filter.category,
            report_filter.premises,
        ]

        if master_groups.count(None) != len(master_groups):
            for group in master_groups:
                if group:
                    query = query.where(
                        m.ProductAllocated.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
                    )
                    count_query = count_query.where(
                        m.ProductAllocated.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
                    )

        pagination = create_pagination(total=db.session.scalar(count_query))

        shelf_life_reports = db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        )
        return pagination, shelf_life_reports

    @classmethod
    def render(cls, pagination: sa.ScalarResult, reports: sa.ScalarResult) -> str:
        return render_template(
            "report/shelf_life/reports_table.html",
            page=pagination,
            shelf_life_reports=reports,
        )
