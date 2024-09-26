from enum import Enum
from pydantic import BaseModel, Field, ConfigDict
from .division import Division


class ExtendedEnum(Enum):
    @classmethod
    def list(cls):
        return list(map(lambda c: c.value, cls))


class UserRole(ExtendedEnum):
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
    has_access_bulk_ship: bool
    has_access_bulk_assign: bool


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


class NotifyStatus(BaseModel):
    is_notify_new_inventory: bool | None = None
    is_notify_shipping: bool | None = None
    is_notify_request_share_status: bool | None = None


class QueryParamsUserSecret(BaseModel):
    user_id: int
    is_show: bool = True
