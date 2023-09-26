from pydantic import BaseModel, ConfigDict


class FilterReportInventories(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    username: str | None = None
    created_from: str | None = None
    created_to: str | None = None
