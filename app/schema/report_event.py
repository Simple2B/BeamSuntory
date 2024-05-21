from enum import Enum
from datetime import datetime
from pydantic import BaseModel, RootModel, ConfigDict, Field
from .ship_request import ShipRequest
from .cart import Cart
from .user import User
from .pagination import PaginationOut
from .report import ReportsBaseResponse


class ReportEventType(Enum):
    created: str = "Created"
    updated: str = "Updated"


class ReportEvent(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    type: str
    history: str
    user: User
    created_at: datetime = Field(alias="createdAt")
    ship_request: ShipRequest = Field(alias="shipRequest")


class Event(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    ship_request: ShipRequest = Field(alias="shipRequest")
    cart: Cart
    user: User


class ReportEventResponse(ReportsBaseResponse):
    pagination: PaginationOut
    reports: list[Event]


ReportEventList = RootModel[list[ReportEvent]]
