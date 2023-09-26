from pydantic import BaseModel, ConfigDict


class FilterReportAdjustments(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    username: str | None = None
    start_from: str | None = None
    start_to: str | None = None
    end_from: str | None = None
    end_to: str | None = None
    master_group: str | None = None
    group: str | None = None
    group_brand: str | None = None
    group_language: str | None = None
    group_category: str | None = None
    group_premises: str | None = None
    group_event: str | None = None
