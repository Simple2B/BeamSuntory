from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field, RootModel
from .request_share import RequestShare
from .user import User
from .report import ReportsBaseResponse


class ReportRequestShare(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    type: str
    history: str
    created_at: datetime = Field(alias="createdAt")
    request_share: RequestShare = Field(alias="requestShare")
    user: User


ReportRequestShareList = RootModel[list[ReportRequestShare]]


class ReportRequestShareResponse(ReportsBaseResponse):
    reports: ReportRequestShareList
