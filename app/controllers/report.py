from flask import request
from app import schema as s


class ReportTypeNotImplemented(NotImplemented):
    """Raised when report type handler not implemented"""

    ...


def get_report_events(report_filter: s.ReportFilter):
    ...


def get_report() -> str:
    report_filter = s.ReportFilter(dict(request.args))

    match report_filter.report_type:
        case s.ReportType.EVENTS:
            return get_report_events(report_filter)
        case _:
            raise ReportTypeNotImplemented
