from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from .supplier import Supplier
from .delivery_agent import DeliveryAgent
from .warehouse import Warehouse
from .product import Product


class InboundOrder(db.Model, ModelMixin):
    __tablename__ = "inbound_orders"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    order_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    active_date: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime)
    active_time: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    order_title: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    quantity: orm.Mapped[int] = orm.mapped_column()
    delivery_date: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime)
    status: orm.Mapped[str] = orm.mapped_column(sa.String(64))

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    supplier_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("suppliers.id"))
    supplier: orm.Mapped[Supplier] = orm.relationship()
    delivery_agent_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("delivery_agents.id")
    )
    delivery_agent: orm.Mapped[DeliveryAgent] = orm.relationship()
    warehouse_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("warehouses.id"))
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))
    product: orm.Mapped[Product] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.order_id}>"

    @property
    def json(self):
        mg = s.InboundOrder.from_orm(self)
        ujs = mg.json()
        mg_dict = json.loads(ujs)
        current_io: InboundOrder = db.session.execute(
            InboundOrder.select().where(InboundOrder.id == mg_dict["id"])
        ).scalar()

        mg_dict["sup_da_wh_prod_objs"] = {
            "supplier": current_io.supplier.name,
            "delivery_agent": current_io.delivery_agent.username,
            "warehouse": current_io.warehouse.name,
            "product": current_io.product.name,
        }
        return json.dumps(mg_dict)
