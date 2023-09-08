from enum import Enum
from pydantic import BaseModel


class MasterGroupMandatory(Enum):
    events: str = "Events"


class MasterGroup(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
