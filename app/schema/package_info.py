from pydantic import BaseModel, Field, RootModel, ConfigDict


class PackageInfo(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    product_quantity_group_id: int = Field(alias="productQuantityGroupId")
    quantity_per_wrap: int = Field(alias="quantityPerWrap")
    quantity_wrap_carton: int = Field(alias="quantityWrapCarton")
    quantity_carton_master: int | None = Field(
        default=None, alias="quantityCartonMaster"
    )
    quantity_received: int = Field(alias="quantityReceived")


class IncomingStockProduct(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    allocated_product_id: int = Field(alias="allocatedProductId")
    packages: list[PackageInfo]


IncomingStocks = RootModel[list[IncomingStockProduct]]


# class IncomingStocks(BaseModel):
#     __root__: list[IncomingStockProduct]

#     class Config:
#         allow_population_by_field_name = True
