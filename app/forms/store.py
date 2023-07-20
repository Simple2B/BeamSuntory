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


class StoreForm(FlaskForm):
    next_url = StringField("next_url")
    store_id = StringField("store_id", [DataRequired()])
    store_category = StringField("Store category", [DataRequired()])
    store_name = StringField("Name", [DataRequired()])
    contact_person = StringField("Contact person", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    phone_numb = StringField("Phone number", [DataRequired()])
    country = StringField("Country")
    region = StringField("Region")
    city = StringField("City")
    address = StringField("Address")
    zip = StringField("ZIP")
    active = BooleanField("active")

    submit = SubmitField("Save")

    def validate_store_name(self, field):
        query = (
            m.Store.select()
            .where(m.Store.store_name == field.data)
            .where(m.Store.id != int(self.store_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This store name is taken.")

    def validate_email(self, field):
        query = (
            m.Store.select()
            .where(m.Store.email == field.data)
            .where(m.Store.id != int(self.store_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class NewStoreForm(FlaskForm):
    store_category = StringField("Store category", [DataRequired()])
    store_name = StringField("Name", [DataRequired()])
    contact_person = StringField("Contact person", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    phone_numb = StringField("Phone number", [DataRequired()])
    country = StringField("Country")
    region = StringField("Region")
    city = StringField("City")
    address = StringField("Address")
    zip = StringField("ZIP")
    active = BooleanField("active")

    submit = SubmitField("Save")

    def validate_store_name(self, field):
        query = m.Store.select().where(m.Store.store_name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This store name is taken.")

    def validate_email(self, field):
        query = m.Store.select().where(m.Store.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")
