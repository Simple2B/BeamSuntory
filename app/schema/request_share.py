from pydantic import BaseModel


class RequestShare(BaseModel):
    id: int
    product_id: int
    group_id: int
    desire_quantity: int
    status: str

    class Config:
        orm_mode = True
