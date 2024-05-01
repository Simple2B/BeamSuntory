from flask_wtf import FlaskForm
from wtforms import StringField, HiddenField
from wtforms.validators import DataRequired


class PackageInfoForm(FlaskForm):
    next_url = StringField("next_url")
    inbound_order_id = HiddenField("inbound_order_id", [DataRequired()])
    received_products = StringField("Products", [DataRequired()])
