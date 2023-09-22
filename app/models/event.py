from typing import TYPE_CHECKING
from datetime import datetime, date

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s

if TYPE_CHECKING:
    from .product import Product
    from .user import User
    from .cart import Cart


class Event(db.Model, ModelMixin):
    __tablename__ = "events"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    date_from: orm.Mapped[date] = orm.mapped_column(sa.Date, nullable=True)
    date_to: orm.Mapped[date] = orm.mapped_column(sa.Date, nullable=True)
    date_reserve_from: orm.Mapped[date] = orm.mapped_column(sa.Date, nullable=True)
    date_reserve_to: orm.Mapped[date] = orm.mapped_column(sa.Date, nullable=True)
    quantity: orm.Mapped[int] = orm.mapped_column()
    comment: orm.Mapped[str] = orm.mapped_column(sa.Text(), nullable=True)
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))

    cart_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("carts.id"))
    cart: orm.Mapped["Cart"] = orm.relationship(viewonly=True)

    product: orm.Mapped["Product"] = orm.relationship()
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    user: orm.Mapped["User"] = orm.relationship()

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.product_id}>"

    @property
    def json(self):
        return s.Event.model_validate(self).model_dump_json(by_alias=True)
