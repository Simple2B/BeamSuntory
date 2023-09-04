from enum import Enum
from datetime import datetime, date
from pydantic import BaseModel


class InboundOrderStatus(Enum):
    draft = "Draft"
    assigned = "Assigned to pickup"
    delivered = "Delivered"
    in_transit = "In transit"
    cancelled = "Cancelled"


class InboundOrder(BaseModel):
    id: int
    order_id: str
    active_date: date
    active_time: str
    order_title: str
    delivery_date: date
    status: InboundOrderStatus
    supplier_id: int
    warehouse_id: int
    created_at: datetime

    class Config:
        orm_mode = True
