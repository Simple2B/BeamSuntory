from pydantic import BaseModel, ConfigDict


class BillableGroup(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    rate: float
    master_billable_group_id: int
    assigned_to_inbound: bool
    assigned_to_outbound: bool
