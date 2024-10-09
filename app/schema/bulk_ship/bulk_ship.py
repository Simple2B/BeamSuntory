import enum
from typing import List
from pydantic import BaseModel, ConfigDict, Field, TypeAdapter


class BulkShipStatus(enum.Enum):
    DRAFT = "DRAFT"
    SHIPPED = "SHIPPED"
