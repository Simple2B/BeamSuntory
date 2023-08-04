from datetime import datetime
from pydantic import BaseModel


class StoreCategory(BaseModel):
    id: int
    name: str
    parent_category: str
    active: bool
    image: str
    created_at: datetime

    class Config:
        orm_mode = True
