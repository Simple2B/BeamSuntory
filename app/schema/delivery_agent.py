from datetime import datetime
from pydantic import BaseModel


class InboundOrder(BaseModel):
    id: int
    first_name: str
    last_name: str
    username: str
    email: str
    active: bool
    created_at: datetime

    class Config:
        orm_mode = True
