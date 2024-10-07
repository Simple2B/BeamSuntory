import enum
from pydantic import BaseModel, Field, TypeAdapter


class IncomingStockNotificationStatus(enum.Enum):
    PENDING = "PENDING"
    RECEIVED = "RECEIVED"


class IncomingStockNotifyProduct(BaseModel):
    product_info: str = Field(default="", alias="productInfo")
    quantity: int = Field(gt=0)


AdapterIncomingStockProducts = TypeAdapter(list[IncomingStockNotifyProduct])
