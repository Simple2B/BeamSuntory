from pydantic import BaseModel, Field, RootModel, ConfigDict


class ProductQuantityGroup(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    quantity: int


ProductQuantityGroups = RootModel[list[ProductQuantityGroup]]


class ProductAllocatedGroupCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    group_id: int = Field(alias="groupId")
    quantity: int = Field(ge=0)


class ProductQuantityGroupCreate(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    product_allocated_id: int = Field(alias="productAllocatedId")
    product_allocated_groups: list[ProductAllocatedGroupCreate] = Field(
        alias="productAllocatedGroups"
    )


ProductQuantityGroupsCreate = RootModel[list[ProductQuantityGroupCreate]]
