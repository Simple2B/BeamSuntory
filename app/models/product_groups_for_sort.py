from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .group_for_product import GroupProduct

else:
    Product = "Product"
    GroupProduct = "GroupProduct"


class ProductGroup(db.Model, ModelMixin):
    __tablename__ = "product_groups_for_sort"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups_for_product.id"))
    product: orm.Mapped[Product] = orm.relationship()
    group_for_product: orm.Mapped[GroupProduct] = orm.relationship()
