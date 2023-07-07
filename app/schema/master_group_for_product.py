from pydantic import BaseModel


class MasterGroupProduct(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
