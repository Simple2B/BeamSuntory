from typing import Tuple, Type
from datetime import datetime
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


class ReportDataShipping(ReportData):
    type: s.ReportType = s.ReportType.SHIPPING
    ResponseModel: Type[s.ReportShippingResponse] = s.ReportShippingResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.ShipRequest]], sa.Select[Tuple[int]]]:
        query = (
            sa.select(m.ShipRequest)
            .where(m.ShipRequest.status == s.ShipRequestStatus.delivered)
            .order_by(m.ShipRequest.created_at.desc())
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.ShipRequest.status == s.ShipRequestStatus.delivered)
            .select_from(m.ShipRequest)
        )

        if report_filter.q:
            where_stmt = m.ShipRequest.store.has(
                m.Store.store_name.ilike(f"%{report_filter.q}%")
            ) | m.ShipRequest.reports.any(
                m.ReportShipping.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
            )

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.search_sku:
            where_stmt = m.ShipRequest.carts.any(
                m.Cart.product.has(m.Product.SKU.ilike(f"%{report_filter.search_sku}%"))
            )  # type: ignore

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.division:
            where_stmt = m.ShipRequest.reports.any(
                m.ReportShipping.user.has(
                    m.User.role == report_filter.division,
                )
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

        if report_filter.action_type_shipping:
            where_stmt = m.ShipRequest.reports.any(
                m.ReportShipping.type == report_filter.action_type_shipping.value
            )  # type: ignore
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.master_group and not report_filter.target_group:
            where_stmt = m.ShipRequest.carts.any(
                m.Cart.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == report_filter.master_group
                    )
                )
            )  # type: ignore

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.target_group:
            where_stmt = m.ShipRequest.carts.any(
                m.Cart.group.has((m.Group.name == report_filter.target_group))
            )  # type: ignore

            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        for group_name in (
            report_filter.brand,
            report_filter.language,
            report_filter.categories,
            report_filter.premises,
        ):
            if not group_name:
                continue
            where_stmt = m.ShipRequest.carts.any(
                m.Cart.product.has(
                    m.Product.groups.any(m.GroupProduct.name == group_name)
                )
            )  # type: ignore

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
            "report/shipping/reports_table.html",
            page=pagination,
            reports=reports,
            report_filter=report_filter,
        )

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter) -> dict[str, list]:
        query, _ = cls.get_search_result(report_filter)
        dataset = {
            "Order №": [],
            "User": [],
            "Store": [],
            "Created At": [],
            "Date delivered": [],
            "Date picked up": [],
        }  # type: dict[str, list]

        for report in db.session.scalars(query):
            dataset = add_dataset_row(dataset, report)
        return dataset


def add_dataset_row(dataset: dict[str, list], report: m.ShipRequest):
    dataset["Order №"].append(report.order_numb)
    dataset["User"].append(report.user.username)
    dataset["Store"].append(report.store.store_name)
    dataset["Date delivered"].append(report.date_delivered)
    dataset["Date picked up"].append(report.date_picked_up)
    dataset["Created At"].append(report.created_at.strftime("%m/%d/%Y %H:%M:%S"))

    return dataset


def create_shipping_modal_dataset(
    report: m.ShipRequest,
    master_group: str = "",
    target_group: str = "",
    download: bool = False,
) -> dict[str, list]:

    master_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).where(
            m.MasterGroupProduct.name != s.Events.name.value
        )
    ).all()
    dataset = {
        "SKU": [],
        "Untis of Measure": [],
        "Brand": [],
        "Description": [],
        "Quantity": [],
        "Group": [],
        "Warehouse": [],
        "Order №": [],
        "User": [],
        "Store": [],
        "Date delivered": [],
        "Date picked up": [],
        "Last transaction data": [],
    }  # type: dict[str, list]

    for cart in report.carts:
        if (
            master_group
            and not target_group
            and cart.group.master_group.name != master_group
        ):
            continue
        if target_group and cart.group.name != target_group:
            continue
        dataset["SKU"].append(cart.product.SKU)
        dataset["Untis of Measure"].append(cart.product.name)
        dataset["Quantity"].append(cart.quantity)
        dataset["Description"].append(cart.product.description)
        dataset["Group"].append(cart.group.name)
        dataset["Warehouse"].append(cart.warehouse.name)
        dataset["Order №"].append(report.order_numb)
        dataset["User"].append(report.user.username)
        dataset["Store"].append(report.store.store_name)
        dataset["Date delivered"].append(report.date_delivered)
        dataset["Date picked up"].append(report.date_picked_up)
        dataset["Last transaction data"].append(cart.product.last_transaction_data)

        if download:
            add_product_groups(dataset, cart.product, master_groups)
            add_product_exta_fields(dataset, cart.product)
        else:
            dataset["Brand"].append(cart.product.brand)

    return order_fields_dataset(dataset)
