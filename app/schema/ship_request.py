from enum import Enum
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .cart import Cart
from .store import Store


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
    store: Store
    comment: str | None
    wm_notes: str | None = Field(alias="wmNotes")
    da_notes: str | None = Field(alias="daNotes")
    proof_of_delivery: str | None = Field(alias="proofOfDelivery")
    tracking: str | None

    carts: list[Cart]

    created_at: datetime = Field(alias="createdAt")


class FilterShipRequest(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    ship_request_sort_locker: bool = False
