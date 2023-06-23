from datetime import datetime
from enum import Enum
from pydantic import BaseModel


class ProductType(Enum):
    SIMPLE_PRODUCT = "Simple Product"
    VARIABLE_PRODUCT = "Variable Product"


class Currency(Enum):
    USD = "USD"
    CAD = "CAD"


class StockStatus(Enum):
    IN_STOCK = "In Stock"
    LOW_STOCK = "Low Stock"
    OUT_OF_STOCK = "Out of Stock"


class Premises(Enum):
    ON_PREMISE = "On Premise"
    OFF_PREMISE = "Off Premise"


class Product(BaseModel):
    id: int
    name: str
    type: ProductType
    # vendor: str # TODO do we need it
    currency: Currency
    regular_price: float
    retail_price: float
    image: str
    description: str
    # General Info ->
    SKU: str
    low_stock_level: int
    stock_status: StockStatus
    shelf_life: datetime
    program_year: int
    premises: Premises
    package_qty: int
    numb_of_items_per_case: int
    numb_of_casess_per_outer_case: int
    comments: str
    # shipping
    weight: float
    length: float
    width: float
    hight: float

    class Config:
        orm_mode = True
