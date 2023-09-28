from enum import Enum
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, RootModel


from .user import User
from .ship_request import ShipRequest
from .pagination import PaginationOut


class ReportShipRequestType(Enum):
    CREATED = "created"
    ACCEPTED = "accepted"
    PICKED_UP = "picked_up"
    DELIVERED = "delivered"


class ReportShipping(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    type: str
    history: str
    created_at: datetime = Field(alias="createdAt")
    ship_request: ShipRequest = Field(alias="shipRequest")
    user: User


ReportShippingList = RootModel[list[ReportShipping]]


class ReportShippingResponse(BaseModel):
    pagination: PaginationOut
    reports: ReportShippingList
