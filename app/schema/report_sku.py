from enum import Enum
from datetime import datetime
from pydantic import BaseModel, RootModel, ConfigDict, Field
from .ship_request import ShipRequest
from .inbound_order import InboundOrder
from .warehouse_product import WarehouseProduct
from .adjust import Adjust
from .assign import Assign
from .request_share import RequestShare
from .pagination import PaginationOut
from .product import Product


class ReportSKUType(Enum):
    inbound_order = "Inbound Order"
    ship_request = "Ship Request"
    adjustment = "Adjustment"
    assign = "Assign"
    share = "Share"


class ReportSKU(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    qty_before: int | None = Field(alias="qtyBefore", default=None)
    qty_after: int | None = Field(alias="qtyAfter", default=None)
    type: str
    status: str
    created_at: datetime = Field(alias="createdAt")

    # Relationships
    product: Product | None = None
    inbound_orders: list[InboundOrder] | None = Field(
        alias="inboundOrders", default=None
    )
    ship_requests: list[ShipRequest] | None = Field(alias="shipRequests", default=None)
    adjustments: list[Adjust] | None = None
    assigns: list[Assign] | None = None
    shares: list[RequestShare] | None = Field(alias="shareRequests", default=None)
    warehouse_products: list[WarehouseProduct] | None = Field(
        alias="warehouseProducts", default=None
    )


class ReportSKUResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    pagination: PaginationOut
    report_sku_list: list[ReportSKU] = Field(alias="reportSKUList")


ReportSKUList = RootModel[list[ReportSKU]]
