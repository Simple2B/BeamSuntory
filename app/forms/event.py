from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class EventFormCreate(FlaskForm):
    next_url = StringField("next_url")
    product_id = IntegerField("Product ID", [DataRequired()])
    date_from = StringField("Date from", [DataRequired()])
    date_to = StringField("Date to", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])
    comment = StringField("Comment")
