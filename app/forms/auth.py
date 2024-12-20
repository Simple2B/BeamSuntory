from flask_wtf import FlaskForm
import sqlalchemy as sa
from wtforms import (
    StringField,
    PasswordField,
    SubmitField,
    ValidationError,
    BooleanField,
)
from wtforms.validators import DataRequired, Email, Length, EqualTo

from app.models import User
from app.database import db


class LoginForm(FlaskForm):
    user_id = StringField("Username", [DataRequired()])
    password = PasswordField("Password", [DataRequired()])
    submit = SubmitField("Login")


class RegistrationForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired(), Length(2, 30)])
    email = StringField("Email Address", validators=[DataRequired(), Email()])
    role = StringField("Role", validators=[DataRequired(), Length(2, 30)])
    password = PasswordField("Password", validators=[DataRequired(), Length(6, 30)])
    password_confirmation = PasswordField(
        "Confirm Password",
        validators=[
            DataRequired(),
            EqualTo("password", message="Password do not match."),
        ],
    )
    country = StringField("Country", [DataRequired()])
    region = StringField("Region", [DataRequired()])
    city = StringField("City", [DataRequired()])
    zip_code = StringField("Zip Code", [DataRequired()])
    street_address = StringField("Street Address", [DataRequired()])
    phone_number = StringField("Phone Number")
    activated = BooleanField("activated")
    approval_permission = BooleanField("activated")
    group = StringField("Group", [DataRequired()], default="Brand")
    sales_rep = BooleanField("Sales Rep")
    submit = SubmitField("Register")

    def validate_username(form, field):
        query = User.select().where(User.username == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This username is taken.")

    def validate_email(form, field):
        query = User.select().where(
            sa.func.lower(User.email) == sa.func.lower(field.data)
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This email is already registered.")


class ForgotForm(FlaskForm):
    email = StringField("Email Address", validators=[DataRequired(), Email()])

    def validate_email(self, email):
        query = sa.select(User).where(
            sa.func.lower(User.email) == sa.func.lower(email.data)
        )
        user = db.session.scalar(query)
        if not user:
            raise ValidationError("Email not found")


class ChangePasswordForm(FlaskForm):
    password = PasswordField(
        "Password",
        [
            DataRequired(),
            EqualTo("password_confirmation", message="Passwords must match"),
        ],
        render_kw={"placeholder": "Password"},
    )
    password_confirmation = PasswordField(
        "Repeat Password", render_kw={"placeholder": "Repeat Password"}
    )
    submit = SubmitField("Change password")
