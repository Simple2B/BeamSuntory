from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s


class ProductCategory(db.Model, ModelMixin):
    __tablename__ = "product_categories"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    description: orm.Mapped[str] = orm.mapped_column(sa.String(258))
    active: orm.Mapped[bool] = orm.mapped_column(sa.Boolean())
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.ProductCategory.model_validate(self).model_dump_json()
