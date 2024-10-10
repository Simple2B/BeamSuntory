from datetime import datetime
from typing import TYPE_CHECKING

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin

if TYPE_CHECKING:
    from .store_master_group import StoreMasterGroup


class StoreGroup(db.Model, ModelMixin):
    __tablename__ = "store_groups"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign Keys
    master_store_group_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("store_master_groups.id")
    )
    store_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("stores.id"))

    sub_group_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("store_groups.id"),
    )

    # Columns
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relationships
    master_group: orm.Mapped["StoreMasterGroup"] = orm.relationship(
        back_populates="groups"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"
