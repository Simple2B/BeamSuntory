from app.schema.report import ReportsBaseResponse

from .billable_group import Billable


class ReportBillableResponse(ReportsBaseResponse):
    reports: list[Billable]
