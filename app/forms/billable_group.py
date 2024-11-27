from flask_wtf import FlaskForm
from pydantic import BaseModel, ConfigDict, RootModel
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    BooleanField,
    FloatField,
)
from wtforms.validators import DataRequired

from app.controllers.utils import replace_underscore
from app import models as m
from app.database import db


class BillableGroupForm(FlaskForm):
    billable_group_id = StringField("group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    rate = FloatField("Rate", [DataRequired()])
    master_billable_group_id = StringField("Master Billable Group", [DataRequired()])

    assigned_to_inbound = BooleanField("Assigned To Inbound")
    assigned_to_outbound = BooleanField("Assigned To Outbound")

    submit = SubmitField("Add group")

    def validate_name(self, field):
        query = m.BillableGroup.select().where(m.BillableGroup.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This billable_group name is taken.")
        replace_underscore(self, field)


class NewBillableGroupForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    master_billable_group_id = StringField("Master Billable Group", [DataRequired()])
    rate = FloatField("Rate", [DataRequired()])

    assigned_to_inbound = BooleanField("Assigned To Inbound")
    assigned_to_outbound = BooleanField("Assigned To Outbound")

    submit = SubmitField("Add group")

    def validate_name(self, field):
        query = m.BillableGroup.select().where(m.BillableGroup.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This billable_group name is taken.")
        replace_underscore(self, field)


class MasterBillableGroupForm(FlaskForm):
    master_billable_group_id = StringField("master_group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_name(self, field):
        query = m.MasterBillableGroup.select().where(
            m.MasterBillableGroup.name == field.data,
            m.MasterBillableGroup.id != self.master_billable_group_id.data,
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This master billable group name is taken.")
        replace_underscore(self, field)


class NewMasterBillableGroupForm(FlaskForm):
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_name(self, field):
        query = m.MasterBillableGroup.select().where(
            m.MasterBillableGroup.name == field.data
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This master billable group name is taken.")

        replace_underscore(self, field)


class GroupAllocated(BaseModel):
    model_config = ConfigDict(from_attributes=True, populate_by_name=True)

    name: str
    rate: float
    assigned_to_inbound: bool
    assigned_to_outbound: bool

    def validate_name(self, field):
        query = m.BillableGroup.select().where(m.BillableGroup.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This billable_group name is taken.")
        replace_underscore(self, field)


GroupAllocatedList = RootModel[list[GroupAllocated]]
