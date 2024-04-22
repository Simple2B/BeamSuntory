import os
from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    PasswordField,
    SubmitField,
    ValidationError,
    BooleanField,
)
from wtforms.validators import DataRequired, Email, EqualTo

from app import models as m
from app.database import db

DEFAULT_USER_PASSWORD = os.environ.get("DEFAULT_USER_PASSWORD")


class UserForm(FlaskForm):
    next_url = StringField("next_url")
    user_id = StringField("user_id", [DataRequired()])
    email = StringField("email", [DataRequired(), Email()])
    activated = BooleanField("activated")
    approval_permission = BooleanField("activated")
    group = StringField("Group")
    username = StringField("Username", [DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Password do not match."),
        ],
    )
    role = StringField("Role", validators=[DataRequired()])
    country = StringField("Country", [DataRequired()])
    region = StringField("Region", [DataRequired()])
    city = StringField("City", [DataRequired()])
    zip_code = StringField("Zip Code", [DataRequired()])
    street_address = StringField("Street Address", [DataRequired()])
    phone_number = StringField("Phone Number")
    submit = SubmitField("Save")
    sales_rep = BooleanField("Sales Rep")

    def validate_username(self, field):
        query = (
            m.User.select()
            .where(m.User.username == field.data)
            .where(m.User.id != int(self.user_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This username is taken.")

    def validate_email(self, field):
        query = (
            m.User.select()
            .where(m.User.email == field.data)
            .where(m.User.id != int(self.user_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class NewUserForm(FlaskForm):
    email = StringField("email", [DataRequired(), Email()])
    activated = BooleanField("activated")
    approval_permission = BooleanField("activated")
    group = StringField("Group")
    username = StringField("Username", [DataRequired()])
    password = PasswordField(
        "Password",
        default=DEFAULT_USER_PASSWORD,
    )
    password_confirmation = PasswordField(
        "Confirm Password",
        default=DEFAULT_USER_PASSWORD,
    )
    role = StringField("Role", validators=[DataRequired()])
    country = StringField("Country", [DataRequired()])
    region = StringField("Region", [DataRequired()])
    city = StringField("City", [DataRequired()])
    zip_code = StringField("Zip Code", [DataRequired()])
    street_address = StringField("Street Address", [DataRequired()])
    phone_number = StringField("Phone Number")
    sales_rep = BooleanField("Sales Rep")
    # locker data
    locker_country = StringField("Locker Country")
    locker_region = StringField("Locker Region")
    locker_city = StringField("Locker City")
    locker_zip_code = StringField("Locker Zip Code")
    locker_street_address = StringField("Locker Street Address")

    submit = SubmitField("Save")

    def validate_username(self, field):
        query = m.User.select().where(m.User.username == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This username is taken.")

    def validate_email(self, field):
        query = m.User.select().where(m.User.email == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")
