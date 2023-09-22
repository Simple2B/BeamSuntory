from pydantic import BaseModel, ConfigDict


class FilterReportAssign(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    username: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    master_group: str | None = None
