from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .group import Group

else:
    Product = "Product"
    Group = "Group"


class ProductGroup(db.Model, ModelMixin):
    __tablename__ = "product_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    child: orm.Mapped[Product] = orm.relationship()
    parent: orm.Mapped[Group] = orm.relationship()