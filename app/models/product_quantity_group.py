from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .group import Group

else:
    Product = "Product"
    Group = "Group"


class ProductQuantityGroup(db.Model, ModelMixin):
    __tablename__ = "product_quantity_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    child: orm.Mapped[Product] = orm.relationship()
    parent: orm.Mapped[Group] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column()
    warehouse_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("warehouses.id"))

    @property
    def json(self):
        mg = s.ProductGroup.from_orm(self)
        return mg.json()
