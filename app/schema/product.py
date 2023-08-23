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


class Currency(Enum):
    USD = "USD"
    CAD = "CAD"


class Product(CustomBase):
    id: int
    name: str

    supplier: Optional[Any]  # = Field(exclude=True)
    supplier_id: int | None
    currency: Currency | None
    regular_price: float | None
    retail_price: float | None
    image: str | None
    description: str
    # General Info ->
    SKU: str
    low_stock_level: int | None
    program_year: int | None
    package_qty: int | None
    numb_of_items_per_case: int | None
    numb_of_cases_per_outer_case: int | None
    comments: str | None
    # shipping
    weight: float | None
    length: float | None
    width: float | None
    height: float | None
    mstr_groups_groups: dict | None
    current_user_groups: dict | None

    class Config:
        orm_mode = True
        exclude = {"brand", "language", "category"}
