from datetime import datetime
from pydantic import BaseModel, Field


class Supplier(BaseModel):
    id: int
    name: str
    email: str
    contact_number: str = Field(alias="contactNumber")
    country: str
    region: str
    city: str
    address: str
    zip: str
    active: bool
    created_at: datetime = Field(alias="createdAt")

    class Config:
        orm_mode = True
        allow_population_by_field_name = True
