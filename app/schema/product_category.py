from datetime import datetime
from pydantic import BaseModel


class ProductCategory(BaseModel):
    id: int
    name: str
    quontity: int
    description: str
    active: bool
    created_at: datetime

    class Config:
        orm_mode = True
