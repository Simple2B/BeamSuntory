from pydantic import BaseModel, ConfigDict, Field


class RequestShare(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    desire_quantity: int = Field(alias="desireQuantity")
    status: str
