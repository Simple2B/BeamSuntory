from typing import Type
from abc import ABC, abstractmethod
import sqlalchemy as sa
from app import schema as s


class ReportData(ABC):
    type: s.ReportType
    ResponseModel: Type[s.ReportsBaseResponse]

    @classmethod
    @abstractmethod
    def get_reports(cls, report_filter: s.ReportFilter): ...

    @classmethod
    @abstractmethod
    def render(
        cls,
        pagination: sa.ScalarResult,
        reports: sa.ScalarResult,
        report_filter: s.ReportFilter,
    ) -> str: ...

    @classmethod
    def generate_html_response(cls, report_filter: s.ReportFilter) -> str:
        pagination, reports = cls.get_reports(report_filter)

        return cls.render(pagination, reports, report_filter)

    @classmethod
    def generate_json_response(cls, report_filter: s.ReportFilter):
        pagination, reports = cls.get_reports(report_filter)
        return cls.ResponseModel(
            pagination=pagination, reports=reports
        ).model_dump_json(by_alias=True)
