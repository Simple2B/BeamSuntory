import enum
from pydantic import BaseModel, Field, TypeAdapter


class IncomingStockNotificationStatus(enum.Enum):
    PENDING = "PENDING"
    RECEIVED = "RECEIVED"


class IncomingStockNotifyProduct(BaseModel):
    product_info: str = Field(alias="productInfo", min_length=1)
    quantity: int = Field(gt=0)


AdapterIncomingStockProducts = TypeAdapter(list[IncomingStockNotifyProduct])
