from datetime import datetime
from pydantic import BaseModel


class InboundOrder(BaseModel):
    id: int
    order_id: str
    active_date: datetime
    active_time: datetime
    item_type: str
    quontity: int  # TODO enum??
    created_at: datetime

    class Config:
        orm_mode = True
