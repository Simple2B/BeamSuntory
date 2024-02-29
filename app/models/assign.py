from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s
from .product import Product
from .group import Group
from .user import User


class Assign(db.Model, ModelMixin):
    __tablename__ = "assigns"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    # Foreign keys
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    from_group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    # Columns
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    uuid: orm.Mapped[str] = orm.mapped_column(sa.String(64), default=generate_uuid)
    # Relationships
    product: orm.Mapped[Product] = orm.relationship()
    from_group: orm.Mapped[Group] = orm.relationship(
        "Group", foreign_keys=[from_group_id]
    )
    group: orm.Mapped[Group] = orm.relationship("Group", foreign_keys=[group_id])
    user: orm.Mapped[User] = orm.relationship("User")

    @property
    def json(self):
        return s.Assign.model_validate(self).model_dump_json(by_alias=True)
