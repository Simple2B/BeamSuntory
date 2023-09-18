from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .product import Product


class Cart(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    status: str
    quantity: int
    user_id: int = Field(alias="userId")
    product: Product

    created_at: datetime
