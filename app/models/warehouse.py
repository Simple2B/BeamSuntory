from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .user import User
from .values import StrValue


class Warehouse(db.Model, ModelMixin):
    __tablename__ = "warehouses"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
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
        default=datetime.utcnow,
    )

    manager_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    manager: orm.Mapped[User] = orm.relationship()
    country_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("str_values.id"))
    country: orm.Mapped[StrValue | None] = orm.relationship(foreign_keys=[country_id])
    region_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("str_values.id"))
    region: orm.Mapped[StrValue | None] = orm.relationship(foreign_keys=[region_id])

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.Warehouse.from_orm(self)
        return mg.json()
