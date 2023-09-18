from datetime import date
from pydantic import BaseModel, Field, RootModel, ConfigDict
from .pagination import PaginationOut
from .product import Product
from .user import User


class Event(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    date_from: date = Field(alias="dateFrom")
    date_to: date = Field(alias="dateTo")
    quantity: int
    product: Product
    user: User


class EventCSVOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    date_from: date = Field(alias="dateFrom")
    date_to: date = Field(alias="dateTo")
    comment: str
    product: Product
    user: User


class EventsApiOut(BaseModel):
    pagination: PaginationOut
    events: list[EventCSVOut]


class EventsDateQuantity(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    date: str
    quantity: int


EventsCalendar = RootModel[list[EventsDateQuantity]]
