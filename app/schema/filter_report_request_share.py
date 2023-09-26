from pydantic import BaseModel, ConfigDict
from .report_request_share import ReportRequestShareType


class FilterRequestShare(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    created_from: str | None = None
    created_to: str | None = None
    report_type: ReportRequestShareType | None = None
