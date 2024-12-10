from datetime import datetime
from typing import List

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .billable_group import BillableGroup


class MasterBillableGroup(db.Model, ModelMixin):
    __tablename__ = "master_billable_groups"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    billable_groups: orm.Mapped[List["BillableGroup"]] = orm.relationship(
        "BillableGroup",
        back_populates="master_billable_group",
        order_by="BillableGroup.name.asc()",
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.MasterBillableGroup.model_validate(self).model_dump_json()
