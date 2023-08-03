from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .group_for_product import GroupProduct
    from .inbound_order import InboundOrder

else:
    Product = "Product"
    GroupProduct = "GroupProduct"
    InboundOrder = "InboundOrder"


class ProductQuantityGroup(db.Model, ModelMixin):
    __tablename__ = "product_quantity_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups_for_product.id"))
    child: orm.Mapped[Product] = orm.relationship()
    parent: orm.Mapped[GroupProduct] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column()
    # NOTE: quantity after incoming stock is received
    quantity_received: orm.Mapped[int] = orm.mapped_column(nullable=True)
    warehouse_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("warehouses.id"))
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("inbound_orders.id")
    )
    inbound_order: orm.Mapped[InboundOrder] = orm.relationship()

    @property
    def json(self):
        mg = s.ProductGroup.from_orm(self)
        return mg.json()
