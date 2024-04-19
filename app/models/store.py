from typing import TYPE_CHECKING
from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin

if TYPE_CHECKING:
    from .store_category import StoreCategory


class Store(db.Model, ModelMixin):
    __tablename__ = "stores"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id"), nullable=True
    )
    store_category_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("store_categories.id")
    )

    # Columns
    store_name: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )
    contact_person: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )
    phone_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )
    country: orm.Mapped[str] = orm.mapped_column(sa.String(128))
    region: orm.Mapped[str] = orm.mapped_column(sa.String(128))
    city: orm.Mapped[str] = orm.mapped_column(sa.String(128))
    # must check if address already exists
    address: orm.Mapped[str] = orm.mapped_column(sa.String(512))
    zip: orm.Mapped[str] = orm.mapped_column(sa.String(128))
    active: orm.Mapped[bool] = orm.mapped_column(sa.Boolean())

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    store_category: orm.Mapped["StoreCategory"] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.store_name}>"

    @property
    def json(self):
        return s.Store.model_validate(self).model_dump_json()
