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
    created_at: datetime | None = Field(None, alias="createdAt")
    product: Product
    warehouse_id: int = Field(alias="warehouseProductId")
    warehouse: Warehouse | None = None
    group: Group | None = None


class WarehouseProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    product_quantity: int = Field(alias="productQuantity")
    warehouse_name: str | None = Field(None, alias="warehouseName")
    group_name: str | None = Field(None, alias="groupName")


class ReportInventoryProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    SKU: str
    name: str
    warehouse_products: list[WarehouseProduct] = Field(alias="warehouseProducts")


class ReportInventoryListResponse(ReportsBaseResponse):
    reports: list[ReportInventoryProduct]


ReportInventoryListArray = RootModel[list[ReportInventory]]
