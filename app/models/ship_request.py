from datetime import datetime
import json


import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin

from .cart import Cart
from .warehouse import Warehouse
from .store import Store


class ShipRequest(db.Model, ModelMixin):
    __tablename__ = "ship_requests"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    order_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    status: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
    )
    store_category: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
    )
    order_type: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )  # TODO enum??? ask client
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    warehouse_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("warehouses.id"))
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    store_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("stores.id"))
    store: orm.Mapped[Store] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.order_numb}>"

    @property
    def json(self):
        mg = s.ShipRequest.from_orm(self)
        ujs = mg.json()
        mg_dict = json.loads(ujs)
        mg_dict["current_order_carts"] = [
            {
                "name": cart.product.name,
                "SKU": cart.product.SKU,
                "price": cart.product.regular_price,
                "quantity": cart.quantity,
                "comment": cart.comments,
                "image": cart.product.image,
            }
            for cart in db.session.execute(
                Cart.select().where(Cart.order_numb == mg_dict["order_numb"])
            ).scalars()
        ]
        mg_dict["warehouse_name"] = self.warehouse.name
        return json.dumps(mg_dict)
