from pydantic import BaseModel


class Adjust(BaseModel):
    id: int
    product_id: int
    note: str

    class Config:
        orm_mode = True
