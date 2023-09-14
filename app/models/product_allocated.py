from datetime import date
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from .product import Product
from .product_quantity_group import ProductQuantityGroup


class ProductAllocated(db.Model, ModelMixin):
    __tablename__ = "products_allocated"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("products.id", ondelete="CASCADE")
    )
    product: orm.Mapped[Product] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column()
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("inbound_orders.id", ondelete="CASCADE")
    )
    shelf_life_start: orm.Mapped[date] = orm.mapped_column(sa.Date)
    shelf_life_end: orm.Mapped[date] = orm.mapped_column(sa.Date)

    product_quantity_groups: orm.Mapped[list[ProductQuantityGroup]] = orm.relationship(
        back_populates="product_allocated"
    )
