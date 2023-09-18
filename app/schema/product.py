from enum import Enum
from pydantic import BaseModel, ConfigDict, Field
from .supplier import Supplier
from .warehouse import Warehouse


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
    comments: str | None
    # shipping
    weight: float | None
    length: float | None
    width: float | None
    height: float | None
