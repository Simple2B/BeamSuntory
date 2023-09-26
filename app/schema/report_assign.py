from pydantic import BaseModel, RootModel

from .pagination import PaginationOut
from .assign import Assign


class ReportAssignsResponse(BaseModel):
    pagination: PaginationOut
    report_events: list[Assign]


ReportAssignList = RootModel[list[Assign]]
