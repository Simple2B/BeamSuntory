from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class PackageInfoForm(FlaskForm):
    next_url = StringField("next_url")
    inbound_order_id = StringField("inbound_order_id", [DataRequired()])
    quantity_per_wrap = IntegerField("quantity_per_wrap", [DataRequired()])
    quantity_wrap_carton = IntegerField("quantity_wrap_carton", [DataRequired()])
    quantity_carton_master = IntegerField("quantity_carton_master", [DataRequired()])
    received_products = StringField("Products", [DataRequired()])

    submit = SubmitField("Save")
