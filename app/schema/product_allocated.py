from datetime import date, datetime
from pydantic import BaseModel, Field, RootModel, ConfigDict, field_validator

from .product import Product
from .product_group import ProductGroupOut


class ProductAllocated(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity: int
    shelf_life_start: date = Field(alias="shelfLifeStart")
    shelf_life_end: date = Field(alias="shelfLifeEnd")

    @field_validator("shelf_life_start", "shelf_life_end", mode="before")
    def validate_dates(cls, value):
        return (
            datetime.strptime(value, "%m/%d/%Y").date()
            if value
            else datetime.now().date()
        )


class ProductAllocatedOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity: int
    shelf_life_start: date = Field(alias="shelfLifeStart")
    shelf_life_end: date = Field(alias="shelfLifeEnd")
    product: Product
    product_quantity_groups: list[ProductGroupOut] = Field(
        alias="productQuantityGroups"
    )


ProductAllocatedList = RootModel[list[ProductAllocated]]
