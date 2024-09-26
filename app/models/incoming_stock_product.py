from typing import TYPE_CHECKING, Optional

from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid

if TYPE_CHECKING:
    from .incoming_stock_notification import IncomingStockNotification
    from .product import Product


class IncomingStockProduct(db.Model, ModelMixin):
    __tablename__ = "incoming_stock_products"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    uuid: orm.Mapped[str] = orm.mapped_column(sa.String(64), default=generate_uuid)
    # Foreign keys
    product_id: orm.Mapped[int | None] = orm.mapped_column(sa.ForeignKey("products.id"))
    stock_notify_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("incoming_stock_notifications.id")
    )
    # Columns
    product_info: orm.Mapped[str] = orm.mapped_column(sa.String(256))
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    # Relationships
    product: orm.Mapped[Optional["Product"]] = orm.relationship()
    incoming_stock_notification: orm.Mapped["IncomingStockNotification"] = (
        orm.relationship(back_populates="products")
    )

    def __repr__(self):
        return f"<Incoming Stock Product {self.id}>"
