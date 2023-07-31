from pydantic import BaseModel


class PackageInfo(BaseModel):
    id: int
    quantity_per_wrap: int
    quantity_wrap_carton: int
    quantity_carton_master: int
    inbound_order_id: int

    class Config:
        orm_mode = True
