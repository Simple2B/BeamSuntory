from pydantic import BaseModel, ConfigDict


class FilterReportInventories(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    q: str | None = None
    username: str | None = None
    created_from: str | None = None
    created_to: str | None = None
    master_group: str | None = None
    group: str | None = None
    group_brand: str | None = None
    group_language: str | None = None
    group_categories: str | None = None
    group_premises: str | None = None
    group_event: str | None = None
    report_type: str | None = None
    expire_in: str | None = None
