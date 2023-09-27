from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin
from .group import Group
from .warehouse import Warehouse
from .product import Product


class AdjustGroupQty(db.Model, ModelMixin):
    __tablename__ = "adjusts_group_qty"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    # Foreign keys
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    adjust_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("adjusts.id"))
    warehouse_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("warehouses.id"))
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    # Columns
    quantity_after: orm.Mapped[int] = orm.mapped_column()
    quantity_before: orm.Mapped[int] = orm.mapped_column()
    # Relationships
    group: orm.Mapped[Group] = orm.relationship()
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    product: orm.Mapped[Product] = orm.relationship()
