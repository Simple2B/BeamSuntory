from enum import Enum
from pydantic import BaseModel, ConfigDict


class ProductMasterGroupMandatory(Enum):
    events: str = "Events"


class MasterGroupProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
