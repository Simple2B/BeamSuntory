from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db


class NewShipRequestForm(FlaskForm):
    store_category = StringField("Store", [DataRequired()])
    order_type = StringField("Order Type")
    store = StringField("Store", [DataRequired()])
    warehouse = StringField("Warehouse", [DataRequired()])

    submit = SubmitField("Save")

    def validate_ship_request(self, field):
        query = m.ShipRequest.select().where(m.ShipRequest.order_numb == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This request already exist.")
