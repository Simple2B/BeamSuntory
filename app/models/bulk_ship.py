from typing import List, TYPE_CHECKING
from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s

if TYPE_CHECKING:
    from .bulk_ship_item import BulkShipItem


class BulkShip(db.Model, ModelMixin):
    __tablename__ = "bulk_ships"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    uuid: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        index=True,
    )
    status: orm.Mapped[str] = orm.mapped_column(
        default=s.BulkShipStatus.DRAFT.value,
    )
    name = orm.mapped_column(sa.String(256), default="")
    is_deleted: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    items: orm.Mapped[List["BulkShipItem"]] = orm.relationship(
        back_populates="bulk_ship",
    )

    def __repr__(self):
        return f"<{self.id}>"
