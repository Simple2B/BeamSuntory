from enum import Enum
from pydantic import BaseModel


class UserRole(Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    SALES_REP = "sales rep"


class User(BaseModel):
    id: int
    username: str
    email: str
    full_name: str
    image: str
    role: UserRole
    activated: bool

    class Config:
        orm_mode = True
