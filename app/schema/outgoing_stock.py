from pydantic import BaseModel, ConfigDict
from .ship_request import ShipRequestStatus


class CartNoteLocation(BaseModel):
    cart_id: int
    note_location: str = ""


class CartProductData(CartNoteLocation):
    warehouse_id: int


class OutgoingStockQueryParams(BaseModel):
    q: str | None = None
    status: ShipRequestStatus | str = ""

    model_config = ConfigDict(use_enum_values=True)


class OutgoingStockQueryParamsDownload(OutgoingStockQueryParams):
    ship_request_id: int | None = None
