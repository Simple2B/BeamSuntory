from pydantic import BaseModel, ConfigDict


class FilterReportAssign(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    username: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    brand: str | None = None
    categories: str | None = None
    language: str | None = None
    premises: str | None = None
    from_group: str | None = None
    to_group: str | None = None
