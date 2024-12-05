from pydantic import BaseModel, ConfigDict, RootModel, ValidationError
from app import models as m
from app.controllers.utils import replace_underscore
from app.database import db


class GroupAllocated(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    name: str
    rate: float
    assigned_to_inbound: bool
    assigned_to_outbound: bool
    excluded_from_global_increase: bool

    def validate_name(self, field):
        query = m.BillableGroup.select().where(m.BillableGroup.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This billable_group name is taken.")
        replace_underscore(self, field)


GroupAllocatedList = RootModel[list[GroupAllocated]]


class OutgoingStockBillableGroup(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    master_billable_group_id: int
    billable_group_id: int
    quantity: int
    total: float


OutgoingStockBillableGroupList = RootModel[list[OutgoingStockBillableGroup]]
