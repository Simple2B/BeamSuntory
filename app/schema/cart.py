from datetime import datetime
from pydantic import BaseModel


class Cart(BaseModel):
    id: int
    product_id: int
    status: str
    quantity: int
    user_id: int

    created_at: datetime

    class Config:
        orm_mode = True
