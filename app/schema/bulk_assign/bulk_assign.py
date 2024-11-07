from datetime import datetime
from enum import Enum
from pydantic import BaseModel, ConfigDict, Field

from app.schema.user import User
from app.schema.assign import Assign


class BulkAssignFields(Enum):
    SKU = "SKU"
    GROUP_FROM = "Group_from"
    MASTER_GROUP_TO = "Master_group_to"
    PRODUCT_GROUP_TO = "Product_group_to"
    QUANTITY = "Quantity"


class BulkAssign(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    created_at: datetime = Field(alias="createdAt")
    user: User
    type: str
    assigns: list[Assign]
