from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
    TextAreaField,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db


class NewShipRequestForm(FlaskForm):
    store_category = IntegerField("Store", [DataRequired()])
    order_type = StringField("Order Type")
    store = IntegerField("Store", [DataRequired()])
    comment = StringField("Comment")
    event_date_range = StringField("Event Date Range")
    event_comment = StringField("Event Comment")

    submit = SubmitField("Save")

    def validate_ship_request(self, field):
        query = m.ShipRequest.select().where(m.ShipRequest.order_numb == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This request already exist.")


class ShipRequestForm(FlaskForm):
    next_url = StringField("next_url")
    ship_request_id = StringField("ship_request_id", [DataRequired()])
    # NOTE: Disable DataRequired for store_category while this field is missing in modal edit ship_request
    store_category = StringField("Store")
    order_type = StringField("Order Type")
    store = StringField("Store")
    status = StringField("Status")
    products = StringField("Products")
    wm_notes = StringField("Warehouse Manager Notes")
    da_notes = StringField("Delivery Agent Notes")
    proof_of_delivery = TextAreaField("Proof of Delivery")
    tracking = TextAreaField("Tracking")

    submit = SubmitField("Save")

    def validate_ship_request(self, field):
        query = m.ShipRequest.select().where(m.ShipRequest.order_numb == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This request already exist.")


class SortByStatusShipRequestForm(FlaskForm):
    sort_by = StringField("Sort by", [DataRequired()])
    submit = SubmitField("Submit")
