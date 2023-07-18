from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin
from .store import Store
from .supplier import Supplier


class ShipRequest(db.Model, ModelMixin):
    __tablename__ = "ship_requests"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    order_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    status: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
    )
    store_category: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
    )
    order_type: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )  # TODO enum??? ask client
    # NOTE: should we add quantity?
    # quantity: orm.Mapped[int] = orm.mapped_column(
    #     sa.Integer,
    # )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    supplier_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("suppliers.id"))
    supplier: orm.Mapped[Supplier] = orm.relationship()
    # store_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("stores.id"))
    # store: orm.Mapped[Store] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.store_name}>"

    @property
    def json(self):
        mg = s.ShipRequest.from_orm(self)
        return mg.json()
