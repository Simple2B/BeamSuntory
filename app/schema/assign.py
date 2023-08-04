from pydantic import BaseModel


class Assign(BaseModel):
    id: int
    quantity: int
    product_id: int
    group_id: int

    class Config:
        orm_mode = True
