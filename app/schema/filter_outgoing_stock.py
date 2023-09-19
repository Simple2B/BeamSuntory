from pydantic import BaseModel, ConfigDict, Json
from .inbound_order import InboundOrderStatus


class FilterIncomingStock(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    start_from: str | None = None
    start_to: str | None = None
    end_from: str | None = None
    end_to: str | None = None
    checked_statuses: Json[list[InboundOrderStatus]] | None = None
