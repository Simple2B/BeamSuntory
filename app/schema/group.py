from datetime import datetime
from pydantic import BaseModel, Field


class Group(BaseModel):
    id: int
    name: str
    master_group_id: int = Field(alias="masterGroupId")
    created_at: datetime

    class Config:
        orm_mode = True
