from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from app import schema as s

if TYPE_CHECKING:
    from .user import User
    from .inbound_order import InboundOrder


class ReportInboundOrder(db.Model, ModelMixin):
    __tablename__ = "report_inbound_orders"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("inbound_orders.id")
    )

    # Columns
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    history: orm.Mapped[str] = orm.mapped_column(sa.Text, default="")
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relationships
    inbound_order: orm.Mapped["InboundOrder"] = orm.relationship()
    user: orm.Mapped["User"] = orm.relationship()

    @property
    def json(self):
        return s.ReportInboundOrder.model_validate(self).model_dump_json(by_alias=True)
