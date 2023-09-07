from datetime import datetime, date

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .product import Product


class Event(db.Model, ModelMixin):
    __tablename__ = "events"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    date_from: orm.Mapped[date] = orm.mapped_column(sa.Date)
    date_to: orm.Mapped[date] = orm.mapped_column(sa.Date)
    quantity: orm.Mapped[int] = orm.mapped_column()
    comment: orm.Mapped[str] = orm.mapped_column(sa.Text(), nullable=True)
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    product: orm.Mapped[Product] = orm.relationship()

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.product_id}>"

    @property
    def json(self):
        return s.Event.from_orm(self).json(by_alias=True)
