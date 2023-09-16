from pydantic import BaseModel, ConfigDict


class Adjust(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    product_id: int
    note: str
