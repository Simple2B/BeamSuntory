from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db


class NewShipRequestForm(FlaskForm):
    # NOTE: commented while store does not exist
    # store = StringField("Store", [DataRequired()])
    store_category = StringField("Store", [DataRequired()])
    order_type = StringField("Order Type")
    supplier = StringField("Supplier", [DataRequired()])
    # NOTE: what field we need? delete unnecessary in the future
    # retail_price = FloatField("Retail price", [DataRequired()])
    # regular_price = FloatField("Regular price", [DataRequired()])

    submit = SubmitField("Save")

    def validate_ship_request(self, field):
        query = m.ShipRequest.select().where(m.ShipRequest.order_numb == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This request already exist.")
