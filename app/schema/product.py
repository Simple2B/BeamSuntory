from datetime import datetime
from typing import Optional, Any
from enum import Enum
from pydantic import BaseModel


class CustomBase(BaseModel):
    def json(self, **kwargs):
        include = getattr(self.Config, "include", set())
        if len(include) == 0:
            include = None
        exclude = getattr(self.Config, "exclude", set())
        if len(exclude) == 0:
            exclude = None
        return super().json(include=include, exclude=exclude, **kwargs)


class ProductType(Enum):
    SIMPLE_PRODUCT = "Simple Product"
    VARIABLE_PRODUCT = "Variable Product"


class Currency(Enum):
    USD = "USD"
    CAD = "CAD"


class Premises(Enum):
    ON_PREMISE = "On Premise"
    OFF_PREMISE = "Off Premise"


class Product(CustomBase):
    id: int
    name: str
    product_type: ProductType

    supplier: Optional[Any]  # = Field(exclude=True)
    supplier_id: int | None
    currency: Currency
    regular_price: float
    retail_price: float
    image: str
    description: str
    # General Info ->
    SKU: str
    low_stock_level: int
    shelf_life_start: datetime
    shelf_life_end: datetime
    program_year: int
    premises: Premises
    package_qty: int
    numb_of_items_per_case: int
    numb_of_cases_per_outer_case: int
    comments: str
    # shipping
    weight: float
    length: float
    width: float
    height: float

    class Config:
        orm_mode = True
        exclude = {"brand", "language", "category"}
