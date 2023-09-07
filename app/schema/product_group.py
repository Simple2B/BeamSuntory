from pydantic import BaseModel
from .group import Group


class ProductGroup(BaseModel):
    id: int
    product_id: int
    group_id: int

    class Config:
        orm_mode = True


class ProductGroupOut(BaseModel):
    id: int
    group: Group
    quantity: int

    class Config:
        orm_mode = True
