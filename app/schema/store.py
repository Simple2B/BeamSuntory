from datetime import datetime
from pydantic import BaseModel


class Store(BaseModel):
    id: int
    store_category: str
    store_name: str
    contact_person: str
    email: str
    phone_numb: str
    city: str
    address: str
    zip: str
    active: bool
    created_at: datetime

    class Config:
        orm_mode = True
