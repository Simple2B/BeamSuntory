from typing import Optional
from pydantic import BaseModel


class Division(BaseModel):
    id: int
    role_name: str
    type: str
    parent_role: Optional[str]
    activated: bool

    class Config:
        orm_mode = True
