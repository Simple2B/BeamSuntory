from enum import Enum


class ReportRequestShareType(Enum):
    CREATED: str = "created"
    UPDATED_QUANTITY: str = "updated quantity"
    SHARED: str = "shared"
    DECLINED: str = "declined"
