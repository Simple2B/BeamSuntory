from __future__ import annotations
import enum

from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .product import Product
from .warehouse import Warehouse
from .event import Event
from .group import Group


class CartStatus(enum.Enum):
    PENDING = "pending"
    SUBMITTED = "submitted"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class Cart(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    status: str
    group: Group
    quantity: int
    user_id: int = Field(alias="userId")
    product: Product
    warehouse: Warehouse | None = None
    event: Event | None = None

    created_at: datetime
