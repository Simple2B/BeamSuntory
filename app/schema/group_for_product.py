from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .master_group_for_product import MasterGroupProduct


class GroupProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    master_group_id: int = Field(alias="masterGroupId")
    created_at: datetime = Field(alias="createdAt")
    master_group: MasterGroupProduct = Field(alias="masterGroup")


class GroupProductList(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    groups: list[GroupProduct]
