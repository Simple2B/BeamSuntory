from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin

from .product import Product


class Cart(db.Model, ModelMixin):
    __tablename__ = "carts"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    product: orm.Mapped[Product] = orm.relationship()
    comments: orm.Mapped[str] = orm.mapped_column(sa.String(256), default="")
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    status: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), default="pending"
    )  # in progress, completed, removed
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    order_numb: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.product_id}>"

    @property
    def json(self):
        c = s.Cart.from_orm(self)
        return c.json()
