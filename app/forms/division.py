from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    BooleanField,
)
from wtforms.validators import DataRequired
from app import models as m
from app.database import db


class DivisionForm(FlaskForm):
    next_url = StringField("next_url")
    division_id = StringField("division_id", [DataRequired()])
    role_name = StringField("Role Name")
    activated = BooleanField("activated")

    submit = SubmitField("Save")

    def validate_role_name(self, field):
        query = (
            m.Division.select()
            .where(m.Division.role_name == field.data)
            .where(m.Division.id != int(self.division_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This role name is taken.")


class NewDivisionForm(FlaskForm):
    next_url = StringField("next_url")
    role_name = StringField("Role Name", [DataRequired()])
    activated = BooleanField("activated")

    submit = SubmitField("Save")

    def validate_role_name(self, field):
        query = m.Division.select().where(m.Division.role_name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This role name is taken.")
