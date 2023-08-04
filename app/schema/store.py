from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class Store(BaseModel):
    id: int
    store_category_id: Optional[int]
    store_name: str
    contact_person: str
    email: str
    phone_numb: str
    country: str
    region: str
    city: str
    address: str
    zip: str
    active: bool
    created_at: datetime

    class Config:
        orm_mode = True
