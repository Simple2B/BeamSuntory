from pydantic import BaseModel


class Division(BaseModel):
    id: int
    role_name: str
    activated: bool

    class Config:
        orm_mode = True
