import os
from typing import TYPE_CHECKING, List
from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import START_ORDER_NUMBER, ModelMixin

from .cart import Cart
from .store import Store
from .user import User
from .store_category import StoreCategory
from .report_event import ReportEvent
from .utils import generate_uuid
from .report_inventory import ReportInventoryList


if TYPE_CHECKING:
    from .report_shipping import ReportShipping
    from .ship_request_billable import ShipRequestBillable


class ShipRequest(db.Model, ModelMixin):
    __tablename__ = "ship_requests"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    store_category_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("store_categories.id")
    )
    store_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("stores.id", ondelete="SET NULL"), nullable=True
    )
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    report_inventory_list_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("report_inventory_lists.id"), nullable=True
    )

    # Columns
    order_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        nullable=False,
    )
    order_type: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )
    status: orm.Mapped[s.ShipRequestStatus] = orm.mapped_column(
        sa.Enum(s.ShipRequestStatus),
    )
    comment: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    wm_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    da_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    proof_of_delivery: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")
    tracking: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")

    # Relationships
    carts: orm.Mapped[list["Cart"]] = orm.relationship(back_populates="ship_request")
    store: orm.Mapped[Store] = orm.relationship()
    store_category: orm.Mapped[StoreCategory] = orm.relationship()
    reports_event: orm.Mapped[list["ReportEvent"]] = orm.relationship(
        back_populates="ship_request"
    )
    report_inventory_list: orm.Mapped["ReportInventoryList"] = orm.relationship(
        back_populates="ship_request"
    )

    reports: orm.Mapped[List["ReportShipping"]] = orm.relationship(
        back_populates="ship_request"
    )
    user: orm.Mapped[User] = orm.relationship()
    ship_request_billables: orm.Mapped[List["ShipRequestBillable"]] = orm.relationship(
        back_populates="ship_request"
    )

    @property
    def date_picked_up(self):
        if not self.reports:
            return "-"

        for report in self.reports:
            if report.type == s.ReportShipRequestActionType.PICKED_UP.value:
                return report.created_at.strftime("%m/%d/%Y")

        return self.reports[-1].type

    @property
    def date_delivered(self):
        if not self.reports:
            return "-"

        for report in self.reports:
            if report.type == s.ReportShipRequestActionType.DELIVERED.value:
                return report.created_at.strftime("%m/%d/%Y")

        return self.reports[-1].type

    def set_order_numb(self):
        app_name = os.environ.get("APP_NAME", "Beam Suntory")
        if os.environ.get("APP_NAME") != "Beam Suntory":
            self.order_numb = f"{app_name}-OB-{self.id}"
        else:
            self.order_numb = f"Beam-OB-{START_ORDER_NUMBER + self.id}"

    @property
    def cost_for_billable_by_brand(self):
        if not self.carts or not self.ship_request_billables:
            return {}

        costs_by_brand = {}
        total_quantity_of_allocated_products = 0

        # Обчислити загальну кількість продуктів для кожного бренду
        for cart in self.carts:
            brand = cart.product.brand
            quantity = cart.quantity
            if brand in costs_by_brand:
                costs_by_brand[brand] += quantity
            else:
                costs_by_brand[brand] = quantity
            total_quantity_of_allocated_products += quantity

        # Обчислити загальну вартість billables
        total_cost_of_billables = sum(
            billable.total for billable in self.ship_request_billables
        )

        # Обчислити середню вартість одного продукту
        av_cost = total_cost_of_billables / total_quantity_of_allocated_products

        # Розподілити вартість між брендами
        for brand in costs_by_brand:
            costs_by_brand[brand] = round(costs_by_brand[brand] * av_cost, 2)

        # Переконатися, що загальна вартість розподілена без залишку
        distributed_total_cost = sum(costs_by_brand.values())
        difference = round(total_cost_of_billables - distributed_total_cost, 2)

        if difference != 0:
            # Додати різницю до першого бренду, щоб уникнути залишку
            first_brand = next(iter(costs_by_brand))
            costs_by_brand[first_brand] += difference

        return costs_by_brand

    @property
    def cost_for_billable_by_product(self):
        if not self.carts or not self.ship_request_billables:
            return {}

        # Загальна кількість товарів у замовленні
        total_quantity_of_allocated_products = sum(cart.quantity for cart in self.carts)

        # Розрахунок вартості пакування на одиницю товару для кожного типу пакування
        per_unit_costs = {
            billable.billable_group_name: billable.total
            / total_quantity_of_allocated_products
            for billable in self.ship_request_billables
        }

        # Розподіл витрат по кожній позиції товарів
        costs_billable_by_product = {}
        for cart in self.carts:
            product_brand = cart.product.brand
            quantity = cart.quantity
            costs_billable_by_product[product_brand] = {
                billable.billable_group_name: round(
                    per_unit_costs[billable.billable_group_name] * quantity, 2
                )
                for billable in self.ship_request_billables
            }

        return costs_billable_by_product

    def __repr__(self):
        return f"<{self.id}: {self.order_numb}>"

    @property
    def json(self):
        return s.ShipRequest.model_validate(self).model_dump_json(by_alias=True)
