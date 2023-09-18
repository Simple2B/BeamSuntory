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
from .store_category import StoreCategory


class ShipRequest(db.Model, ModelMixin):
    __tablename__ = "ship_requests"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    order_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    status: orm.Mapped[s.ShipRequestStatus] = orm.mapped_column(
        sa.Enum(s.ShipRequestStatus),
    )
    store_category_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("store_categories.id")
    )
    store_category: orm.Mapped[StoreCategory] = orm.relationship()
    order_type: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )  # TODO enum??? ask client
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    comment: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    store_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("stores.id", ondelete="SET NULL"), nullable=True
    )
    store: orm.Mapped[Store] = orm.relationship()

    wm_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    da_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)

    def __repr__(self):
        return f"<{self.id}: {self.order_numb}>"

    @property
    def json(self):
        # TODO refactor !
        ujs = s.ShipRequest.model_validate(self).model_dump_json()
        mg_dict = json.loads(ujs)
        mg_dict["current_order_carts"] = [
            {
                "id": cart.product.id,
                "name": cart.product.name,
                "SKU": cart.product.SKU,
                "regular_price": cart.product.regular_price,
                "retail_price": cart.product.retail_price,
                "quantity": cart.quantity,
                "image": cart.product.image,
                "group": cart.group,
                "warehouse": {"id": cart.warehouse_id, "name": cart.warehouse.name}
                if cart.warehouse_id
                else None,
            }
            for cart in db.session.scalars(
                Cart.select().where(Cart.order_numb == mg_dict["order_numb"])
            )
        ]
        mg_dict["warehouses"] = [
            {"name": w.name, "id": w.id, "products_ids": []}
            for w in db.session.execute(Warehouse.select()).scalars()
        ]

        for wh_prod in db.session.execute(WarehouseProduct.select()).scalars():
            for warehouse in mg_dict["warehouses"]:
                if warehouse["id"] == wh_prod.warehouse_id:
                    warehouse["products_ids"].append(wh_prod.product_id)

        return json.dumps(mg_dict)
