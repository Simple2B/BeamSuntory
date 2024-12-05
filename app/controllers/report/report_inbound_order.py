from typing import Tuple, Type
import sqlalchemy as sa

from flask import render_template

from app import schema as s, models as m
from app.database import db
from app.controllers.pagination import create_pagination

from .report_data import (
    ReportData,
    add_product_groups,
    order_fields_dataset,
    add_product_exta_fields,
)


class ReportDataInboundOrders(ReportData):
    type: s.ReportType = s.ReportType.INBOUND_ORDER
    ResponseModel: Type[s.ReportInboundOrderResponse] = s.ReportInboundOrderResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.InboundOrder]], sa.Select[Tuple[int]]]:
        query = (
            sa.select(m.InboundOrder)
            .where(m.InboundOrder.status == s.InboundOrderStatus.delivered)
            .order_by(m.InboundOrder.created_at.desc())
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.InboundOrder.status == s.InboundOrderStatus.delivered)
            .select_from(m.InboundOrder)
        )

        if report_filter.q:
            where_stmt = sa.or_(
                m.InboundOrder.products_allocated.any(
                    m.ProductAllocated.product.has(
                        m.Product.name.ilike(f"%{report_filter.q}%")
                    )
                ),
                m.InboundOrder.title.ilike(f"%{report_filter.q}%"),
                m.InboundOrder.order_id.ilike(f"%{report_filter.q}%"),
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.search_sku:
            where_stmt = m.InboundOrder.products_allocated.any(
                m.ProductAllocated.product.has(
                    m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        master_groups = [
            report_filter.brand,
            report_filter.categories,
            report_filter.premises,
        ]

        if master_groups.count(None) != len(master_groups):
            for group in master_groups:
                if not group:
                    continue
                where_stmt = m.InboundOrder.products_allocated.any(
                    m.ProductAllocated.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(
                                m.GroupProduct.name.ilike(f"%{group}%")
                            )
                        )
                    )
                )
                query = query.where(where_stmt)

                count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            query = query.where(m.InboundOrder.created_at >= report_filter.start_date)
            count_query = count_query.where(
                m.InboundOrder.created_at >= report_filter.start_date
            )

        if report_filter.end_date:
            query = query.where(m.InboundOrder.created_at <= report_filter.end_date)
            count_query = count_query.where(
                m.InboundOrder.created_at <= report_filter.end_date
            )
        if report_filter.master_group and not report_filter.target_group:
            where_stmt = m.InboundOrder.products_allocated.any(
                m.ProductAllocated.product_quantity_groups.any(
                    m.ProductQuantityGroup.group.has(
                        m.Group.master_group.has(
                            m.MasterGroup.name == report_filter.master_group
                        )
                    )
                )
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.target_group:
            where_stmt = m.InboundOrder.products_allocated.any(
                m.ProductAllocated.product_quantity_groups.any(
                    m.ProductQuantityGroup.group.has(
                        m.Group.name == report_filter.target_group
                    )
                )
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.brand:
            where_stmt = m.InboundOrder.products_allocated.any(
                m.ProductAllocated.product.has(
                    m.Product.groups.any(m.GroupProduct.name == report_filter.brand)
                )
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
            "report/inbound_order/reports_inbound_orders_table.html",
            page=pagination,
            reports=reports,
            report_filter=report_filter,
        )

    @classmethod
    def get_dataset(
        cls,
        report_filter: s.ReportFilter,
    ):
        query, _ = cls.get_search_result(report_filter)

        dataset = {
            "Order №": [],
            "Created At": [],
            "Arrived": [],
            "Warehouse": [],
            "Supplier": [],
        }  # type: dict[str, list]

        for in_order in db.session.scalars(query):
            cls.add_dataset_row(dataset, in_order)

        return dataset

    @classmethod
    def add_dataset_row(cls, data: dict[str, list], in_order: m.InboundOrder) -> None:
        data["Order №"].append(in_order.order_id)
        data["Created At"].append(in_order.created_at.strftime("%Y-%m-%d %H:%M:%S"))
        data["Arrived"].append(in_order.finished_date)
        data["Warehouse"].append(in_order.warehouse.name)
        data["Supplier"].append(in_order.supplier.name)


def create_inbound_order_dataset(
    report: m.InboundOrder,
    master_group: str = "",
    target_group: str = "",
    download: bool = False,
) -> dict[str, list]:

    master_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).where(
            m.MasterGroupProduct.name != s.Events.name.value
        )
    ).all()

    data = {
        "Units of Measure": [],
        "SKU": [],
        "Quantity": [],
        "Group": [],
        "Brand": [],
        "Description": [],
        "Created At": [],
        "Supplier": [],
        "Arrived": [],
        "Warehouse": [],
        "Last transaction data": [],
    }  # type: dict[str, list]

    for product_allocated in report.products_allocated:
        for group in product_allocated.product_quantity_groups:
            if (
                master_group
                and not target_group
                and group.group.master_group.name != master_group
            ):
                continue

            if target_group and group.group.name != target_group:
                continue
            data["Units of Measure"].append(product_allocated.product.name)
            data["SKU"].append(product_allocated.product.SKU)
            data["Quantity"].append(group.quantity)
            data["Description"].append(product_allocated.product.description)
            data["Group"].append(group.group.name)
            data["Created At"].append(report.created_at.strftime("%Y-%m-%d %H:%M:%S"))
            data["Arrived"].append(report.delivery_date.strftime("%Y-%m-%d"))
            data["Warehouse"].append(report.warehouse.name)
            data["Last transaction data"].append(
                product_allocated.product.last_transaction_data
            )

            if download:
                add_product_groups(data, product_allocated.product, master_groups)
                add_product_exta_fields(data, product_allocated.product)
            else:
                data["Supplier"].append(report.supplier.name)
                data["Brand"].append(product_allocated.product.brand)

    return order_fields_dataset(data)
