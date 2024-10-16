from datetime import datetime, timedelta
from typing import Tuple, Type
import sqlalchemy as sa

from flask import render_template

from app import schema as s, models as m
from app.database import db
from app.controllers.pagination import create_pagination

from .report_data import (
    ReportData,
    add_product_groups,
    add_product_exta_fields,
    order_fields_dataset,
)


class ReportDataShelfLife(ReportData):
    type: s.ReportType = s.ReportType.SHELF_LIFE
    ResponseModel: Type[s.ReportShelfLifeResponse] = s.ReportShelfLifeResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.ProductAllocated]], sa.Select[Tuple[int]]]:
        query = (
            sa.select(m.ProductAllocated)
            .where(
                m.ProductAllocated.shelf_life_end != sa.func.DATE("5000-01-01"),
                m.ProductAllocated.quantity_remains.is_not(None),
            )
            .order_by(m.ProductAllocated.shelf_life_end.desc())
        )

        count_query = (
            sa.select(sa.func.count())
            .where(
                m.ProductAllocated.shelf_life_end != sa.func.DATE("5000-01-01"),
                m.ProductAllocated.quantity_remains.is_not(None),
            )
            .select_from(m.ProductAllocated)
        )

        if report_filter.q:
            where_stmt = m.ProductAllocated.product.has(
                m.Product.name.ilike(f"%{report_filter.q}%")
            )

            query = query.where(where_stmt)

            count_query = count_query.where(where_stmt)

        if report_filter.search_sku:
            where_stmt = m.ProductAllocated.product.has(
                m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            where_stmt = m.ProductAllocated.shelf_life_start >= datetime.strptime(
                report_filter.start_date, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query

        if report_filter.end_date:
            where_stmt = m.ProductAllocated.shelf_life_end <= datetime.strptime(
                report_filter.end_date, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.expire_in and int(report_filter.expire_in) > 0:
            where_stmt = (
                m.ProductAllocated.shelf_life_end
                <= datetime.now() + timedelta(days=int(report_filter.expire_in))
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.master_group and not report_filter.target_group:
            where_stmt = m.ProductAllocated.product_quantity_groups.any(
                m.ProductQuantityGroup.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == report_filter.master_group
                    )
                )
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.target_group:
            where_stmt = m.ProductAllocated.product_quantity_groups.any(
                m.ProductQuantityGroup.group.has(
                    m.Group.name == report_filter.target_group
                )
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        master_groups = [
            report_filter.brand,
            report_filter.language,
            report_filter.categories,
            report_filter.premises,
        ]

        for group in master_groups:
            if not group:
                continue
            where_stmt = m.ProductAllocated.product.has(
                m.Product.groups.any(m.GroupProduct.name == group)
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        return query, count_query

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query, count_query = cls.get_search_result(report_filter)

        pagination = create_pagination(total=db.session.scalar(count_query))

        shelf_life_reports = db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        )
        return pagination, shelf_life_reports

    @classmethod
    def render(cls, pagination: sa.ScalarResult, reports: sa.ScalarResult, _) -> str:
        return render_template(
            "report/shelf_life/reports_table.html",
            page=pagination,
            shelf_life_reports=reports,
        )

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter) -> dict[str, list]:
        query, _ = cls.get_search_result(report_filter)
        master_groups = cls.get_product_master_groups()
        dataset = {
            "SKU": [],
            "Description": [],
            "Units of Measure": [],
            "Number of days left": [],
            "Quantity received": [],
            "Remaining quantity": [],
            "Date Expires": [],
            "Data Created": [],
            "Last transaction data": [],
        }  # type: dict[str, list]

        for product_allc in db.session.scalars(query):
            dataset["Units of Measure"].append(product_allc.product.name)
            dataset["Description"].append(product_allc.product.description)
            dataset["SKU"].append(product_allc.product.SKU)
            dataset["Number of days left"].append(product_allc.numb_of_day_left)
            dataset["Quantity received"].append(product_allc.quantity_received)
            dataset["Remaining quantity"].append(product_allc.quantity_remains)
            dataset["Date Expires"].append(
                product_allc.shelf_life_end.strftime("%m/%d/%Y")
            )
            dataset["Data Created"].append(
                product_allc.shelf_life_start.strftime("%m/%d/%Y")
            )
            dataset["Last transaction data"].append(
                product_allc.product.last_transaction_data
            )
            cls.add_product_groups(dataset, product_allc.product, master_groups)

        return order_fields_dataset(dataset)


def create_shelf_life_dataset(
    product_allocated: m.ProductAllocated, download: bool = False
) -> dict[str, list]:
    master_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).where(
            m.MasterGroupProduct.name != s.Events.name.value
        )
    ).all()
    data = {
        "Units of Measure": [],
        "SKU": [],
        "Brand": [],
        "Description": [],
        "Group": [],
        "Quantity received": [],
        "Last transaction data": [],
    }  # type: dict[str, list]

    for qty_group in product_allocated.product_quantity_groups:
        data["Units of Measure"].append(product_allocated.product.name)
        data["SKU"].append(product_allocated.product.SKU)
        data["Description"].append(product_allocated.product.description)
        data["Group"].append(qty_group.group.name)
        data["Quantity received"].append(qty_group.quantity_received)
        data["Last transaction data"].append(
            product_allocated.product.last_transaction_data
        )
        if download:
            add_product_groups(data, product_allocated.product, master_groups)
            add_product_exta_fields(data, product_allocated.product)
        else:
            data["Brand"].append(product_allocated.product.brand)

    return data
