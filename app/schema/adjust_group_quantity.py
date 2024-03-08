from pydantic import BaseModel, ConfigDict, Field, validator
from .group import Group
from .warehouse import Warehouse


class AdjustGroupQty(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity_after: int = Field(alias="quantityAfter")
    quantity_before: int = Field(alias="quantityBefore")
    delta: int | None = None
    group: Group
    warehouse: Warehouse

    @validator("delta", always=True)
    def compute_delta(cls, v, values) -> int:
        quantity_after = values["quantity_after"]
        quantity_before = values["quantity_before"]

        if quantity_after is not None and quantity_before is not None:
            return quantity_after - quantity_before
