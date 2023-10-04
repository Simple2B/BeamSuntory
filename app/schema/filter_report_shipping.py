from .report import ReportShipRequestActionType
from .query_filter import QueryFilterBase


class FilterReportShipping(QueryFilterBase):
    report_type: ReportShipRequestActionType | None = None
    division: str | None = None
    target_group: str | None = None
    language: int | None = None
    brand: int | None = None
    category: int | None = None
    premise: int | None = None
