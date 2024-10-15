from datetime import datetime
from typing import Tuple, Type
import sqlalchemy as sa

from flask import render_template

from app import schema as s, models as m
from app.database import db
from app.controllers.pagination import create_pagination

from .report_data import ReportData, order_fields_dataset


class ReportDataAdjustments(ReportData):
    type: s.ReportType = s.ReportType.ADJUSTMENT
    ResponseModel: Type[s.AdjustResponse] = s.AdjustResponse

    @classmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> Tuple[sa.Select[Tuple[m.Adjust]], sa.Select[Tuple[int]]]:
        query = sa.select(m.Adjust).order_by(m.Adjust.id)
        count_query = sa.select(sa.func.count()).select_from(m.Adjust)

        if report_filter.q:
            query = query.where(
                m.Adjust.product.has(m.Product.name.ilike(f"%{report_filter.q}%"))
                | m.Adjust.user.has(m.User.username.ilike(f"%{report_filter.q}%"))
            )

            count_query = count_query.where(
                m.ReportEvent.ship_request.has(
                    m.ShipRequest.carts.any(
                        m.Cart.event.has(
                            m.Event.product.has(
                                m.Product.name.ilike(f"%{report_filter.q}%")
                            )
                        )
                    )
                )
            )
        if report_filter.search_sku:
            where_stmt = m.Adjust.product.has(
                m.Product.SKU.ilike(f"%{report_filter.search_sku}%")
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

        if report_filter.start_date:
            query = query.where(
                m.Adjust.created_at
                >= datetime.strptime(report_filter.start_date, "%m/%d/%Y")
            )

        if report_filter.end_date:
            query = query.where(
                m.Adjust.created_at
                <= datetime.strptime(report_filter.end_date, "%m/%d/%Y")
            )

        if report_filter.user:
            query = query.where(
                m.Adjust.user.has(m.User.username == report_filter.user)
            )

        if report_filter.master_group:
            query = query.where(
                m.Adjust.adjust_group_qty.any(
                    m.AdjustGroupQty.group.has(
                        m.Group.master_group.has(
                            m.MasterGroup.name.ilike(f"%{report_filter.master_group}%")
                        )
                    )
                )
            )

        if report_filter.target_group:
            query = query.where(
                m.Adjust.adjust_group_qty.any(
                    m.AdjustGroupQty.group.has(
                        m.Group.name.ilike(f"%{report_filter.target_group}%")
                    )
                )
            )

        master_groups = [
            report_filter.brand,
            report_filter.language,
            report_filter.categories,
            report_filter.premises,
            report_filter.events,
        ]

        for group in master_groups:
            if not group:
                continue
            where_stmt = m.Adjust.adjust_group_qty.any(
                m.AdjustGroupQty.product.has(
                    m.Product.groups.any(
                        m.ProductGroup.parent.has(m.GroupProduct.name == group)
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

        reports = db.session.scalars(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        )
        return pagination, reports

    @classmethod
    def render(cls, pagination: sa.ScalarResult, reports: sa.ScalarResult, _) -> str:
        return render_template(
            "report/adjustment/reports_table.html",
            page=pagination,
            reports=reports,
        )

    @classmethod
    def get_dataset(cls, report_filter: s.ReportFilter) -> dict[str, list]:
        query, _ = cls.get_search_result(report_filter)

        reports = db.session.scalars(query)
        master_groups = cls.get_product_master_groups()
        # 'created_at,product_name,sku,username,master_group,group,warehouse,quantity_before,quantity_after,quantity_delta,note',
        dataset = {
            "SKU": [],
            "Untis of Measure": [],
            "Created at": [],
            "Description": [],
            "Username": [],
            "Master group": [],
            "Group": [],
            "Warehouse": [],
            "Quantity before": [],
            "Quantity after": [],
            "Quantity delta": [],
            "Note": [],
            "Last transaction data": [],
        }  # type: dict[str, list]

        for adjust in reports:
            for report_adjust in adjust.adjust_group_qty:

                dataset["Created at"].append(adjust.created_at)
                dataset["Untis of Measure"].append(adjust.product.name)
                dataset["SKU"].append(adjust.product.SKU)
                dataset["Username"].append(adjust.user.username)
                dataset["Description"].append(adjust.product.description)
                dataset["Master group"].append(report_adjust.group.master_group.name)
                dataset["Group"].append(report_adjust.group.name)
                dataset["Warehouse"].append(report_adjust.warehouse.name)
                dataset["Quantity before"].append(report_adjust.quantity_before)
                dataset["Quantity after"].append(report_adjust.quantity_after)
                dataset["Quantity delta"].append(report_adjust.delta_value)
                dataset["Note"].append(adjust.note)
                dataset["Last transaction data"].append(
                    adjust.product.last_transaction_data
                )
                cls.add_product_groups(dataset, adjust.product, master_groups)

        return order_fields_dataset(dataset)
