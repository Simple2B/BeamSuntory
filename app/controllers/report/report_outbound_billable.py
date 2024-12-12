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


class ReportDataOutboundBillable(ReportData):
    type: s.ReportType = s.ReportType.OUTBOUND_BILLABLE
    ResponseModel: Type[s.ReportBillableResponse] = s.ReportBillableResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.ShipRequest]], sa.Select[Tuple[int]]]:

        query = (
            sa.select(m.ShipRequest)
            .where(
                m.ShipRequest.status != s.ShipRequestStatus.cancelled,
                sa.exists().where(
                    m.ShipRequestBillable.ship_request_id == m.ShipRequest.id
                ),
            )
            .order_by(m.ShipRequest.created_at.desc())
        )
        count_query = sa.select(sa.func.count()).select_from(m.ShipRequest)

        if report_filter.q:
            where_stmt = (
                m.ShipRequest.store.has(
                    m.Store.store_name.ilike(f"%{report_filter.q}%")
                )
                | m.ShipRequest.reports.any(
                    m.ReportShipping.user.has(
                        m.User.username.ilike(f"%{report_filter.q}%")
                    )
                )
                | m.ShipRequest.order_numb.ilike(f"%{report_filter.q}%")
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.search_sku:
            where_stmt = m.ShipRequest.carts.any(
                m.Cart.product.has(m.Product.SKU.ilike(f"%{report_filter.search_sku}%"))
            )  # type: ignore

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            where_stmt = m.ShipRequest.reports.any(
                m.ReportShipping.created_at
                >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date_to:
            where_stmt = m.ShipRequest.reports.any(
                m.ReportShipping.created_at
                <= datetime.strptime(report_filter.start_date_to, "%m/%d/%Y")
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        master_groups = [
            report_filter.brand,
        ]

        if master_groups.count(None) != len(master_groups):
            for group in master_groups:
                if not group:
                    continue
                where_stmt = m.ShipRequest.carts.any(
                    m.Cart.product.has(
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

        shipments = db.session.scalars(query)

        reports = []
        for shipment in shipments:
            if not shipment.ship_request_billables:
                continue
            for cart in shipment.carts:
                reports.append(
                    s.ReportInboundBillable(
                        id=shipment.id,
                        title=shipment.order_numb,
                        brand=cart.product.brand,
                        created_at=shipment.created_at,
                        total=shipment.cost_for_billable_by_brand[cart.product.brand],
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
            "report/outbound_billable/reports_table.html",
            page=pagination,
            reports=reports,
            report_filter=report_filter,
        )

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter) -> dict[str, list]:
        query, _ = cls.get_search_result(report_filter)
        dataset = {
            "№": [],
            "Outbound order": [],
            "Brand": [],
            "Created At": [],
            "Total": [],
        }  # type: dict[str, list]

        shipments = db.session.scalars(query)

        reports = []
        for shipment in shipments:
            if not shipment.ship_request_billables:
                continue
            for cart in shipment.carts:
                reports.append(
                    s.ReportInboundBillable(
                        id=shipment.id,
                        title=shipment.order_numb,
                        brand=cart.product.brand,
                        created_at=shipment.created_at,
                        total=shipment.cost_for_billable_by_brand[cart.product.brand],
                    )
                )

        for report in reports:
            dataset = add_dataset_row(dataset, report)
        return dataset


def add_dataset_row(dataset: dict[str, list], report: s.ReportInboundBillable):
    dataset["№"].append(report.id)
    dataset["Outbound order"].append(report.title)
    dataset["Brand"].append(report.brand)
    dataset["Created At"].append(report.created_at.strftime("%m/%d/%Y %H:%M:%S"))
    dataset["Total"].append(report.total)

    outbound_order = db.session.get(m.ShipRequest, report.id)
    for brands, products in outbound_order.cost_for_billable_by_product.items():
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


def create_outbound_billable_modal_dataset(
    report: m.ShipRequest,
    brand: str,
    download: bool = False,
) -> dict[str, list]:

    dataset = {
        "№": report.id,
        "Outbound order": report.order_numb,
        "Brand": brand,
        "Created At": report.created_at,
        "Total": f"{report.cost_for_billable_by_brand[brand]} $",
    }  # type: dict[str, list]

    for brands, products in report.cost_for_billable_by_product.items():
        if brands == brand:
            for product_name, cost in products.items():
                dataset[product_name] = f"{cost} $"

    return dataset
