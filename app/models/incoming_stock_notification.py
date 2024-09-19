from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s
from .product import Product


class IncomingStockNotification(db.Model, ModelMixin):
    __tablename__ = "incoming_stock_notifications"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    uuid: orm.Mapped[str] = orm.mapped_column(sa.String(64), default=generate_uuid)
    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    # Columns
    # quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    description: orm.Mapped[str] = orm.mapped_column(sa.String(256))
    approx_arrival_date: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime)
    recived_date: orm.Mapped[datetime | None] = orm.mapped_column(
        sa.DateTime, default=None
    )
    status: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), default=s.IncomingStockNotificationStatus.PENDING.value
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    # Relationships
    products: orm.Mapped[Product] = orm.relationship(
        back_populates="incoming_stock_notification"
    )

    @property
    def __repr__(self):
        return f"<Incoming Stock Notification {self.id}>"
