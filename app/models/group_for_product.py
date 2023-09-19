from datetime import datetime
from typing import TYPE_CHECKING

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s


# avoid circular import during initialization
if TYPE_CHECKING:
    from .master_group_for_product import MasterGroupProduct


class GroupProduct(db.Model, ModelMixin):
    __tablename__ = "groups_for_product"

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
        sa.ForeignKey("master_groups_for_product.id")
    )
    master_groups_for_product: orm.Mapped["MasterGroupProduct"] = orm.relationship(
        back_populates="groups_for_product"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        return s.GroupProduct.model_validate(self).model_dump_json()
