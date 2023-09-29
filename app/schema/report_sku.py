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
    qty_before: int = Field(alias="qtyBefore")
    qty_after: int = Field(alias="qtyAfter")
    type: str
    status: str
    created_at: datetime = Field(alias="createdAt")

    # Relationships
    product: Product
    inbound_orders: list[InboundOrder] = Field(alias="inboundOrders")
    ship_requests: list[ShipRequest] = Field(alias="shipRequests")
    adjustments: list[Adjust]
    assigns: list[Assign]
    shares: list[RequestShare] = Field(alias="shareRequests")
    warehouse_products: list[WarehouseProduct] = Field(alias="warehouseProducts")


class ReportSKUResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    pagination: PaginationOut
    report_sku_list: list[ReportSKU] = Field(alias="reportSKUList")


ReportSKUList = RootModel[list[ReportSKU]]
