from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .product import Product
from .event import Event


class Cart(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    status: str
    group: str
    quantity: int
    user_id: int = Field(alias="userId")
    product: Product
    event: Event | None = None

    created_at: datetime
