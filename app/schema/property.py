from datetime import datetime
from pydantic import BaseModel


class Property(BaseModel):
    id: int
    name: str
    type: str

    created_at: datetime

    class Config:
        orm_mode = True
