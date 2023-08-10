from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin


class IOAllocateProduct(db.Model, ModelMixin):
    __tablename__ = "io_allocate_product"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("products.id", ondelete="CASCADE")
    )
    product = orm.relationship("Product")
    quantity: orm.Mapped[int] = orm.mapped_column()
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("inbound_orders.id", ondelete="CASCADE")
    )
