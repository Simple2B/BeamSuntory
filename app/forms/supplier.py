from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    BooleanField,
)
from wtforms.validators import DataRequired, Email

from app import models as m
from app import db


class SupplierForm(FlaskForm):
    next_url = StringField("next_url")
    supplier_id = StringField("supplier_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    contact_number = StringField("Contact number", [DataRequired()])
    country = StringField("Country")
    region = StringField("Region")
    city = StringField("City")
    address = StringField("Address")
    zip = StringField("ZIP")
    active = BooleanField("active")

    submit = SubmitField("Save")

    def validate_username(self, field):
        query = (
            m.Supplier.select()
            .where(m.Supplier.username == field.data)
            .where(m.Supplier.id != int(self.supplier_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This username is taken.")

    def validate_email(self, field):
        query = (
            m.Supplier.select()
            .where(m.Supplier.email == field.data)
            .where(m.Supplier.id != int(self.supplier_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class NewSupplierForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    contact_number = StringField("Contact number", [DataRequired()])
    country = StringField("Country")
    region = StringField("Region")
    city = StringField("City")
    address = StringField("Address")
    zip = StringField("ZIP")
    active = BooleanField("active")

    submit = SubmitField("Save")

    def validate_username(self, field):
        query = m.Supplier.select().where(m.Supplier.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This name is taken.")

    def validate_email(self, field):
        query = m.Supplier.select().where(m.Supplier.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")
