from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field
from .product import Product
from .group import Group
from .user import User


class Assign(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity: int
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    product: Product
    group: Group
    from_group: Group = Field(alias="fromGroup")
    created_at: datetime = Field(alias="createdAt")
    bulk_assign_id: int | None = Field(alias="bulkAssignId")
    user: User
    type: str


class AssignInfo(BaseModel):

    product_SKU: str
    group_name_from: str
    master_group_to_name: str
    product_group_to_name: str
    quantity: int

    @property
    def quantity_assigns_key(self):
        return f"{self.product_SKU}_{self.group_name_from}"
