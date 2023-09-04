from datetime import date
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from .product import Product


class IOAllocateProduct(db.Model, ModelMixin):
    __tablename__ = "io_allocate_product"
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
