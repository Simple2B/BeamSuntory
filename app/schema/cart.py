from datetime import datetime
from pydantic import BaseModel
from .product import Product


class Cart(BaseModel):
    id: int
    product_id: int
    status: str
    quantity: int
    user_id: int
    product: Product

    created_at: datetime

    class Config:
        orm_mode = True
