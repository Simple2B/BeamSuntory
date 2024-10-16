from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s


class Division(db.Model, ModelMixin):
    __tablename__ = "divisions"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    role_name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    label_role_name: orm.Mapped[str | None] = orm.mapped_column(
        sa.String(64),
    )
    activated: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    def __repr__(self):
        return f"<{self.id}: {self.role_name}>"

    @property
    def json(self):
        return s.Division.model_validate(self).model_dump_json()
