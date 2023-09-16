from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class GroupProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    master_group_id: int = Field(alias="masterGroupId")
    created_at: datetime = Field(alias="createdAt")
