from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .user import User


class Warehouse(db.Model, ModelMixin):
    __tablename__ = "warehouses"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    manager_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id"), nullable=True
    )

    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    phone_number: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    city: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    zip: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    address: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    manager: orm.Mapped[User] = orm.relationship()
    # TODO decide where we select country and region. From some fixed list or from groups?
    # from .group import Group
    # country_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    # country: orm.Mapped[Group | None] = orm.relationship(foreign_keys=[country_id])
    # region_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    # sregion: orm.Mapped[Group | None] = orm.relationship(foreign_keys=[region_id])

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.Warehouse.model_validate(self).model_dump_json()
