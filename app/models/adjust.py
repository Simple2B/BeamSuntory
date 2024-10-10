from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import ForeignKey, orm

from app import schema as s
from app.database import db
from .utils import ModelMixin

from .product import Product
from .adjusts_group_qty import AdjustGroupQty
from .user import User


class Adjust(db.Model, ModelMixin):
    __tablename__ = "adjusts"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    # Foreign keys
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    user_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    # Columns
    note: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    # Relationships
    product: orm.Mapped[Product] = orm.relationship()
    user: orm.Mapped[User] = orm.relationship()
    adjust_group_qty: orm.Mapped[list[AdjustGroupQty]] = orm.relationship()

    @property
    def json(self):
        return s.Adjust.model_validate(self).model_dump_json(by_alias=True)
