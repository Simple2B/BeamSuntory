from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin
from .group import Group
from .adjust import Adjust


class AdjustGroupQty(db.Model, ModelMixin):
    __tablename__ = "adjusts_group_qty"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    quantity: orm.Mapped[int] = orm.mapped_column()
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    adjust_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("adjusts.id"))
    group: orm.Mapped[Group] = orm.relationship()
    adjust: orm.Mapped[Adjust] = orm.relationship()
