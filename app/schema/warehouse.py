from pydantic import BaseModel, Field


class Warehouse(BaseModel):
    id: int
    name: str
    phone_number: str = Field(alias="phoneNumber")
    city: str
    zip: str
    address: str
    manager_id: int = Field(alias="managerId")

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
