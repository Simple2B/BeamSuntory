from .report import ReportRequestShareActionType
from .query_filter import QueryFilterBase


class FilterRequestShare(QueryFilterBase):
    report_type: ReportRequestShareActionType | None = None
