from typing import TYPE_CHECKING
from datetime import datetime
from sqlalchemy import ForeignKey, orm, DateTime

from app import db
from .utils import ModelMixin


if TYPE_CHECKING:
    from .product import Product
    from .group import Group
    from .inbound_order import InboundOrder
    from .warehouse import Warehouse


class ProductQuantityGroup(db.Model, ModelMixin):
    __tablename__ = "product_quantity_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))

    product: orm.Mapped["Product"] = orm.relationship()
    group: orm.Mapped["Group"] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column()
    # NOTE: quantity after incoming stock is received
    quantity_received: orm.Mapped[int] = orm.mapped_column(nullable=True)
    warehouse_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("warehouses.id"))
    warehouse: orm.Mapped["Warehouse"] = orm.relationship()

    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("inbound_orders.id")
    )
    inbound_order: orm.Mapped["InboundOrder"] = orm.relationship()
    shelf_life_start: orm.Mapped[datetime] = orm.mapped_column(DateTime())  # calendar
    shelf_life_end: orm.Mapped[datetime] = orm.mapped_column(DateTime())  # calendar
