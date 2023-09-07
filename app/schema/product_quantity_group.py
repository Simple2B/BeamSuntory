from pydantic import BaseModel, Field


class ProductQuantityGroup(BaseModel):
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    quantity: int

    class Config:
        allow_population_by_field_name = True


class ProductQuantityGroups(BaseModel):
    __root__: list[ProductQuantityGroup]


class ProductAllocatedGroupCreate(BaseModel):
    group_id: int = Field(alias="groupId")
    quantity: int = Field(ge=0)

    class Config:
        allow_population_by_field_name = True


class ProductQuantityGroupCreate(BaseModel):
    product_allocated_id: int = Field(alias="productAllocatedId")
    product_allocated_groups: list[ProductAllocatedGroupCreate] = Field(
        alias="productAllocatedGroups"
    )

    class Config:
        allow_population_by_field_name = True


class ProductQuantityGroupsCreate(BaseModel):
    __root__: list[ProductQuantityGroupCreate]
