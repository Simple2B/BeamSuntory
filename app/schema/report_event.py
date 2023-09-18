from enum import Enum
from pydantic import BaseModel, RootModel, ConfigDict
from .event import Event


class ReportEventType(Enum):
    created: str = "Created"
    updated: str = "Updated"


class ReportEvent(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    type: str
    history: str
    events: list[Event]


ReportEventList = RootModel[list[ReportEvent]]
