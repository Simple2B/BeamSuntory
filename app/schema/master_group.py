from enum import Enum
from pydantic import BaseModel, ConfigDict


class MasterGroupMandatory(Enum):
    events: str = "Events"


class MasterGroup(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
