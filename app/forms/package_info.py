from flask_wtf import FlaskForm
from wtforms import HiddenField
from wtforms.validators import DataRequired


class PackageInfoForm(FlaskForm):
    inbound_order_id = HiddenField("inbound_order_id", [DataRequired()])
    received_products = HiddenField("Products", [DataRequired()])
