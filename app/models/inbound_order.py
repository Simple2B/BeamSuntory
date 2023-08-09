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
from .group import Group
from .product_quantity_group import ProductQuantityGroup
from .package_info import PackageInfo
from .io_allocate_product import IOAllocateProduct


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
    delivery_date: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime)
    status: orm.Mapped[str] = orm.mapped_column(sa.String(64))

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    supplier_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("suppliers.id"))
    supplier: orm.Mapped[Supplier] = orm.relationship()
    delivery_agent_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("delivery_agents.id"), nullable=True
    )
    delivery_agent: orm.Mapped[DeliveryAgent] = orm.relationship()
    warehouse_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("warehouses.id"))
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    io_allocate_products: orm.Mapped[IOAllocateProduct] = orm.relationship(
        "IOAllocateProduct", backref="inbound_order", cascade="all, delete-orphan"
    )

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
        mg_dict["groups"] = [
            {
                "name": g.name,
                "id": g.id,
            }
            for g in db.session.execute(Group.select()).scalars()
        ]
        mg_dict["products"] = [
            {
                "name": p.name,
                "id": p.id,
            }
            for p in db.session.execute(Product.select()).scalars()
        ]

        mg_dict["sup_da_wh_prod_objs"] = {
            "supplier": current_io.supplier.name,
            "delivery_agent": current_io.delivery_agent.username,
            "warehouse": current_io.warehouse.name,
        }

        apqg: list[ProductQuantityGroup] = [
            io for io in db.session.execute(ProductQuantityGroup.select()).scalars()
        ]

        mg_dict["inbound_order_prods"] = {
            io.inbound_order.order_id: [
                {
                    "group": {"id": uio.group_id, "name": uio.parent.name},
                    "product": {
                        "id": uio.product_id,
                        "name": uio.child.name,
                        "SKU": uio.child.SKU,
                        "image": uio.child.image,
                    },
                    "quantity": uio.quantity,
                }
                for uio in apqg
                if uio.inbound_order.order_id == io.inbound_order.order_id
            ]
            for io in apqg
        }

        package: PackageInfo = db.session.execute(
            PackageInfo.select().where(PackageInfo.inbound_order_id == mg_dict["id"])
        ).scalar()
        mg_dict["package_info"] = (
            {
                "quantity_per_wrap": package.quantity_per_wrap,
                "quantity_wrap_carton": package.quantity_wrap_carton,
                "quantity_carton_master": package.quantity_carton_master,
            }
            if package
            else {
                "quantity_per_wrap": 0,
                "quantity_wrap_carton": 0,
                "quantity_carton_master": 0,
            }
        )
        return json.dumps(mg_dict)
