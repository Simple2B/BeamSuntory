from datetime import datetime
from typing import List

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from app import models as m


class MasterGroupProduct(db.Model, ModelMixin):
    __tablename__ = "master_groups_for_product"

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

    groups_for_product: orm.Mapped[List[m.GroupProduct]] = orm.relationship(
        back_populates="master_groups_for_product"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.MasterGroupProduct.from_orm(self)
        return mg.json()
