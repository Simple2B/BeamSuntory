from pydantic import BaseModel, ConfigDict


class QueryFilterBase(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    q: str | None = None
    created_from: str | None = None
    created_to: str | None = None
