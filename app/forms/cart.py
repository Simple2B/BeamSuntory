from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db


class NewCartForm(FlaskForm):
    product_id = IntegerField("Product Id", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])

    submit = SubmitField("Save")

    # def validate_cart(self, field):
    #     query = m.Cart.select().where(m.Cart.order_numb == field.data)
    #     if db.session.scalar(query) is not None:
    #         raise ValidationError("This request already exist.")


class CartForm(FlaskForm):
    product_id = IntegerField("Store", [DataRequired()])
    comments = StringField("Comments")
    status = StringField("Status", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])

    submit = SubmitField("Save")

    # def validate_cart(self, field):
    #     query = m.Cart.select().where(m.Cart.order_numb == field.data)
    #     if db.session.scalar(query) is not None:
    #         raise ValidationError("This request already exist.")
