from datetime import datetime
from pydantic import BaseModel


class DeliveryAgent(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str
    contact_number: str
    street_address: str
    active: bool
    created_at: datetime

    class Config:
        orm_mode = True
