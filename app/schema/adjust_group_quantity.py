from typing_extensions import Annotated
from pydantic import BaseModel, ConfigDict, Field, field_validator
from .group import Group
from .warehouse import Warehouse


class AdjustGroupQty(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity_after: int = Field(alias="quantityAfter")
    quantity_before: int = Field(alias="quantityBefore")
    delta: Annotated[str | None, Field(validate_default=True)] = None
    group: Group
    warehouse: Warehouse

    @field_validator("delta")
    def compute_delta(cls, v, values) -> int:
        quantity_after = values.data.get("quantity_after")
        quantity_before = values.data.get("quantity_before")

        if quantity_after is not None and quantity_before is not None:
            return quantity_after - quantity_before
        return 0
