from enum import Enum
from datetime import datetime, date
from pydantic import BaseModel, Field, ConfigDict
from .supplier import Supplier
from .warehouse import Warehouse
from .product_allocated import ProductAllocatedOut


class InboundOrderStatus(Enum):
    draft = "Draft"
    assigned = "Assigned to pickup"
    delivered = "Delivered"
    in_transit = "In transit"
    cancelled = "Cancelled"


class InboundOrder(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    uuid: str
    order_id: str = Field(alias="orderId")
    active_date: date = Field(alias="activeDate")
    active_time: str = Field(alias="activeTime")
    title: str
    delivery_date: date = Field(alias="deliveryDate")
    status: InboundOrderStatus

    supplier: Supplier
    warehouse: Warehouse

    products_allocated: list[ProductAllocatedOut] = Field(alias="productsAllocated")

    supplier_id: int
    warehouse_id: int

    wm_notes: str | None = Field(alias="wmNotes")
    da_notes: str | None = Field(alias="daNotes")

    created_at: datetime = Field(alias="createdAt")


class FilterInboundOrder(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    status: str | None = None
