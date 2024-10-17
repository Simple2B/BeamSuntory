from typing import List
from pydantic import BaseModel, Field


class WhProduct(BaseModel):
    sku: str
    group: str
    qty: int = Field(ge=0)
    store_category: str = ""
    store_name: str
    group_id: int = 0
    product_id: int = 0
    store_id: int = 0
    store_category_id: int = 0


class ValidateBulkShipResult(BaseModel):
    errors: dict
    wh_products: List[WhProduct] = []
    new_stores_ids: List[int] = []
