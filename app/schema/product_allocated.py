from datetime import date, datetime
from pydantic import BaseModel, Field, RootModel, ConfigDict, field_validator

from .product import IbOrderProduct
from .product_group import ProductGroupOut
from .pagination import PaginationOut


class ProductAllocatedNoteLocation(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    product_id: int = Field(alias="productId")
    note_location: str = Field("", alias="noteLocation")


class ProductAllocated(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity: int
    shelf_life_start: date = Field(alias="shelfLifeStart")
    shelf_life_end: date = Field(alias="shelfLifeEnd")

    @field_validator("shelf_life_start", mode="before")
    def validate_start_date(cls, value):
        return (
            datetime.strptime(value, "%m/%d/%Y").date()
            if value
            else datetime.now().date()
        )

    @field_validator("shelf_life_end", mode="before")
    def validate_end_date(cls, value):
        # NOTE until self_lif_end default value is not defined
        # we use "01/01/5000" as default value
        return (
            datetime.strptime(value, "%m/%d/%Y").date()
            if value
            else datetime.strptime("01/01/5000", "%m/%d/%Y").date()
        )


class ProductAllocatedOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    quantity: int
    shelf_life_start: date = Field(alias="shelfLifeStart")
    shelf_life_end: date = Field(alias="shelfLifeEnd")
    product: IbOrderProduct
    product_quantity_groups: list[ProductGroupOut] = Field(
        alias="productQuantityGroups"
    )
    quantity_received: int | None = Field(alias="quantityReceived", default=None)


ProductAllocatedList = RootModel[list[ProductAllocated]]


class ProductShellLifeOut(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    numb_of_day_left: int = Field(alias="numbOfDayLeft")
    SKU: str
    qty: int
    name: str
    expiry_date: str | datetime = Field("N/A", alias="expireDate")


class ReportShelfLifeResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)
    pagination: PaginationOut
    reports: list[ProductShellLifeOut] = Field(alias="reportShelfLifeList")


ReportShelfLifeList = RootModel[list[ProductAllocatedOut]]
