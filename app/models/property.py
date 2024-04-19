from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .master_group import MasterGroup


class Property(db.Model, ModelMixin):
    __tablename__ = "properties"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    master_group_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("master_groups.id")
    )
    master_group: orm.Mapped[MasterGroup] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.Property.model_validate(self).model_dump_json()
