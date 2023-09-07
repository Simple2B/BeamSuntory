from enum import Enum
from pydantic import BaseModel


class ProductMasterGroupMandatory(Enum):
    events: str = "Events"


class MasterGroupProduct(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
