from datetime import datetime
from typing import List, TYPE_CHECKING

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s

if TYPE_CHECKING:
    from .master_group import MasterGroup
    from .user_group import UserGroup
    from .warehouse_product import WarehouseProduct


class Group(db.Model, ModelMixin):
    __tablename__ = "groups"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign Keys
    master_group_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("master_groups.id")
    )
    parent_group_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("groups.id"),
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
    master_group: orm.Mapped["MasterGroup"] = orm.relationship(back_populates="groups")
    parent_group: orm.Mapped["Group"] = orm.relationship(
        "Group",
        back_populates="child_groups",
        remote_side=[id],
    )
    child_groups: orm.Mapped[List["Group"]] = orm.relationship(
        "Group",
        back_populates="parent_group",
        remote_side=[parent_group_id],
    )
    # TODO refactor add users relationship through secondary
    user_obj: orm.Mapped[List["UserGroup"]] = orm.relationship()

    warehouse_product: orm.Mapped[List["WarehouseProduct"]] = orm.relationship(
        viewonly=True
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.Group.model_validate(self).model_dump_json()
