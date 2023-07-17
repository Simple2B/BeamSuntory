from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin


class Supplier(db.Model, ModelMixin):
    __tablename__ = "suppliers"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    contact_number: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    country: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    region: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    city: orm.Mapped[int] = orm.mapped_column(sa.String(64))
    address: orm.Mapped[int] = orm.mapped_column(sa.String(64))
    zip: orm.Mapped[int] = orm.mapped_column(sa.String(64))
    active: orm.Mapped[bool] = orm.mapped_column(sa.Boolean())

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.Supplier.from_orm(self)
        return mg.json()
