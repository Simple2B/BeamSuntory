from datetime import datetime, timedelta
from typing import Type
import sqlalchemy as sa

from flask import render_template

from app import schema as s, models as m
from app.database import db
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataShelfLife(ReportData):
    type: s.ReportType = s.ReportType.SHELF_LIFE
    ResponseModel: Type[s.ReportShelfLifeResponse] = s.ReportShelfLifeResponse

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        # report_filter = s.FilterReportShelfLife.model_validate(dict(request.args))
        query = m.Product.select().order_by(m.Product.SKU.asc())

        count_query = sa.select(sa.func.count()).select_from(m.Product)

        if report_filter.q:
            query = query.where(m.Product.name.ilike(f"%{report_filter.q}%"))

            count_query = count_query.where(
                m.Product.name.ilike(f"%{report_filter.q}%")
            )

        if report_filter.search_sku:
            where_stmt = m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            query = query.where(
                m.Product.expiry_date
                >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
            )

        if report_filter.end_date:
            query = query.where(
                m.Product.expiry_date
                <= datetime.strptime(report_filter.end_date, "%m/%d/%Y")
            )

        if report_filter.expire_in and int(report_filter.expire_in) > 0:
            query = query.where(
                m.Product.expiry_date
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

            query = query.where(m.Product.id.in_(mg_product_ids))

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

            query = query.where(m.Product.id.in_(product_ids))

        master_groups = [
            report_filter.brand,
            report_filter.language,
            report_filter.categories,
            report_filter.premises,
        ]

        if master_groups.count(None) != len(master_groups):
            for group in master_groups:
                if group:
                    query = query.where(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(m.GroupProduct.name == group)
                        )
                    )
                    count_query = count_query.where(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(m.GroupProduct.name == group)
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


def create_shelf_life_dataset(product: m.Product):
    data = {
        "Name": [],
        "SKU": [],
        "Brand": [],
        "Number of days left": [],
        "Expiry Date": [],
        "Group": [],
        "Quantity": [],
        "Warehouse": [],
    }  # type: dict[str, list]

    for we_product in product.warehouse_products:
        data["Name"].append(product.name)
        data["SKU"].append(product.SKU)
        data["Brand"].append(product.brand)
        data["Number of days left"].append(product.numb_of_day_left)
        data["Expiry Date"].append(product.expiry_date.strftime("%m/%d/%Y"))
        data["Group"].append(we_product.group.name)
        data["Quantity"].append(we_product.product_quantity)
        data["Warehouse"].append(we_product.warehouse.name)

    return data
