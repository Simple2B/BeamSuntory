from datetime import datetime, date

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s
from .supplier import Supplier
from .warehouse import Warehouse
from .product_allocated import ProductAllocated
from .report_inventory import ReportInventoryList
from .utils import START_ORDER_NUMBER


class InboundOrder(db.Model, ModelMixin):
    __tablename__ = "inbound_orders"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    supplier_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("suppliers.id"))
    warehouse_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("warehouses.id"))
    report_inventory_list_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("report_inventory_lists.id"), nullable=True
    )

    # Columns
    uuid: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        index=True,
    )
    title: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    order_id: orm.Mapped[str | None] = orm.mapped_column(
        sa.String(64),
    )
    active_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    active_time: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    delivery_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    status: orm.Mapped[s.InboundOrderStatus] = orm.mapped_column(
        sa.Enum(s.InboundOrderStatus),
        default=s.InboundOrderStatus.draft,
    )
    wm_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    da_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    proof_of_delivery: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")
    tracking: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relationships
    supplier: orm.Mapped[Supplier] = orm.relationship()
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    products_allocated: orm.Mapped[list[ProductAllocated]] = orm.relationship(
        cascade="all, delete-orphan", overlaps="inbound_order"
    )
    report_inventory_list: orm.Mapped["ReportInventoryList"] = orm.relationship(
        back_populates="inbound_order"
    )

    @property
    def finished_date(self):
        if not self.report_inventory_list:
            return self.status
        return self.report_inventory_list.created_at.strftime("%Y-%m-%d")

    def set_order_id(self):
        self.order_id = f"Beam-IB-{START_ORDER_NUMBER + self.id}"

    def __repr__(self):
        return f"<{self.id}: {self.order_id}>"

    @property
    def json(self):
        return s.InboundOrder.model_validate(self).model_dump_json(by_alias=True)
