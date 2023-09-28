from pydantic import BaseModel, ConfigDict


class FilterReportInboundOrder(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    start_date: str | None = None
    end_date: str | None = None
    brand: str | None = None
    category: str | None = None
    premises: str | None = None
