from typing import TYPE_CHECKING
from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s

if TYPE_CHECKING:
    from .bulk_ship import BulkShip


class BulkShipItem(db.Model, ModelMixin):
    __tablename__ = "bulk_ship_items"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    uuid: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        index=True,
    )
    bult_ship_id: orm.Mapped[int] = orm.mapped_column(
        sa.Integer, sa.ForeignKey("bulk_ships.id")
    )
    store_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("stores.id"))
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    bulk_ship: orm.Mapped["BulkShip"] = orm.relationship(
        back_populates="items",
    )

    def __repr__(self):
        return f"<{self.id}>"
