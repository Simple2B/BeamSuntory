from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .product import Product
from .group import Group
from .user import User


class Assign(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity: int
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    product: Product
    group: Group
    from_group: Group = Field(alias="fromGroup")
    created_at: datetime = Field(alias="createdAt")
    user: User
    type: str
