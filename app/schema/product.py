from enum import Enum
from pydantic import BaseModel, ConfigDict, Field, RootModel, TypeAdapter
from pydantic.dataclasses import dataclass
from .supplier import Supplier
from .warehouse import Warehouse
from .warehouse_product import WarehouseProduct
from .product_group import ProductGroup


class CustomBase(BaseModel):
    def json(self, **kwargs):
        include = getattr(self.Config, "include", set())
        if len(include) == 0:
            include = None
        exclude = getattr(self.Config, "exclude", set())
        if len(exclude) == 0:
            exclude = None
        return super().model_dump_json(include=include, exclude=exclude, **kwargs)


class Currency(Enum):
    USD = "USD"
    CAD = "CAD"


class Product(CustomBase):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str

    supplier: Supplier | None
    supplier_id: int | None = Field(alias="supplierId")
    currency: Currency | None
    regular_price: float | None = Field(alias="regularPrice")
    retail_price: float | None = Field(alias="retailPrice")
    image: str | None
    description: str
    # General Info ->
    SKU: str
    low_stock_level: int | None = Field(alias="lowStockLevel")
    program_year: int | None = Field(alias="programYear")
    package_qty: int | None = Field(alias="packageQty")
    numb_of_items_per_case: int | None = Field(alias="numbOfItemsPerCase")
    numb_of_cases_per_outer_case: int | None = Field(alias="numbOfCasesPerOuterCase")
    warehouses: list[Warehouse]
    warehouse_products: list[WarehouseProduct] = Field(alias="warehouseProducts")
    product_groups: list["ProductGroup"] = Field(alias="productGroups")
    comments: str | None
    notes_location: str | None
    # shipping
    weight: float | None
    length: float | None
    width: float | None
    height: float | None


ProductWarehouseRoot = RootModel[list[WarehouseProduct]]


class ProductWarehouse(BaseModel):
    warehouse_product_id: int
    product_quantity: int


ProductWarehouseAdapter = TypeAdapter(list[ProductWarehouse])


class ProductWarehouses(BaseModel):
    product_warehouses: ProductWarehouseRoot


class UserGroup(BaseModel):
    group_name: str = Field(serialization_alias="groupName")


class UserGroups(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    master_group_name: str = Field(serialization_alias="masterGroupName")
    groups: list[UserGroup]


class WarehouseNameId(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str


class ProductGroups(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    group_id: int | None = Field(serialization_alias="groupId")
    group_name: str | None = Field(serialization_alias="groupName")


class MasterGroupsGroups(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    master_group: str = Field(serialization_alias="masterGroup")
    groups: list[ProductGroups]


class ProductAdditionalInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    current_user_groups: list[UserGroups] = Field(
        serialization_alias="currentUserGroups"
    )

    current_user_role: str = Field(serialization_alias="currentUserRole")
    all_warehouses: list[WarehouseNameId] = Field(serialization_alias="allWarehouses")
    master_groups_groups: list[MasterGroupsGroups] = Field(
        serialization_alias="masterGroupsGroups"
    )
    current_master_product_groups: list[MasterGroupsGroups] = Field(
        serialization_alias="currentMasterProductGroups"
    )


@dataclass
class ProductCSVItem:
    name: str
    description: str
    language: str
    sku: str
    brand: str
    categories: str
    regular_price: float
    retail_price: float
    available_quantity: int


class ProductFullImage(BaseModel):
    name: str
    image: str
    image_type: str = Field(alias="imageType")

    model_config = ConfigDict(populate_by_name=True)
