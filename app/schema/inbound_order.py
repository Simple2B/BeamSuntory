from datetime import datetime
from pydantic import BaseModel


class InboundOrder(BaseModel):
    id: int
    order_id: str
    active_date: datetime
    active_time: datetime
    order_title: str
    quantity: int
    delivery_date: datetime
    status: str
    supplier_id: int
    delivery_agent_id: int
    warehouse_id: int
    product_id: int
    created_at: datetime

    class Config:
        orm_mode = True
