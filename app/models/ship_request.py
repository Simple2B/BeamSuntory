from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin

from .cart import Cart
from .store import Store
from .store_category import StoreCategory
from .report_event import ReportEvent
from .utils import generate_uuid


class ShipRequest(db.Model, ModelMixin):
    __tablename__ = "ship_requests"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    store_category_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("store_categories.id")
    )
    store_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("stores.id", ondelete="SET NULL"), nullable=True
    )
    user_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    report_event_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("report_events.id", ondelete="SET NULL"), nullable=True
    )

    # Columns
    order_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        nullable=False,
    )
    order_type: orm.Mapped[str] = orm.mapped_column(
        sa.String(128),
        nullable=False,
    )
    status: orm.Mapped[s.ShipRequestStatus] = orm.mapped_column(
        sa.Enum(s.ShipRequestStatus),
    )
    comment: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
    wm_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    da_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)

    # Relationships
    carts: orm.Mapped[list["Cart"]] = orm.relationship(back_populates="ship_request")
    store: orm.Mapped[Store] = orm.relationship()
    store_category: orm.Mapped[StoreCategory] = orm.relationship()
    report_event: orm.Mapped["ReportEvent"] = orm.relationship(
        back_populates="ship_request"
    )

    def __repr__(self):
        return f"<{self.id}: {self.order_numb}>"

    @property
    def json(self):
        ship_request = s.ShipRequest.model_validate(self).model_dump()

        return s.ShipRequest.model_validate(ship_request).model_dump_json(by_alias=True)
