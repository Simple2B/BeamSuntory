from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from app import schema as s
from .product import Product

if TYPE_CHECKING:
    from .user import User
    from .ship_request import ShipRequest
    from .inbound_order import InboundOrder
    from .warehouse import Warehouse
    from .store import Store
    from .warehouse_product import WarehouseProduct


class ReportInventory(db.Model, ModelMixin):
    __tablename__ = "report_inventories"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    report_inventory_list_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("report_inventory_lists.id")
    )
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    warehouse_product_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("warehouse_product.id")
    )

    # Columns
    qty_before: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    qty_after: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relationships
    product: orm.Mapped["Product"] = orm.relationship()
    warehouse_product: orm.Mapped["WarehouseProduct"] = orm.relationship()
    report_inventory_list: orm.Mapped["ReportInventoryList"] = orm.relationship()

    @property
    def json(self):
        return s.ReportInventory.model_validate(self).model_dump_json(by_alias=True)


class ReportInventoryList(db.Model, ModelMixin):
    __tablename__ = "report_inventory_lists"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    warehouse_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("warehouses.id"), nullable=True
    )
    store_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("stores.id"), nullable=True
    )

    # Columns
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relationships
    ship_request: orm.Mapped["ShipRequest"] = orm.relationship(
        back_populates="report_inventory_list"
    )
    inbound_order: orm.Mapped["InboundOrder"] = orm.relationship(
        back_populates="report_inventory_list"
    )
    warehouse: orm.Mapped["Warehouse"] = orm.relationship()
    store: orm.Mapped["Store"] = orm.relationship()
    user: orm.Mapped["User"] = orm.relationship()
    report_inventories: orm.Mapped[list["ReportInventory"]] = orm.relationship()

    @property
    def json(self):
        return s.ReportInventoryList.model_validate(self).model_dump_json(by_alias=True)
