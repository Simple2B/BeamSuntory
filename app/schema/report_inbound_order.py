from datetime import datetime
from pydantic import BaseModel, RootModel, ConfigDict, Field
from .user import User
from .pagination import PaginationOut
from .inbound_order import InboundOrder


class ReportInboundOrder(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    type: str
    history: str
    user: User
    created_at: datetime = Field(alias="createdAt")
    inbound_order: InboundOrder = Field(alias="inboundOrder")


class ReportInboundOrderResponse(BaseModel):
    pagination: PaginationOut
    report_inbound_orders: list[ReportInboundOrder]


ReportInboundOrderList = RootModel[list[ReportInboundOrder]]
