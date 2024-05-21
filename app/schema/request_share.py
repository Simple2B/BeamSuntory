from pydantic import BaseModel, ConfigDict, Field
from .product import Product
from .group import Group


class RequestShareReport(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    type: str
    created_at_formated: str = Field(alias="createdAtFormated")
    username: str


class RequestShare(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    desire_quantity: int = Field(alias="desireQuantity")
    status: str
    product: Product
    group: Group
    from_group: Group = Field(alias="fromGroup")
    reports: list[RequestShareReport]
