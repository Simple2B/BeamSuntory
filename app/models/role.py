from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s


class Role(db.Model, ModelMixin):
    __tablename__ = "roles"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Columns
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
    )
    activated: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.Division.model_validate(self).model_dump_json()
