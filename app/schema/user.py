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
    image: str
    role: UserRole
    activated: bool
    approval_permission: bool
    group: str
    street_address: str
    country: str
    region: str
    city: str
    zip_code: str
    sales_rep: bool
    locker_address: str

    class Config:
        orm_mode = True
