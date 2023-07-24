from flask_wtf import FlaskForm
from wtforms import (
    SubmitField,
    IntegerField,
)
from wtforms.validators import DataRequired


class NewCartForm(FlaskForm):
    product_id = IntegerField("Product Id", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])

    submit = SubmitField("Save")


class CartForm(FlaskForm):
    cart_id = IntegerField("Store", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])

    submit = SubmitField("Save")
