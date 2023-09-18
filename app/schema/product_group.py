from pydantic import BaseModel, ConfigDict, Field
from .group import Group


class ProductGroup(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")


class ProductGroupOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    group: Group
    quantity: int
