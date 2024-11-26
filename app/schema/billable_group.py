from pydantic import BaseModel, ConfigDict


class BillableGroup(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    rate: float
    assigned_to: str | None = None
