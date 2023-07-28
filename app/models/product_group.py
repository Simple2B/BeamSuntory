from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .group_for_product import GroupProduct

else:
    Product = "Product"
    GroupProduct = "GroupProduct"


class ProductGroup(db.Model, ModelMixin):
    __tablename__ = "product_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups_for_product.id"))
    child: orm.Mapped[Product] = orm.relationship(overlaps="child")
    # TODO is overlaps="user_obj" correct decision? remove it to see the warning
    parent: orm.Mapped[GroupProduct] = orm.relationship()

    @property
    def json(self):
        mg = s.ProductGroup.from_orm(self)
        return mg.json()
