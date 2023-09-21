from pydantic import BaseModel, ConfigDict, Field
from .warehouse import Warehouse


class WarehouseProduct(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    warehouse_id: int = Field(alias="warehouseId")
    product_quantity: int = Field(alias="productQuantity")
    warehouse: Warehouse
