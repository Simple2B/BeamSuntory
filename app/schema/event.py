from datetime import date
from pydantic import BaseModel, Field
from .pagination import PaginationOut
from .product import Product


class Event(BaseModel):
    id: int
    date_from: date = Field(alias="dateFrom")
    date_to: date = Field(alias="dateTo")
    quantity: int
    product: Product

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class EventCSVOut(BaseModel):
    id: int
    date_from: date = Field(alias="dateFrom")
    date_to: date = Field(alias="dateTo")
    comment: str
    product: Product

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class EventsApiOut(BaseModel):
    pagination: PaginationOut
    events: list[EventCSVOut]


class EventsDateQuantity(BaseModel):
    date: str
    quantity: int

    class Config:
        orm_mode = True
        allow_population_by_field_name = True


class EventsCalendar(BaseModel):
    __root__: list[EventsDateQuantity]

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
