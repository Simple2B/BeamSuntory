from datetime import datetime
from pydantic import BaseModel


class GroupProduct(BaseModel):
    id: int
    name: str
    master_group_id: int
    created_at: datetime

    class Config:
        orm_mode = True
