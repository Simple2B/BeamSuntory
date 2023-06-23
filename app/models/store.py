from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin
from .values import StrValue


class Store(db.Model, ModelMixin):
    __tablename__ = "stores"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    store_category: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )  # TODO enum???
    store_name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    contact_person: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    phone_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    city: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    address: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    zip: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    active: orm.Mapped[bool] = orm.mapped_column(sa.Boolean())

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    country_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("str_values.id"))
    country: orm.Mapped[StrValue] = orm.relationship()
    region_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("str_values.id"))
    region: orm.Mapped[StrValue] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.store_name}>"

    @property
    def json(self):
        mg = s.Store.from_orm(self)
        return mg.json()
