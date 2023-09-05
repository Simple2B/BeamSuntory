from datetime import date, datetime
from pydantic import BaseModel, validator, Field

from .product import Product
from .product_group import ProductGroupOut


class ProductAllocated(BaseModel):
    id: int
    quantity: int
    shelf_life_start: date = Field(alias="shelfLifeStart")
    shelf_life_end: date = Field(alias="shelfLifeEnd")

    @validator("shelf_life_start", "shelf_life_end", pre=True)
    def validate_dates(cls, value):
        return (
            datetime.strptime(value, "%m/%d/%Y").date()
            if value
            else datetime.now().date()
        )

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class ProductAllocatedOut(BaseModel):
    id: int
    quantity: int
    shelf_life_start: date = Field(alias="shelfLifeStart")
    shelf_life_end: date = Field(alias="shelfLifeEnd")
    product: Product
    product_quantity_groups: list[ProductGroupOut] = Field(
        alias="productQuantityGroups"
    )

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class ProductAllocatedList(BaseModel):
    __root__: list[ProductAllocated]
