from datetime import date
from pydantic import BaseModel, Field
from .product import Product


class Event(BaseModel):
    id: int
    date_from: date = Field(alias="dateFrom")
    date_to: date = Field(alias="dateTo")
    quantity: int = Field(alias="activeTime")
    product: Product

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
