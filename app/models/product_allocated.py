from typing import TYPE_CHECKING
from datetime import date
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from .product import Product
from .product_quantity_group import ProductQuantityGroup


if TYPE_CHECKING:
    from .inbound_order import InboundOrder


class ProductAllocated(db.Model, ModelMixin):
    __tablename__ = "products_allocated"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("products.id", ondelete="CASCADE")
    )
    product: orm.Mapped[Product] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column()
    quantity_received: orm.Mapped[int] = orm.mapped_column(nullable=True)
    quantity_remains: orm.Mapped[int] = orm.mapped_column(nullable=True)
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("inbound_orders.id", ondelete="CASCADE")
    )
    shelf_life_start: orm.Mapped[date] = orm.mapped_column()
    shelf_life_end: orm.Mapped[date] = orm.mapped_column()

    product_quantity_groups: orm.Mapped[list[ProductQuantityGroup]] = orm.relationship(
        back_populates="product_allocated",
        cascade="all, delete-orphan",
    )
    inbound_order: orm.Mapped["InboundOrder"] = orm.relationship()
