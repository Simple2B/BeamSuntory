from pydantic import BaseModel


class ProductGroup(BaseModel):
    id: int
    product_id: int
    group_id: int

    class Config:
        orm_mode = True
