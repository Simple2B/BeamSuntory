from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class Property(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    type: str
    created_at: datetime = Field(alias="createdAt")
