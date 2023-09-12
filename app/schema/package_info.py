from pydantic import BaseModel, Field


class PackageInfo(BaseModel):
    product_quantity_group_id: int = Field(alias="productQuantityGroupId")
    quantity_per_wrap: int = Field(alias="quantityPerWrap")
    quantity_wrap_carton: int = Field(alias="quantityWrapCarton")
    quantity_carton_master: int = Field(alias="quantityCartonMaster")
    quantity_received: int = Field(alias="quantityReceived")

    class Config:
        allow_population_by_field_name = True
        orm_mode = True


class IncomingStockProduct(BaseModel):
    allocated_product_id: int = Field(alias="allocatedProductId")
    packages: list[PackageInfo]

    class Config:
        allow_population_by_field_name = True


class IncomingStocks(BaseModel):
    __root__: list[IncomingStockProduct]

    class Config:
        allow_population_by_field_name = True
