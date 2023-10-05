from flask import request
from app import schema as s
from .report_data import ReportData
from .report_event import ReportDataEvents
from .report_inventory import ReportDataInventories
from .report_adjustment import ReportDataAdjustments
from .report_assign import ReportDataAssigns
from .report_request_share import ReportDataShareRequests
from .report_inbound_order import ReportDataInboundOrders
from .report_shipping import ReportDataShipping
from .report_shelf_life import ReportDataShelfLife

REPORT_GENERATORS: tuple[ReportData] = (
    ReportDataEvents,
    ReportDataShareRequests,
    ReportDataInventories,
    ReportDataAdjustments,
    ReportDataAssigns,
    ReportDataInboundOrders,
    ReportDataShipping,
    ReportDataShelfLife,
)

REPORT_DISPATCHERS = {
    report_dispatcher.type: report_dispatcher for report_dispatcher in REPORT_GENERATORS
}


def get_reports(render: True = False) -> str:
    # clear query params from empty values
    query_params = {}
    for query_key, query_value in request.args.items():
        if query_value:
            query_params[query_key] = query_value

    report_filter = s.ReportFilter.model_validate(query_params)
    report_dispatcher = REPORT_DISPATCHERS.get(report_filter.report_type)

    if not report_dispatcher:
        raise NotImplementedError(
            f"Report type not implemented: {report_filter.report_type.value}"
        )

    if render:
        return report_dispatcher.generate_html_response(report_filter)

    return report_dispatcher.generate_json_response(report_filter)
