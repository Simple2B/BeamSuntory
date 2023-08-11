from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin


class StoreCategory(db.Model, ModelMixin):
    __tablename__ = "store_categories"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    parent_category: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=True,
    )
    active: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean,
        nullable=False,
    )
    image: orm.Mapped[str] = orm.mapped_column(
        sa.Text(),
        nullable=True,
    )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.StoreCategory.from_orm(self)
        return mg.json()
