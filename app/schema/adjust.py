from datetime import datetime
from pydantic import BaseModel, ConfigDict, RootModel, Field
from .product import Product
from .pagination import PaginationOut
from .user import User


class Adjust(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    note: str
    product: Product
    user: User
    created_at: datetime = Field(alias="createdAt")


class AdjustResponse(BaseModel):
    pagination: PaginationOut
    adjusts: list[Adjust]


AdjustList = RootModel[list[Adjust]]
