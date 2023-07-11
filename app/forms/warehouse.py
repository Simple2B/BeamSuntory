from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db


class WarehouseForm(FlaskForm):
    next_url = StringField("next_url")
    warehouse_id = StringField("warehouse_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    phone_number = StringField("Phone number", [DataRequired()])
    city = StringField("City", [DataRequired()])
    zip = StringField("ZIP", [DataRequired()])
    address = StringField("Address", [DataRequired()])
    manager_id = StringField("Manager ID", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.Warehouse.select().where(m.Warehouse.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")


class NewWarehouseForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    phone_number = StringField("Phone number", [DataRequired()])
    city = StringField("City", [DataRequired()])
    zip = StringField("ZIP", [DataRequired()])
    address = StringField("Address", [DataRequired()])
    manager_id = StringField("Manager ID", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.Warehouse.select().where(m.Warehouse.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")
