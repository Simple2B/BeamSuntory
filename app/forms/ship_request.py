from flask_wtf import FlaskForm
from wtforms import (
    Form,
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
    TextAreaField,
    HiddenField,
)
from wtforms.validators import DataRequired

from app import models as m
from app.database import db


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


class ProductShipRequestForm(Form):
    cart_id = HiddenField("cart_id", [DataRequired()])
    warehouse_id = IntegerField("warehouse_id", [DataRequired()])
    note_location = StringField(
        "Note Location", default="", render_kw={"placeholder": "Note Location"}
    )


class ShipRequestOutgoingNotesForm(FlaskForm):
    ship_request_id = HiddenField("ship_request_id", [DataRequired()])
    wm_notes = TextAreaField(
        "Warehouse Manager Notes", render_kw={"placeholder": "commnets"}
    )
    proof_of_delivery = TextAreaField(
        "Proof of Delivery", render_kw={"placeholder": "Proof of Delivery"}
    )
    tracking = TextAreaField("Tracking", render_kw={"placeholder": "Tracking"})
    notes_locations_data = HiddenField(
        "Note Location", default="", render_kw={"placeholder": "Note Location"}
    )


class ShipRequestOutgoingForm(ShipRequestOutgoingNotesForm):
    cart_products_data = HiddenField("Cart Products Data", [DataRequired()])


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
