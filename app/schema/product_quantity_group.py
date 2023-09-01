from datetime import datetime, date
from pydantic import BaseModel, validator


class ProductQuantityGroup(BaseModel):
    product_id: int
    group_id: int
    quantity: int
    shelf_life_start: date
    shelf_life_end: date

    @validator("shelf_life_start", "shelf_life_end", pre=True)
    def validate_start_date(cls, value):
        return datetime.strptime(value, "%m/%d/%Y").date()


class ProductQuantityGroups(BaseModel):
    __root__: list[ProductQuantityGroup]
