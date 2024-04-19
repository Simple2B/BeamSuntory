from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    BooleanField,
    IntegerField,
    HiddenField,
)
from wtforms.validators import DataRequired, Email

from app import models as m
from app import db


class StoreForm(FlaskForm):
    next_url = StringField("next_url")
    store_id = HiddenField("store_id", [DataRequired()])
    category_id = IntegerField("Store category", [DataRequired()])
    store_name = StringField("Name", [DataRequired()])
    contact_person = StringField("Contact person", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    phone_numb = StringField("Phone number", [DataRequired()])
    country = StringField("Country")
    region = StringField("Region")
    city = StringField("City")
    address = StringField("Address", [DataRequired()])
    zip = StringField("ZIP")
    active = BooleanField("active")

    submit = SubmitField("Save")

    # def validate_address(self, field):
    #     query = (
    #         m.Store.select()
    #         .where(m.Store.address == field.data)
    #         .where(m.Store.id != int(self.store_id.data))
    #     )
    #     if db.session.scalar(query) is not None:
    #         raise ValidationError("This store address is taken.")


class NewStoreForm(FlaskForm):
    category_id = IntegerField("Store category", [DataRequired()])
    store_name = StringField("Name", [DataRequired()])
    contact_person = StringField("Contact person", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    phone_numb = StringField("Phone number", [DataRequired()])
    country = StringField("Country")
    region = StringField("Region")
    city = StringField("City")
    address = StringField("Address", [DataRequired()])
    zip = StringField("ZIP")
    active = BooleanField("active")

    submit = SubmitField("Save")

    # def validate_address(self, field):
    #     query = m.Store.select().where(m.Store.address == field.data)
    #     if db.session.scalar(query) is not None:
    #         raise ValidationError("This store address is taken.")
