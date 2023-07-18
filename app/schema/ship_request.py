from datetime import datetime
from pydantic import BaseModel


class ShipRequest(BaseModel):
    id: int
    order_numb: str
    status: str  # enum??
    order_type: str  # enum??? ask client
    supplier_id: int
    quantity: int

    created_at: datetime

    class Config:
        orm_mode = True
