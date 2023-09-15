from enum import Enum
from pydantic import BaseModel
from .event import Event


class ReportEventType(Enum):
    created: str = "Created"
    updated: str = "Updated"


class ReportEvent(BaseModel):
    type: str
    quantity: int
    event: Event


class ReportEventList(BaseModel):
    __root__: [ReportEvent]
