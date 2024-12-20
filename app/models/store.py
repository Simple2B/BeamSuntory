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
        default="",
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
        default="",
    )
    phone_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
        default="",
    )
    country: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")
    region: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")
    city: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")
    # must check if address already exists
    address: orm.Mapped[str] = orm.mapped_column(sa.String(512), default="")
    zip: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")
    active: orm.Mapped[bool] = orm.mapped_column(sa.Boolean(), default=True)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    store_category: orm.Mapped["StoreCategory"] = orm.relationship(
        back_populates="stores"
    )

    def __repr__(self):
        return f"<{self.id}: {self.store_name}>"

    @property
    def full_address(self):
        return f"{self.country}, {self.region}, {self.city}, {self.address}, {self.zip}"

    @property
    def json(self):
        return s.Store.model_validate(self).model_dump_json()
