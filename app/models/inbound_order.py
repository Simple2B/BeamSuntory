from datetime import datetime, date

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s
from .supplier import Supplier
from .warehouse import Warehouse
from .product_allocated import ProductAllocated


def generate_order_id_timestamp():
    return f"IO-BEAM-{int(datetime.now().timestamp())}"


class InboundOrder(db.Model, ModelMixin):
    __tablename__ = "inbound_orders"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    uuid: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        index=True,
    )
    title: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )

    order_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
        default=generate_order_id_timestamp,
    )

    active_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    active_time: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    delivery_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    status: orm.Mapped[s.InboundOrderStatus] = orm.mapped_column(
        sa.Enum(s.InboundOrderStatus),
        default=s.InboundOrderStatus.draft,
    )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    supplier_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("suppliers.id"))
    supplier: orm.Mapped[Supplier] = orm.relationship()
    warehouse_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("warehouses.id"))
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    products_allocated: orm.Mapped[list[ProductAllocated]] = orm.relationship(
        cascade="all, delete-orphan"
    )

    wm_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    da_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)

    def __repr__(self):
        return f"<{self.id}: {self.order_id}>"

    @property
    def json(self):
        return s.InboundOrder.from_orm(self).json(by_alias=True)
