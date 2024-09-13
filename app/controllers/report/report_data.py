import io
from typing import Type
from abc import ABC, abstractmethod
from flask import send_file
import pandas as pd
import sqlalchemy as sa
from app import schema as s


class ReportData(ABC):
    type: s.ReportType
    ResponseModel: Type[s.ReportsBaseResponse]

    @classmethod
    @abstractmethod
    def get_search_result(
        cls, report_filter: s.ReportFilter
    ) -> tuple[sa.Select, sa.Select]: ...

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
    @abstractmethod
    def get_dataset(
        cls,
        report_filter: s.ReportFilter,
    ) -> dict[str, list]: ...

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

    @classmethod
    def generate_csv_response(cls, report_filter: s.ReportFilter):
        data = cls.get_dataset(report_filter)
        df = pd.DataFrame(data)

        # Save the DataFrame to a CSV file in memory
        csv_buffer = io.StringIO()
        df.to_csv(csv_buffer, index=False)
        csv_buffer.seek(0)

        # Send the CSV file as a response
        return send_file(
            io.BytesIO(csv_buffer.getvalue().encode("utf-8")),
            mimetype="text/csv",
            as_attachment=True,
            download_name="report.csv",
        )
