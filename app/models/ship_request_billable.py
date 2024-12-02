from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app.models.utils import ModelMixin
from app import models as m


class ShipRequestBillable(db.Model, ModelMixin):
    __tablename__ = "ship_request_billables"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    billable_group_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("billable_groups.id", ondelete="SET NULL"), nullable=True
    )
    ship_request_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("ship_requests.id", ondelete="SET NULL"), nullable=True
    )
    inbound_order_id: orm.Mapped[int | None] = orm.mapped_column(
        sa.ForeignKey("inbound_orders.id", ondelete="SET NULL"), nullable=True
    )
    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer, nullable=False)
    total: orm.Mapped[float] = orm.mapped_column(sa.Float, nullable=False)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    incoming: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean, nullable=False, default=False
    )

    ship_request = orm.relationship(
        "ShipRequest", back_populates="ship_request_billables"
    )
    inbound_order = orm.relationship(
        "InboundOrder", back_populates="ship_request_billables"
    )

    @property
    def master_billable_group_id(self):
        billable_group = db.session.scalar(
            sa.select(m.BillableGroup).where(
                m.BillableGroup.id == self.billable_group_id
            )
        )
        return billable_group.master_billable_group_id

    @property
    def master_billable_group_name(self):
        billable_group = db.session.scalar(
            sa.select(m.BillableGroup).where(
                m.BillableGroup.id == self.billable_group_id
            )
        )
        return billable_group.master_billable_group.name

    @property
    def billable_group_name(self):
        billable_group = db.session.scalar(
            sa.select(m.BillableGroup).where(
                m.BillableGroup.id == self.billable_group_id
            )
        )
        return billable_group.name

    def __repr__(self):
        return f"<{self.id}: {self.incoming}>"
