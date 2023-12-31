from datetime import datetime
from typing import Type
import sqlalchemy as sa

from flask import render_template

from app import db, schema as s, models as m
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataInventories(ReportData):
    type: s.ReportType = s.ReportType.INVENTORIES
    ResponseModel: Type[s.ReportInventoryListResponse] = s.ReportInventoryListResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query = m.WarehouseProduct.select().order_by(m.WarehouseProduct.id)
        count_query = sa.select(sa.func.count()).select_from(m.WarehouseProduct)

        if report_filter.q:
            query = query.where(
                m.WarehouseProduct.group.has(m.Group.name.ilike(f"%{report_filter.q}%"))
                | m.WarehouseProduct.product.has(
                    m.Product.SKU.ilike(f"%{report_filter.q}%")
                )
                | m.WarehouseProduct.warehouse.has(
                    m.Warehouse.name.ilike(f"%{report_filter.q}%")
                )
                | m.WarehouseProduct.product.has(
                    m.Product.name.ilike(f"%{report_filter.q}%")
                )
            )

            count_query = count_query.where(
                m.WarehouseProduct.group.has(m.Group.name.ilike(f"%{report_filter.q}%"))
                | m.WarehouseProduct.product.has(
                    m.Product.SKU.ilike(f"%{report_filter.q}%")
                )
                | m.WarehouseProduct.warehouse.has(
                    m.Warehouse.name.ilike(f"%{report_filter.q}%")
                )
                | m.WarehouseProduct.product.has(
                    m.Product.name.ilike(f"%{report_filter.q}%")
                )
            )

        if report_filter.search_sku:
            where_stmt = m.WarehouseProduct.product.has(
                m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            query = query.where(
                m.WarehouseProduct.created_at
                >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
            )

        if report_filter.start_date_to:
            query = query.where(
                m.WarehouseProduct.created_at
                <= datetime.strptime(report_filter.start_date_to, "%m/%d/%Y")
            )

        if report_filter.master_group:
            query = query.where(
                m.WarehouseProduct.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == report_filter.master_group
                    )
                )
            )

        if report_filter.target_group:
            query = query.where(
                m.WarehouseProduct.group.has(m.Group.name == report_filter.target_group)
            )

        master_groups = (
            report_filter.brand,
            report_filter.language,
            report_filter.categories,
            report_filter.premises,
            report_filter.events,
        )

        if master_groups.count(None) != len(master_groups):
            for group in master_groups:
                # TODO consider better validation for master_groups values
                if group:
                    query = query.where(
                        m.WarehouseProduct.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
                    )
                    count_query = count_query.where(
                        m.WarehouseProduct.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
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
            "report/inventory/reports_table.html",
            page=pagination,
            inventory_reports=reports,
        )
