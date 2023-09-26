from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .product import Product
from .group import Group
from .user import User


class Assign(db.Model, ModelMixin):
    __tablename__ = "assigns"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    product: orm.Mapped[Product] = orm.relationship()

    from_group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    from_group: orm.Mapped[Group] = orm.relationship(
        "Group", foreign_keys=[from_group_id]
    )

    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped[Group] = orm.relationship("Group", foreign_keys=[group_id])

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    user: orm.Mapped[User] = orm.relationship("User")

    @property
    def json(self):
        assign = s.Assign.model_validate(self)
        return assign.model_dump_json()
