from pydantic import BaseModel


class MasterGroup(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True
