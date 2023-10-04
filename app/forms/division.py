from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    BooleanField,
)
from wtforms.validators import DataRequired
from app import models as m
from app import db


class DivisionForm(FlaskForm):
    next_url = StringField("next_url")
    division_id = StringField("division_id", [DataRequired()])
    role_name = StringField("Role Name")
    activated = BooleanField("activated")

    submit = SubmitField("Save")

    def validate_role_name(self, field):
        query = (
            m.Role.select()
            .where(m.Role.name == field.data)
            .where(m.Role.id != int(self.division_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This role name is taken.")


class NewDivisionForm(FlaskForm):
    next_url = StringField("next_url")
    role_name = StringField("Role Name", [DataRequired()])
    activated = BooleanField("activated")

    submit = SubmitField("Save")

    def validate_role_name(self, field):
        query = m.Role.select().where(m.Role.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This role name is taken.")
