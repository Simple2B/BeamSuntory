import enum
from pydantic import BaseModel, Field, TypeAdapter


class IncomingStockNotificationStatus(enum.Enum):
    PENDING = "PENDING"
    RECEIVED = "RECEIVED"


class IncomingStockNotifyProduct(BaseModel):
    product_id: int = Field(alias="productId")
    quantity: int


AdapterIncomingStockProducts = TypeAdapter(list[IncomingStockNotifyProduct])
