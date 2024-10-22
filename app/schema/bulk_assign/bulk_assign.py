from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field

from app.schema.user import User
from app.schema.assign import Assign


class BulkAssign(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    created_at: datetime = Field(alias="createdAt")
    user: User
    type: str
    assigns: list[Assign]
