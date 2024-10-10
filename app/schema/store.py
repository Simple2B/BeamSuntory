from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict


class Store(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    store_category_id: int | None = Field(alias="storeCategoryId")
    store_name: str = Field(alias="storeName")
    contact_person: str = Field(alias="contactPerson")
    email: str
    phone_numb: str = Field(alias="phoneNumb")
    country: str
    region: str
    city: str
    address: str
    zip: str
    active: bool
    created_at: datetime = Field(alias="createdAt")
