from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
)
from wtforms.validators import DataRequired

from app.controllers.utils import replace_underscore
from app import models as m
from app.database import db


class GroupForm(FlaskForm):
    next_url = StringField("next_url")
    group_id = StringField("group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    master_group = StringField("Master Group", [DataRequired()])

    submit = SubmitField("Save")

    def validate_name(self, field):
        query = m.Group.select().where(
            m.Group.name == field.data, m.Group.id != int(self.group_id.data)
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This group name is taken.")
        replace_underscore(self, field)


class NewGroupForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    master_group = StringField("Master Group", [DataRequired()])

    submit = SubmitField("Add group")

    def validate_name(self, field):
        query = m.Group.select().where(m.Group.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This group name is taken.")
        replace_underscore(self, field)


class MasterGroupForm(FlaskForm):
    next_url = StringField("next_url")
    master_group_id = StringField("master_group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_name(self, field):
        query = m.MasterGroup.select().where(
            m.MasterGroup.name == field.data,
            m.MasterGroup.id != int(self.master_group_id.data),
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")
        replace_underscore(self, field)


class NewMasterGroupForm(FlaskForm):
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_name(self, field):
        query = m.MasterGroup.select().where(m.MasterGroup.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")
        replace_underscore(self, field)


class SubGroupForm(FlaskForm):
    next_url = StringField("next_url")
    group_id = IntegerField("Group", [DataRequired()])
    new_sub_group_id = IntegerField("Sub Group", [DataRequired()])
    parent_group_id = IntegerField("Parent Group", [DataRequired()])

    def validate_name(self, field):
        query = m.Group.select().where(m.Group.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This sub group name is taken.")

        replace_underscore(self, field)


class NewSubGroupForm(FlaskForm):
    sub_group_id = IntegerField("Sub Group", [DataRequired()])
    group_id = IntegerField("Group", [DataRequired()])

    def validate_name(self, field):
        query = m.Group.select().where(m.Group.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This sub group name is taken.")

        replace_underscore(self, field)
