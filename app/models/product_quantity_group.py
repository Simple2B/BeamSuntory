from typing import TYPE_CHECKING
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin


if TYPE_CHECKING:
    from .group import Group


class ProductQuantityGroup(db.Model, ModelMixin):
    __tablename__ = "product_quantity_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped["Group"] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    quantity_received: orm.Mapped[int] = orm.mapped_column(nullable=True)

    product_allocated_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("products_allocated.id")
    )
