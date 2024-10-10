from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class Supplier(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

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
