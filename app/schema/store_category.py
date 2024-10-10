from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class StoreCategory(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    parent_category: str | None = Field(alias="parentCategory")
    active: bool
    image: str | None
    created_at: datetime = Field(alias="createdAt")
