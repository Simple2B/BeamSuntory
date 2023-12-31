from typing import TYPE_CHECKING
from datetime import datetime
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .warehouse import Warehouse
    from .group import Group

else:
    Product = "Product"
    Warehouse = "Warehouse"
    Group = "Group"


class WarehouseProduct(db.Model, ModelMixin):
    __tablename__ = "warehouse_product"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    # Foreign keys
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    warehouse_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("warehouses.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    # Columns
    product_quantity: orm.Mapped[int] = orm.mapped_column(nullable=False)
    created_at: orm.Mapped[datetime | None] = orm.mapped_column(
        default=datetime.now
    )
    # Relations
    # TODO remove all relations
    group: orm.Mapped[Group] = orm.relationship()
    product: orm.Mapped[Product] = orm.relationship()
    warehouse: orm.Mapped[Warehouse] = orm.relationship()

    @property
    def json(self):
        return s.WarehouseProduct.model_validate(self).model_dump_json()
