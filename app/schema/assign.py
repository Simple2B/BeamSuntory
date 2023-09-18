from pydantic import BaseModel, ConfigDict


class Assign(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    quantity: int
    product_id: int
    group_id: int
