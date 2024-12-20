# flake8: noqa: E203
from datetime import datetime
from typing import Tuple, Type

import sqlalchemy as sa
from flask import render_template

from app import models as m
from app import schema as s
from app.controllers.pagination import create_pagination
from app.database import db

from .report_data import ReportData


class ReportDataInboundBillable(ReportData):
    type: s.ReportType = s.ReportType.INBOUND_BILLABLE
    ResponseModel: Type[s.ReportBillableResponse] = s.ReportBillableResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.ShipRequest]], sa.Select[Tuple[int]]]:

        query = (
            sa.select(m.InboundOrder)
            .where(
                m.InboundOrder.status != s.InboundOrderStatus.cancelled,
                sa.exists().where(
                    m.ShipRequestBillable.inbound_order_id == m.InboundOrder.id
                ),
            )
            .order_by(m.InboundOrder.created_at.desc())
        )
        count_query = sa.select(sa.func.count()).select_from(m.InboundOrder)

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

        if report_filter.start_date:
            where_stmt = m.InboundOrder.created_at >= datetime.strptime(
                report_filter.start_date, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date_to:
            where_stmt = m.InboundOrder.created_at <= datetime.strptime(
                report_filter.start_date_to, "%m/%d/%Y"
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        master_groups = [
            report_filter.brand,
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

        return query, count_query

    @classmethod
    def get_reports(cls, report_filter: s.ReportFilter):
        query, count_query = cls.get_search_result(report_filter)

        pagination = create_pagination(total=db.session.scalar(count_query))

        inbounds = db.session.scalars(query)

        reports = []
        for inbound in inbounds:
            if not inbound.products_allocated or not inbound.ship_request_billables:
                continue
            for product_allocated in inbound.products_allocated:
                reports.append(
                    s.ReportInboundBillable(
                        id=inbound.id,
                        title=inbound.title,
                        brand=product_allocated.product.brand,
                        created_at=inbound.created_at,
                        total=inbound.cost_for_billable_by_brand[
                            product_allocated.product.brand
                        ],
                    )
                )

        master_groups = [
            report_filter.brand,
        ]

        if master_groups.count(None) != len(master_groups):
            filtered_reports = []
            for group in master_groups:
                if not group:
                    continue
                for report in reports:
                    if report.brand == group:
                        filtered_reports.append(report)
            reports = filtered_reports

        pagination = create_pagination(total=len(reports))

        reports = reports[
            (pagination.page - 1)
            * pagination.per_page : pagination.page
            * pagination.per_page
        ]

        return pagination, reports

    @classmethod
    def render(
        cls,
        pagination: sa.ScalarResult,
        reports: sa.ScalarResult,
        report_filter: s.ReportFilter,
    ) -> str:
        return render_template(
            "report/inbound_billable/reports_table.html",
            page=pagination,
            reports=reports,
            report_filter=report_filter,
        )

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter) -> dict[str, list]:
        query, _ = cls.get_search_result(report_filter)
        dataset = {
            "№": [],
            "Inbound order": [],
            "Brand": [],
            "Created At": [],
            "Total": [],
        }  # type: dict[str, list]

        inbounds = db.session.scalars(query)

        reports = []
        for inbound in inbounds:
            if not inbound.products_allocated or not inbound.ship_request_billables:
                continue
            for product_allocated in inbound.products_allocated:
                reports.append(
                    s.ReportInboundBillable(
                        id=inbound.id,
                        title=inbound.title,
                        brand=product_allocated.product.brand,
                        created_at=inbound.created_at,
                        total=inbound.cost_for_billable_by_brand[
                            product_allocated.product.brand
                        ],
                    )
                )

        for report in reports:
            dataset = add_dataset_row(dataset, report)
        return dataset


def add_dataset_row(dataset: dict[str, list], report: s.ReportInboundBillable):
    dataset["№"].append(report.id)
    dataset["Inbound order"].append(report.title)
    dataset["Brand"].append(report.brand)
    dataset["Created At"].append(report.created_at.strftime("%m/%d/%Y %H:%M:%S"))
    dataset["Total"].append(report.total)

    inbound_order = db.session.get(m.InboundOrder, report.id)
    for brands, products in inbound_order.cost_for_billable_by_product.items():
        if brands == report.brand:
            for product_name, cost in products.items():
                if product_name not in dataset:
                    dataset[product_name] = [""] * (
                        len(dataset["№"]) - 1
                    )  # Ініціалізуйте список з порожніми значеннями
                dataset[product_name].append(cost)

    # Додайте порожні значення для нових полів у всіх інших рядках
    for key in dataset.keys():
        if len(dataset[key]) < len(dataset["№"]):
            dataset[key].append("")

    return dataset


def create_inbound_billable_modal_dataset(
    report: m.InboundOrder,
    brand: str,
    download: bool = False,
) -> dict[str, list]:

    dataset = {
        "№": report.id,
        "Inbound order": report.title,
        "Brand": brand,
        "Created At": report.created_at,
        "Total": f"{report.cost_for_billable_by_brand[brand]} $",
    }  # type: dict[str, list]

    for brands, products in report.cost_for_billable_by_product.items():
        if brands == brand:
            for product_name, cost in products.items():
                dataset[product_name] = f"{cost} $"

    return dataset
