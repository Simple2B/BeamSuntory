from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .product import Product
from .warehouse import Warehouse


class Cart(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    status: str
    group: str
    quantity: int
    user_id: int = Field(alias="userId")
    group: str
    product: Product
    warehouse: Warehouse
    event: dict | None = None

    created_at: datetime
