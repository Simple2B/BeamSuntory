from typing import TYPE_CHECKING
from datetime import datetime
from sqlalchemy import ForeignKey, orm
import sqlalchemy as sa

from app import schema as s
from app.database import db
from .utils import ModelMixin
from .cart import Cart


# avoid circular import during initialization
if TYPE_CHECKING:
    from .product import Product
    from .warehouse import Warehouse
    from .group import Group


class WarehouseProduct(db.Model, ModelMixin):
    __tablename__ = "warehouse_product"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    # Foreign keys
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    warehouse_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("warehouses.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    # Columns
    product_quantity: orm.Mapped[int] = orm.mapped_column(nullable=False)
    created_at: orm.Mapped[datetime | None] = orm.mapped_column(default=datetime.now)
    # Relations
    # TODO remove all relations
    group: orm.Mapped["Group"] = orm.relationship()
    product: orm.Mapped["Product"] = orm.relationship()
    warehouse: orm.Mapped["Warehouse"] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.product_id}>"

    @property
    def warehouse_name(self):
        return self.warehouse.name

    @property
    def group_name(self):
        return self.group.name

    @property
    def master_group_name(self):
        return self.group.master_group.name

    @property
    def available_quantity(self):
        available_quantity = (
            db.session.execute(
                sa.select(sa.func.sum(type(self).product_quantity)).where(
                    type(self).product_id == self.product_id,
                    type(self).group_id == self.group_id,
                )
            ).scalar()
            or 0
        )

        cart_item_sum = (
            db.session.execute(
                sa.select(sa.func.sum(Cart.quantity)).where(
                    Cart.product_id == self.product_id,
                    Cart.group_id == self.group_id,
                    Cart.status == s.CartStatus.SUBMITTED.value,
                )
            ).scalar()
            or 0
        )

        return available_quantity - cart_item_sum

    @property
    def json(self):
        return s.WarehouseProduct.model_validate(self).model_dump_json()
