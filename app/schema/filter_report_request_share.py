from .report_request_share import ReportRequestShareType
from .query_filter import QueryFilterBase


class FilterRequestShare(QueryFilterBase):
    report_type: ReportRequestShareType | None = None
