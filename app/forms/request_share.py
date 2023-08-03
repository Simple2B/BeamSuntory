from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class RequestShareForm(FlaskForm):
    next_url = StringField("next_url")
    request_share_id = StringField("request_share_id", [DataRequired()])
    product_id = StringField("Product")
    group_id = IntegerField("Group")
    desire_quantity = IntegerField("Desire Quantity", [DataRequired()])
    status = StringField("Status")

    submit = SubmitField("Save")
