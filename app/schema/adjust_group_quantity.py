from pydantic import BaseModel, ConfigDict, RootModel, Field
from .group import Group
from .warehouse import Warehouse


class AdjustGroupQty(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity: int
    quantity_before: int = Field(alias="quantityBefore")
    group: Group
    warehouse: Warehouse
