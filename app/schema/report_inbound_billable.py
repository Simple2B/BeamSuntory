from datetime import datetime
from pydantic import BaseModel


class ReportInboundBillable(BaseModel):
    id: int
    title: str
    brand: str
    created_at: datetime
    total: float
