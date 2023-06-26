from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db


class GroupForm(FlaskForm):
    group_id = StringField("group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    master_group = StringField("Master Group", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.Group.select().where(m.Group.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This group name is taken.")


class NewGroupForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    master_group = StringField("Master Group", [DataRequired()])

    submit = SubmitField("Add group")

    def validate_group_name(self, field):
        query = m.Group.select().where(m.Group.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This group name is taken.")


class MasterGroupForm(FlaskForm):
    master_group_id = StringField("master_group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.MasterGroup.select().where(m.MasterGroup.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")


class NewMasterGroupForm(FlaskForm):
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.MasterGroup.select().where(m.MasterGroup.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")
