from enum import Enum
from pydantic import BaseModel


class UserRole(Enum):
    ADMIN = 1
    SALES_REP = 2
    WAREHOUSE_MANAGER = 3


class User(BaseModel):
    id: int
    username: str
    email: str
    image: str
    role: int
    activated: bool
    approval_permission: bool
    street_address: str
    phone_number: str | None
    country: str
    region: str
    city: str
    zip_code: str
    sales_rep: bool

    class Config:
        orm_mode = True
