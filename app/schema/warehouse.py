from pydantic import BaseModel


class Warehouse(BaseModel):
    id: int
    name: str
    phone_number: str
    city: str
    zip: str
    address: str
    manager_id: int

    class Config:
        orm_mode = True
