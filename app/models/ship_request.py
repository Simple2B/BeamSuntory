from typing import TYPE_CHECKING, List
from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import START_ORDER_NUMBER, ModelMixin

from .cart import Cart
from .store import Store
from .user import User
from .store_category import StoreCategory
from .report_event import ReportEvent
from .utils import generate_uuid
from .report_inventory import ReportInventoryList


if TYPE_CHECKING:
    from .report_shipping import ReportShipping


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
    report_inventory_list_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("report_inventory_lists.id"), nullable=True
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
        default=datetime.now,
    )
    wm_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    da_notes: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    proof_of_delivery: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")
    tracking: orm.Mapped[str | None] = orm.mapped_column(sa.Text(), default="")

    # Relationships
    carts: orm.Mapped[list["Cart"]] = orm.relationship(back_populates="ship_request")
    store: orm.Mapped[Store] = orm.relationship()
    store_category: orm.Mapped[StoreCategory] = orm.relationship()
    reports_event: orm.Mapped[list["ReportEvent"]] = orm.relationship(
        back_populates="ship_request"
    )
    report_inventory_list: orm.Mapped["ReportInventoryList"] = orm.relationship(
        back_populates="ship_request"
    )

    reports: orm.Mapped[List["ReportShipping"]] = orm.relationship(
        back_populates="ship_request"
    )
    user: orm.Mapped[User] = orm.relationship()

    @property
    def date_picked_up(self):
        if not self.reports:
            return "-"

        for report in self.reports:
            if report.type == s.ReportShipRequestActionType.PICKED_UP.value:
                return report.created_at.strftime("%m/%d/%Y")

        return self.reports[-1].type

    @property
    def date_delivered(self):
        if not self.reports:
            return "-"

        for report in self.reports:
            if report.type == s.ReportShipRequestActionType.DELIVERED.value:
                return report.created_at.strftime("%m/%d/%Y")

        return self.reports[-1].type

    def set_order_numb(self):
        self.order_numb = f"Beam-OB-{START_ORDER_NUMBER + self.id}"

    def __repr__(self):
        return f"<{self.id}: {self.order_numb}>"

    @property
    def json(self):
        return s.ShipRequest.model_validate(self).model_dump_json(by_alias=True)
