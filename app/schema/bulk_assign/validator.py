from typing import List
from pydantic import BaseModel


class ValidateBulkAssignResult(BaseModel):
    errors: dict
    assigns: List[dict] = []
