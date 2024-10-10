from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class DeliveryAgent(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    first_name: str = Field(alias="firstName")
    last_name: str = Field(alias="lastName")
    username: str
    email: str
    contact_number: str = Field(alias="contactNumber")
    street_address: str = Field(alias="streetAddress")
    active: bool
    created_at: datetime = Field(alias="createdAt")
