from pydantic import BaseModel, ConfigDict, Field


class Division(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    role_name: str = Field(alias="roleName")
    activated: bool
    label_role_name: str | None
