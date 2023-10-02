from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from app import schema as s
from .product import Product

if TYPE_CHECKING:
    from .ship_request import ShipRequest
    from .inbound_order import InboundOrder
    from .warehouse_product import WarehouseProduct
    from .adjusts_group_qty import AdjustGroupQty
    from .assign import Assign
    from .request_share import RequestShare


class ReportSKU(db.Model, ModelMixin):
    __tablename__ = "report_skus"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    # Foreign keys
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("inbound_orders.id"), nullable=True
    )
    ship_request_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("ship_requests.id"), nullable=True
    )
    adjustment_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("adjusts_group_qty.id"), nullable=True
    )
    assign_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("assigns.id"), nullable=True
    )
    share_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("request_share.id"), nullable=True
    )
    warehouse_product_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("warehouse_product.id"), nullable=True
    )
    product_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("products.id"))

    # Columns
    qty_before: orm.Mapped[int] = orm.mapped_column(sa.Integer, nullable=True)
    qty_after: orm.Mapped[int] = orm.mapped_column(sa.Integer, nullable=True)
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    status: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relationships
    product: orm.Mapped["Product"] = orm.relationship()
    inbound_order: orm.Mapped["InboundOrder"] = orm.relationship()
    ship_request: orm.Mapped["ShipRequest"] = orm.relationship()
    adjustment: orm.Mapped["AdjustGroupQty"] = orm.relationship()
    assign: orm.Mapped["Assign"] = orm.relationship()
    share: orm.Mapped["RequestShare"] = orm.relationship()
    warehouse_product: orm.Mapped["WarehouseProduct"] = orm.relationship()
    # TODO do we need events?
    # event: orm.Mapped["Event"] = orm.relationship() ##????

    @property
    def json(self):
        return s.ReportSKU.model_validate(self).model_dump_json(by_alias=True)
