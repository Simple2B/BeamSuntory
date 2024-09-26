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

        return send_xlsx_response(df)


def send_xlsx_response(df: pd.DataFrame):
    # Save the DataFrame to a CSV file in memory
    excel_buffer = io.BytesIO()

    # Write the DataFrame to the buffer in Excel format
    df.to_excel(
        excel_buffer, index=False, engine="openpyxl"
    )  # Use 'openpyxl' for .xlsx format
    excel_buffer.seek(0)

    # Send the CSV file as a response
    return send_file(
        excel_buffer,
        mimetype="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        as_attachment=True,
        download_name="report.xlsx",
    )
