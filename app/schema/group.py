from typing import Optional, ForwardRef
from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict, RootModel
from .master_group import MasterGroup


class Group(BaseModel):
    model_config = ConfigDict(
        from_attributes=True,
        populate_by_name=True,
        orm_mode=True,
    )

    id: int
    name: str
    master_group_id: int = Field(alias="masterGroupId")
    created_at: datetime = Field(alias="createdAt")
    master_group: MasterGroup = Field(alias="masterGroup")
    parent_group: Optional[ForwardRef("Group")] = Field(None, alias="parentGroup")


GroupRoot = RootModel[list[Group]]
