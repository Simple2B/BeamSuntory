from enum import Enum
from pydantic import BaseModel, ConfigDict


class ReportType(Enum):
    EVENTS: str = "events"
    REQUEST_SHARE: str = "request_share"
    INVENTORIES: str = "inventories"
    ADJUSTMENT: str = "adjustment"
    ASSIGN: str = "assign"
    INBOUND_ORDER: str = "inbound_order"
    SHIPPING: str = "shipping"


class ReportFilter(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    report_type: ReportType
    action_type: str | None = None
    request_share: str | None = None
    q: str | None = None
    user: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    master_group: str | None = None
    target_group: str | None = None
    brand: str | None = None
    language: str | None = None
    premises: str | None = None
    category: str | None = None
    events: str | None = None
