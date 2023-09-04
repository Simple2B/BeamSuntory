from datetime import date, datetime
from pydantic import BaseModel, validator


class ProductAllocated(BaseModel):
    id: int
    quantity: int
    shelf_life_start: date
    shelf_life_end: date

    @validator("shelf_life_start", "shelf_life_end", pre=True)
    def validate_dates(cls, value):
        return (
            datetime.strptime(value, "%m/%d/%Y").date()
            if value
            else datetime.now().date()
        )


class ProductAllocatedList(BaseModel):
    __root__: list[ProductAllocated]
