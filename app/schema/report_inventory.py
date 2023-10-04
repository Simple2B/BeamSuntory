from enum import Enum
from datetime import datetime
from pydantic import BaseModel, RootModel, ConfigDict, Field
from .ship_request import ShipRequest
from .inbound_order import InboundOrder
from .warehouse import Warehouse
from .store import Store
from .user import User
from .product import Product
from .report import ReportsBaseResponse


class ReportInventoryType(Enum):
    created: str = "Created"
    updated: str = "Updated"


class ReportInventory(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    qty_before: int = Field(alias="qtyBefore")
    qty_after: int = Field(alias="qtyAfter")
    created_at: datetime = Field(alias="createdAt")
    product: Product
    warehouse_product_id: int = Field(alias="warehouseProductId")


class ReportInventoryList(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    type: str
    user: User
    created_at: datetime = Field(alias="createdAt")
    ship_request: ShipRequest | None = Field(alias="shipRequest", default=None)
    inbound_order: InboundOrder | None = Field(alias="InboundOrder", default=None)
    warehouse: Warehouse | None = None
    store: Store | None = None
    report_inventories: list[ReportInventory] = Field(alias="reportInventories")


class ReportInventoryListResponse(ReportsBaseResponse):
    reports: list[ReportInventoryList]


ReportInventoryListArray = RootModel[list[ReportInventoryList]]
