from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
)
from wtforms.validators import DataRequired
from app import models as m
from app import db


class DivisionForm(FlaskForm):
    next_url = StringField("next_url")
    division_id = StringField("division_id", [DataRequired()])
    role_name = StringField("Role Name")
    type = StringField("Role type")
    parent_role = StringField("Parent Role")
    status = StringField("Status")

    submit = SubmitField("Save")

    def validate_division_name(self, field):
        query = m.Division.select().where(m.Division.role_name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This role name is taken.")


class NewDivisionForm(FlaskForm):
    next_url = StringField("next_url")
    role_name = StringField("Role Name", [DataRequired()])
    type = StringField("Role type", [DataRequired()])
    parent_role = StringField("Parent Role")
    status = StringField("Status", [DataRequired()])

    submit = SubmitField("Save")

    def validate_division_name(self, field):
        query = m.Division.select().where(m.Division.role_name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This role name is taken.")
