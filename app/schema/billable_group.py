from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class BillableGroup(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    rate: float
    master_billable_group_id: int
    assigned_to_inbound: bool
    assigned_to_outbound: bool


class BillableGroupIncreaseCostRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    cost: float


class Billable(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    master_billable_group_name: str = Field(alias="masterBillableGroupName")
    billable_group_name: str = Field(alias="billableGroupName")
    rate: float
    created_at: datetime = Field(alias="createdAt")
    assigned_to_inbound: bool
    assigned_to_outbound: bool
