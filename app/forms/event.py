from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired


class EventFormCreate(FlaskForm):
    next_url = StringField("next_url")
    product_id = IntegerField("Product ID", [DataRequired()])
    # date_from = StringField("Date from", [DataRequired()])
    # date_to = StringField("Date to", [DataRequired()])
    date_range = StringField("Date range", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])
    cart_id = IntegerField("Cart ID", [DataRequired()])
    comment = StringField("Comment")


class EventUpdateReservedDaysAmount(FlaskForm):
    next_url = StringField("next_url")
    event_id = IntegerField("event_id", [DataRequired()])
    date_reserve_to = DateField(
        "Reserved days to:", [DataRequired()], format="%m/%d/%Y"
    )
