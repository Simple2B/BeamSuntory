from enum import Enum
from datetime import datetime
from pydantic import BaseModel, RootModel, ConfigDict, Field
from .warehouse import Warehouse
from .group import Group
from .product import Product
from .report import ReportsBaseResponse


class ReportInventoryType(Enum):
    created: str = "Created"
    updated: str = "Updated"


class ReportInventory(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    created_at: datetime = Field(alias="createdAt")
    product: Product
    warehouse_id: int = Field(alias="warehouseProductId")
    warehouse: Warehouse | None = None
    group: Group | None = None


class ReportInventoryListResponse(ReportsBaseResponse):
    reports: list[ReportInventory]


ReportInventoryListArray = RootModel[list[ReportInventory]]
