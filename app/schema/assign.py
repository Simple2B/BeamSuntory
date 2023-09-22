from datetime import datetime
from pydantic import BaseModel, ConfigDict
from .product import Product
from .group import Group
from .user import User


class Assign(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    quantity: int
    product_id: int
    group_id: int
    product: Product
    group: Group
    from_group: Group
    created_at: datetime
    user: User
    type: str
