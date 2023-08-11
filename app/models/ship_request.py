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
from .warehouse_product import WarehouseProduct


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
    comment: orm.Mapped[str] = orm.mapped_column(
        sa.String(256), default="", nullable=True
    )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    warehouse_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("warehouses.id"), nullable=True
    )
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
                "id": cart.product.id,
                "name": cart.product.name,
                "SKU": cart.product.SKU,
                "price": cart.product.price,
                "quantity": cart.quantity,
                "image": cart.product.image,
            }
            for cart in db.session.execute(
                Cart.select().where(Cart.order_numb == mg_dict["order_numb"])
            ).scalars()
        ]
        # TODO: check if "No warehouse" causes problems
        mg_dict["warehouse_name"] = (
            self.warehouse.name if self.warehouse else "No warehouse"
        )
        mg_dict["warehouses"] = [
            {"name": w.name, "id": w.id, "products_ids": []}
            for w in db.session.execute(Warehouse.select()).scalars()
        ]

        for wh_prod in db.session.execute(WarehouseProduct.select()).scalars():
            for warehouse in mg_dict["warehouses"]:
                if warehouse["id"] == wh_prod.warehouse_id:
                    warehouse["products_ids"].append(wh_prod.product_id)

        return json.dumps(mg_dict)
