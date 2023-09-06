from enum import Enum
from datetime import datetime, date
from pydantic import BaseModel, Field
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

    created_at: datetime

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
