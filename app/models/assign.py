from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .product import Product
from .group import Group


class Assign(db.Model, ModelMixin):
    __tablename__ = "assigns"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    product: orm.Mapped[Product] = orm.relationship()
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped[Group] = orm.relationship()

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    @property
    def json(self):
        mg = s.Assign.from_orm(self)
        return mg.json()
