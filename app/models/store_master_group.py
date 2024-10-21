from typing import TYPE_CHECKING
from datetime import datetime
from typing import List

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import models as m

if TYPE_CHECKING:
    from .store_group import StoreGroup


class StoreMasterGroup(db.Model, ModelMixin):
    __tablename__ = "store_master_groups"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    uuid: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        nullable=False,
    )
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    groups: orm.Mapped[List["StoreGroup"]] = orm.relationship(
        back_populates="master_group", order_by=m.Group.name.asc()
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"
