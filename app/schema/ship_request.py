from enum import Enum
from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ShipRequestStatus(Enum):
    waiting_for_warehouse = "Waiting for warehouse manager"
    assigned = "Assigned to pickup"
    delivered = "Delivered"
    in_transit = "In transit"
    cancelled = "Cancelled"


class ShipRequest(BaseModel):
    id: int
    order_numb: str
    status: ShipRequestStatus
    order_type: str  # enum??? ask client
    store_id: int
    warehouse_id: Optional[int]
    comment: str | None
    wm_notes: Optional[str]
    da_notes: Optional[str]

    created_at: datetime

    class Config:
        orm_mode = True
