import enum
from typing import List
from pydantic import BaseModel, ConfigDict, Field, TypeAdapter


class BulkShipStatus(enum.Enum):
    DRAFT = "DRAFT"
    SHIPPED = "SHIPPED"


class AvailableQtyRes(BaseModel):
    available_qty: int = Field(alias="availableQty")


class BulkShipItem(BaseModel):
    group_id: int = Field(alias="groupId")
    product_sku: str = Field(alias="productSKU")
    qty: int = Field(gt=0)
    store_id: int = Field(alias="storeId")

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


bulk_ship_items_ad = TypeAdapter(list[BulkShipItem])
