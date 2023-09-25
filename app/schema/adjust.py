from datetime import datetime
from pydantic import BaseModel, ConfigDict, RootModel, Field
from .product import Product
from .pagination import PaginationOut
from .user import User
from .adjust_group_quantity import AdjustGroupQty


class Adjust(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    note: str
    product: Product
    user: User
    created_at: datetime = Field(alias="createdAt")
    adjust_group_qty: list[AdjustGroupQty] = Field(alias="adjustGroupQty")


class AdjustResponse(BaseModel):
    pagination: PaginationOut
    adjusts: list[Adjust]


AdjustList = RootModel[list[Adjust]]
