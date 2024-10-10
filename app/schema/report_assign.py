from pydantic import RootModel
from .assign import Assign
from .report import ReportsBaseResponse


class ReportAssignsResponse(ReportsBaseResponse):
    reports: list[Assign]


ReportAssignList = RootModel[list[Assign]]
