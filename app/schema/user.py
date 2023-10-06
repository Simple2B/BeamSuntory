from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from .division import Division


class UserRole(Enum):
    ADMIN: str = "admin"
    SALES_REP: str = "sales_rep"
    WAREHOUSE_MANAGER: str = "warehouse_manager"
    MANAGER: str = "manager"
    DELIVERY_AGENT: str = "delivery_agent"


class User(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    username: str
    email: str
    image: str
    role: int
    role_obj: Division = Field(alias="roleObj")
    activated: bool
    approval_permission: bool = Field(alias="approvalPermission")
    street_address: str = Field(alias="streetAddress")
    phone_number: str | None = Field(
        alias="phoneNumber"
    )  # TODO phone_number or phone or phone_numb?
    country: str
    region: str
    city: str
    zip_code: str = Field(alias="zipCode")
    sales_rep: bool = Field(alias="salesRep")


class AdminCreate(BaseModel):
    username: str
    email: str
    password: str
    image: str | None = None
    street_address: str | None = None
    phone_number: str | None = None
    country: str
    region: str
    city: str
    zip_code: str
