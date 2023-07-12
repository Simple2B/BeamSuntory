from enum import Enum
from pydantic import BaseModel


class UserRole(Enum):
    ADMIN = "admin"
    MANAGER = "manager"
    SALES_REP = "sales_rep"
    WAREHOUSE_MANAGER = "warehouse_manager"


class User(BaseModel):
    id: int
    username: str
    email: str
    image: str
    role: UserRole
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
