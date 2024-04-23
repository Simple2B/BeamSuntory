from pydantic import BaseModel, ConfigDict, Field
from .group import Group
from .group_for_product import GroupProduct


class PackageInfoOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    quantity_per_wrap: int = Field(alias="quantityPerWrap")
    quantity_wrap_carton: int = Field(alias="quantityWrapCarton")
    quantity_carton_master: int | None = Field(
        default=None, alias="quantityCartonMaster"
    )


class ProductGroup(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    product_id: int = Field(alias="productId")
    group_id: int = Field(alias="groupId")
    parent: GroupProduct


class ProductGroupOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    group: Group
    quantity: int
    package_info: PackageInfoOut | None = Field(alias="packageInfo")
