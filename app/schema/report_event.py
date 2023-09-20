from enum import Enum
from datetime import datetime
from pydantic import BaseModel, RootModel, ConfigDict, Field
from .event import Event
from .user import User
from .pagination import PaginationOut


class ReportEventType(Enum):
    created: str = "Created"
    updated: str = "Updated"


class ReportEvent(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    type: str
    history: str
    user: User
    created_at: datetime = Field(alias="createdAt")
    events: list[Event]


class ReportEventResponse(BaseModel):
    pagination: PaginationOut
    report_events: list[ReportEvent]


ReportEventList = RootModel[list[ReportEvent]]
