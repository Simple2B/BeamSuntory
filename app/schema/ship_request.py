from enum import Enum
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .cart import Cart


class ShipRequestStatus(Enum):
    waiting_for_warehouse = "Waiting for warehouse manager"
    assigned = "Assigned to pickup"
    delivered = "Delivered"
    in_transit = "In transit"
    cancelled = "Cancelled"


class ShipRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    order_numb: str = Field(alias="orderNumb")
    status: ShipRequestStatus
    order_type: str = Field(alias="orderType")  # TODO enum??? ask client
    store_id: int = Field(alias="storeId")
    comment: str | None
    wm_notes: str | None = Field(alias="wmNotes")
    da_notes: str | None = Field(alias="daNotes")
    carts: list[Cart]

    created_at: datetime = Field(alias="createdAt")
