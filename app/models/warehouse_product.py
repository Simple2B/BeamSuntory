from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .warehouse import Warehouse
    from .group_for_product import GroupProduct

else:
    Product = "Product"
    Warehouse = "Warehouse"
    GroupProduct = "GroupProduct"


class WarehouseProduct(db.Model, ModelMixin):
    __tablename__ = "warehouse_product"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    warehouse_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("warehouses.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups_for_product.id"))
    group: orm.Mapped[GroupProduct] = orm.relationship()
    product: orm.Mapped[Product] = orm.relationship()
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    product_quantity: orm.Mapped[int] = orm.mapped_column(nullable=False)

    @property
    def json(self):
        mg = s.WarehouseProduct.from_orm(self)
        return mg.json()
