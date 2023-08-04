from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class StoreCategory(BaseModel):
    id: int
    name: str
    parent_category: Optional[str]
    active: bool
    image: Optional[str]
    created_at: datetime

    class Config:
        orm_mode = True
