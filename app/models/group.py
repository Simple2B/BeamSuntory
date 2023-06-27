from datetime import datetime
from typing import List, TYPE_CHECKING

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .user_group import UserGroup


if TYPE_CHECKING:
    from .master_group import MasterGroup
else:
    MasterGroup = "MasterGroup"


class Group(db.Model, ModelMixin):
    __tablename__ = "groups"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    master_group_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("master_groups.id")
    )
    master_groups: orm.Mapped[MasterGroup] = orm.relationship(back_populates="groups")
    user_obj: orm.Mapped[List[UserGroup]] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.Group.from_orm(self)
        return mg.json()
