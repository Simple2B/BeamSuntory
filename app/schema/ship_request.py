from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class ShipRequest(BaseModel):
    id: int
    order_numb: str
    status: str  # enum??
    order_type: str  # enum??? ask client
    store_id: Optional[int]
    warehouse_id: Optional[int]
    comment: str | None

    created_at: datetime

    class Config:
        orm_mode = True
