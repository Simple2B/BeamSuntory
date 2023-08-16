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
    supplier_id: Optional[int]
    currency: Optional[Currency]
    price: Optional[float]
    image: Optional[str]
    description: str
    # General Info ->
    SKU: str
    low_stock_level: Optional[int]
    program_year: Optional[int]
    package_qty: Optional[int]
    numb_of_items_per_case: Optional[int]
    numb_of_cases_per_outer_case: Optional[int]
    comments: Optional[str]
    # shipping
    weight: Optional[float]
    length: Optional[float]
    width: Optional[float]
    height: Optional[float]
    mstr_groups_groups: Optional[dict]
    current_user_groups: Optional[dict]

    class Config:
        orm_mode = True
        exclude = {"brand", "language", "category"}
