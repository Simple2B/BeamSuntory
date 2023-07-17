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


class DeliveryAgentForm(FlaskForm):
    next_url = StringField("next_url")
    delivery_agent_id = StringField("delivery_agent_id", [DataRequired()])
    first_name = StringField("First name", [DataRequired()])
    last_name = StringField("Last name", [DataRequired()])
    username = StringField("Username", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    contact_number = StringField("Contact number", [DataRequired()])
    street_address = StringField("Street Address", [DataRequired()])
    active = BooleanField("active")

    submit = SubmitField("Save")

    def validate_username(self, field):
        query = (
            m.User.select()
            .where(m.User.username == field.data)
            .where(m.User.id != int(self.delivery_agent_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This username is taken.")

    def validate_email(self, field):
        query = (
            m.User.select()
            .where(m.User.email == field.data)
            .where(m.User.id != int(self.delivery_agent_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class NewDeliveryAgentForm(FlaskForm):
    first_name = StringField("First name", [DataRequired()])
    last_name = StringField("Last name", [DataRequired()])
    username = StringField("Username", [DataRequired()])
    email = StringField("Email", [DataRequired(), Email()])
    contact_number = StringField("Contact number", [DataRequired()])
    street_address = StringField("Street Address", [DataRequired()])
    active = BooleanField("active")

    submit = SubmitField("Save")

    def validate_username(self, field):
        query = m.User.select().where(m.User.username == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This username is taken.")

    def validate_email(self, field):
        query = m.User.select().where(m.User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")
