from pydantic import BaseModel, Field, ConfigDict, RootModel


class Warehouse(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    id: int
    name: str
    phone_number: str = Field(alias="phoneNumber")
    city: str
    zip: str  # TODO zip or zip_code?
    address: str
    manager_id: int = Field(alias="managerId")


WarehouseList = RootModel[list[Warehouse]]
