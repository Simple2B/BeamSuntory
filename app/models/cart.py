from typing import TYPE_CHECKING
from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin

if TYPE_CHECKING:
    from .product import Product
    from .warehouse_product import WarehouseProduct
    from .warehouse import Warehouse
    from .event import Event
    from .ship_request import ShipRequest
    from .group import Group


class Cart(db.Model, ModelMixin):
    __tablename__ = "carts"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # ForeignKey
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    warehouse_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("warehouses.id"), nullable=True
    )
    ship_request_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("ship_requests.id")
    )
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))

    # this filed is just instens of warehouse_product but to get the available quantity
    from_warehouse_product_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("warehouse_product.id")
    )

    # Column
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    order_numb: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True)
    status: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), default="pending"
    )  # in progress, completed, removed
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    note_location: orm.Mapped[str] = orm.mapped_column(sa.String(512), default="")

    # Relationship
    product: orm.Mapped["Product"] = orm.relationship()
    warehouse: orm.Mapped["Warehouse"] = orm.relationship()
    from_warehouse_product: orm.Mapped["WarehouseProduct"] = orm.relationship()
    ship_request: orm.Mapped["ShipRequest"] = orm.relationship(back_populates="carts")
    event: orm.Mapped["Event"] = orm.relationship()
    group: orm.Mapped["Group"] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.product_id}>"

    @property
    def available_quantity(self):
        if self.from_warehouse_product:
            return self.from_warehouse_product.available_quantity
        return 0

    @property
    def json(self):
        cart = s.Cart.model_validate(self)
        ujs = cart.model_dump_json()
        mg_dict = json.loads(ujs)
        warehouse_products = db.session.execute(
            WarehouseProduct.select().where(
                WarehouseProduct.product_id == self.product_id
            )
        ).scalars()

        mg_dict["available_quantity"] = (
            {wp.group.name: wp.product_quantity for wp in warehouse_products}
            if warehouse_products
            else {}
        )
        return json.dumps(mg_dict)
