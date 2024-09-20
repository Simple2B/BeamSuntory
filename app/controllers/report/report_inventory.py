from datetime import datetime
from typing import Tuple, Type
import sqlalchemy as sa

from flask import render_template

from app import schema as s, models as m
from app.database import db
from app.controllers.pagination import create_pagination

from .report_data import ReportData


class ReportDataInventories(ReportData):
    type: s.ReportType = s.ReportType.INVENTORIES
    ResponseModel: Type[s.ReportInventoryListResponse] = s.ReportInventoryListResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.Product]], sa.Select[Tuple[int]]]:
        query = (
            sa.select(m.Product)
            .join(m.WarehouseProduct)
            .where(m.WarehouseProduct.product_quantity > 0)
            .distinct()
            .order_by(m.Product.id)
        )
        count_query = sa.select(sa.func.count()).select_from(m.Product)

        if report_filter.id:
            query = query.where(m.Product.id == report_filter.id)
            count_query = count_query.where(m.Product.id == report_filter.id)

        if report_filter.q:
            where_stmt = (
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
            query = query.where(where_stmt)

            count_query = count_query.where(where_stmt)

        if report_filter.user:
            user_groups_ids = db.session.scalars(
                sa.select(m.UserGroup.right_id)
                .join(m.User)
                .where(m.User.username == report_filter.user)
            ).all()

            query = query.where(m.WarehouseProduct.group_id.in_(user_groups_ids))
            count_query = count_query.where(
                m.WarehouseProduct.group_id.in_(user_groups_ids)
            )

        if report_filter.search_sku:
            where_stmt = m.Product.SKU.ilike(f"%{report_filter.search_sku}%")  # type: ignore

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            query = query.where(
                m.WarehouseProduct.created_at
                >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
            )
            count_query = count_query.where(
                m.WarehouseProduct.created_at
                >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
            )

        if report_filter.start_date_to:
            query = query.where(
                m.WarehouseProduct.created_at
                <= datetime.strptime(report_filter.start_date_to, "%m/%d/%Y")
            )
            count_query = count_query.where(
                m.WarehouseProduct.created_at
                <= datetime.strptime(report_filter.start_date_to, "%m/%d/%Y")
            )

        if report_filter.master_group and not report_filter.target_group:
            query = query.where(
                m.WarehouseProduct.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == report_filter.master_group
                    )
                )
            )
            count_query = count_query.where(
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
            count_query = count_query.where(
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
            "report/inventory/product_reports_table.html",
            page=pagination,
            report_filter=report_filter,
            inventory_reports=reports,
        )

    @classmethod
    def get_dataset(
        cls,
        report_filter: s.ReportFilter,
    ):
        query, _ = cls.get_search_result(report_filter)

        dataset = {
            "Name": [],
            "SKU": [],
            "Quantity": [],
            "Group": [],
            "Brand": [],
            "Warehouse": [],
        }  # type: dict[str, list]

        for product in db.session.scalars(query):
            add_dataset_row(
                dataset,
                product,
                master_group=report_filter.master_group,
                target_group=report_filter.target_group,
            )

        return dataset


def add_dataset_row(
    dataset: dict[str, list],
    product: m.Product,
    master_group: str | None,
    target_group: str | None,
):

    for warehouse_product in product.warehouse_products:
        if (
            master_group
            and not target_group
            and warehouse_product.group.master_group.name != master_group
        ):
            continue
        if target_group and warehouse_product.group.name != target_group:
            continue

        dataset["Name"].append(product.name)
        dataset["SKU"].append(product.SKU)
        dataset["Quantity"].append(warehouse_product.product_quantity)
        dataset["Group"].append(warehouse_product.group_name)
        dataset["Brand"].append(warehouse_product.product.brand)
        dataset["Warehouse"].append(warehouse_product.warehouse_name)

    return dataset
