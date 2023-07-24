from pydantic import BaseModel


class WarehouseProduct(BaseModel):
    id: int
    product_id: int
    warehouse_id: int
    product_quantity: int

    class Config:
        orm_mode = True
