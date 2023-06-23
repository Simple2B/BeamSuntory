from datetime import datetime
from pydantic import BaseModel


class Supplier(BaseModel):
    id: int
    name: str
    email: str
    contact_numb: str
    city: str
    address: str
    zip: str
    active: bool
    created_at: datetime

    class Config:
        orm_mode = True
