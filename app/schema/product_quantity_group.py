from datetime import datetime, date
from pydantic import BaseModel, validator, Field


class ProductQuantityGroup(BaseModel):
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    quantity: int

    class Config:
        allow_population_by_field_name = True


class ProductQuantityGroups(BaseModel):
    __root__: list[ProductQuantityGroup]
