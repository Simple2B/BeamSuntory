from datetime import datetime, date
import os
from typing import TYPE_CHECKING

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s
from .supplier import Supplier
from .warehouse import Warehouse
from .product_allocated import ProductAllocated
from .report_inventory import ReportInventoryList
from .utils import START_ORDER_NUMBER

if TYPE_CHECKING:
    from .ship_request_billable import ShipRequestBillable


class InboundOrder(db.Model, ModelMixin):
    __tablename__ = "inbound_orders"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    supplier_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("suppliers.id"))
    warehouse_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("warehouses.id"))
    report_inventory_list_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("report_inventory_lists.id"), nullable=True
    )

    # Columns
    uuid: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        index=True,
    )
    title: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    order_id: orm.Mapped[str | None] = orm.mapped_column(
        sa.String(64),
    )
    active_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    active_time: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    delivery_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    status: orm.Mapped[s.InboundOrderStatus] = orm.mapped_column(
        sa.Enum(s.InboundOrderStatus),
        default=s.InboundOrderStatus.draft,
    )
    wm_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    da_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    proof_of_delivery: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")
    tracking: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    ship_request_billables: orm.Mapped[list["ShipRequestBillable"]] = orm.relationship(
        "ShipRequestBillable", back_populates="inbound_order"
    )

    # Relationships
    supplier: orm.Mapped[Supplier] = orm.relationship()
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    products_allocated: orm.Mapped[list[ProductAllocated]] = orm.relationship(
        cascade="all, delete-orphan", overlaps="inbound_order"
    )
    report_inventory_list: orm.Mapped["ReportInventoryList"] = orm.relationship(
        back_populates="inbound_order"
    )

    @property
    def finished_date(self):
        if not self.report_inventory_list:
            return self.status
        return self.report_inventory_list.created_at.strftime("%Y-%m-%d")

    def set_order_id(self):
        app_name = os.environ.get("APP_NAME", "Beam Suntory")
        if os.environ.get("APP_NAME") != "Beam Suntory":
            self.order_id = f"{app_name}-OB-{self.id}"
        else:
            self.order_id = f"Beam-IB-{START_ORDER_NUMBER + self.id}"

    @property
    def cost_for_billable_by_brand(self):
        if not self.products_allocated or not self.ship_request_billables:
            return {}

        costs_by_brand = {}
        total_quantity_of_allocated_products = 0

        # Обчислити загальну кількість продуктів для кожного бренду
        for product_allocated in self.products_allocated:
            brand = product_allocated.product.brand
            quantity = product_allocated.quantity
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
        if not self.products_allocated or not self.ship_request_billables:
            return {}

        # Загальна кількість товарів у замовленні
        total_quantity_of_allocated_products = sum(
            product_allocated.quantity for product_allocated in self.products_allocated
        )

        # Розрахунок вартості пакування на одиницю товару для кожного типу пакування
        per_unit_costs = {
            billable.billable_group_name: billable.total
            / total_quantity_of_allocated_products
            for billable in self.ship_request_billables
        }

        # Розподіл витрат по кожній позиції товарів
        costs_billable_by_product = {}
        for product_allocated in self.products_allocated:
            product_brand = product_allocated.product.brand
            quantity = product_allocated.quantity
            costs_billable_by_product[product_brand] = {
                billable.billable_group_name: round(
                    per_unit_costs[billable.billable_group_name] * quantity, 2
                )
                for billable in self.ship_request_billables
            }

        return costs_billable_by_product

    def __repr__(self):
        return f"<{self.id}: {self.order_id}>"

    @property
    def json(self):
        return s.InboundOrder.model_validate(self).model_dump_json(by_alias=True)
