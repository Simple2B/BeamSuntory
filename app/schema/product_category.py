from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class ProductCategory(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    quantity: int
    description: str
    active: bool
    created_at: datetime = Field(alias="createdAt")
