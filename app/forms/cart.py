from flask_wtf import FlaskForm
from wtforms import (
    SubmitField,
    IntegerField,
    HiddenField,
    ValidationError,
)
from wtforms.validators import DataRequired


class NewCartForm(FlaskForm):
    warehouse_product_id = HiddenField("Warehouse product", validators=[DataRequired()])
    quantity = IntegerField("Quantity", validators=[DataRequired()])
    submit = SubmitField("Save")

    def validate_quantity(form, field):
        if not field.data:
            raise ValidationError("Quantity cannot be zero")


class CartForm(FlaskForm):
    cart_id = IntegerField("Store", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])

    submit = SubmitField("Save")

    def validate_quantity(form, field):
        if not field.data:
            raise ValidationError("Quantity cannot be zero")
