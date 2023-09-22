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


class Cart(db.Model, ModelMixin):
    __tablename__ = "carts"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    product: orm.Mapped["Product"] = orm.relationship()
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)
    status: orm.Mapped[str] = orm.mapped_column(
        sa.String(64), default="pending"
    )  # in progress, completed, removed
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    warehouse_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("warehouses.id"), nullable=True
    )
    warehouse: orm.Mapped["Warehouse"] = orm.relationship()
    order_numb: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True)
    # TODO replace with group_id
    group: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    ship_request_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("ship_requests.id"), nullable=True
    )

    ship_request: orm.Mapped["ShipRequest"] = orm.relationship()
    event: orm.Mapped["Event"] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.product_id}>"

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
