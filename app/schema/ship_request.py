from datetime import datetime
from pydantic import BaseModel


class ShipRequest(BaseModel):
    id: int
    order_numb: str
    status: str  # enum??
    order_type: str  # enum??? ask client
    store_id: int
    warehouse_id: int
    comment: str | None

    created_at: datetime

    class Config:
        orm_mode = True
