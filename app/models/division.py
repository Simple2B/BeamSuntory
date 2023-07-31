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
        unique=True,
        nullable=False,
    )
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    parent_role: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True)
    status: orm.Mapped[str] = orm.mapped_column(sa.String(64))

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.role_name}>"

    @property
    def json(self):
        mg = s.Division.from_orm(self)
        return mg.json()
