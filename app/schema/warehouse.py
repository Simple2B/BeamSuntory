from pydantic import BaseModel


class Warehouse(BaseModel):
    id: int
    name: str
    phone_number: str
    city: str
    zip: str
    address: str

    class Config:
        orm_mode = True
