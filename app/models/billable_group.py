from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from enum import Enum
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .master_billable_group import MasterBillableGroup


class AssignedTo(Enum):
    inbound = "inbound"
    outbound = "outbound"


class BillableGroup(db.Model, ModelMixin):
    __tablename__ = "billable_groups"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=False)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    rate: orm.Mapped[float] = orm.mapped_column(sa.Float)

    assigned_to_inbound: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    assigned_to_outbound: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean, default=False
    )
    excluded_from_global_increase: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean, default=False, server_default=sa.sql.expression.false()
    )

    master_billable_group_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("master_billable_groups.id")
    )
    master_billable_group: orm.Mapped["MasterBillableGroup"] = orm.relationship(
        "MasterBillableGroup", back_populates="billable_groups"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.BillableGroup.model_validate(self).model_dump_json()

    @property
    def master_billable_group_name(self):
        return self.master_billable_group.name
