from enum import Enum
from pydantic import BaseModel
from .pagination import PaginationOut


class ReportRequestShareActionType(Enum):
    CREATED: str = "created"
    UPDATED_QUANTITY: str = "updated quantity"
    SHARED: str = "shared"
    DECLINED: str = "declined"


class ReportShipRequestActionType(Enum):
    CREATED = "created"
    ACCEPTED = "accepted"
    PICKED_UP = "picked_up"
    DELIVERED = "delivered"


class ReportType(Enum):
    EVENTS: str = "events"
    REQUEST_SHARE: str = "request_share"
    INVENTORIES: str = "inventories"
    ADJUSTMENT: str = "adjustment"
    ASSIGN: str = "assign"
    INBOUND_ORDER: str = "inbound_order"
    SHIPPING: str = "shipping"
    SHELF_LIFE: str = "shelf_life"


class CalendarFilters(BaseModel):
    start_date: str | None = None
    start_date_to: str | None = None
    end_date: str | None = None
    end_date_to: str | None = None


class GroupFilters(BaseModel):
    master_group: str | None = None
    target_group: str | None = None
    group_from: str | None = None
    group_to: str | None = None
    brand: str | None = None
    language: str | None = None
    premises: str | None = None
    categories: str | None = None


class ReportActionTypes(BaseModel):
    action_type_request_share: ReportRequestShareActionType | None = None
    action_type_shipping: ReportShipRequestActionType | None = None


class ReportFilter(CalendarFilters, GroupFilters, ReportActionTypes):
    id: int | None = None
    report_type: ReportType
    action_type: str | None = None
    request_share: str | None = None
    q: str | None = None
    user: str | None = None
    events: str | None = None
    division: str | None = None
    expire_in: str | None = None
    search_sku: str | None = None
    product_group: str | None = None


class ReportsBaseResponse(BaseModel):
    pagination: PaginationOut
    reports: list[dict]
