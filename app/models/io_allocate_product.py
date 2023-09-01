from datetime import datetime
from sqlalchemy import ForeignKey, orm, DateTime

from app import db
from .utils import ModelMixin
from .product import Product


class IOAllocateProduct(db.Model, ModelMixin):
    __tablename__ = "io_allocate_product"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("products.id", ondelete="CASCADE")
    )
    product: orm.Mapped[Product] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column()
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("inbound_orders.id", ondelete="CASCADE")
    )
    shelf_life_start: orm.Mapped[datetime] = orm.mapped_column(DateTime())  # calendar
    shelf_life_end: orm.Mapped[datetime] = orm.mapped_column(DateTime())  # calendar
