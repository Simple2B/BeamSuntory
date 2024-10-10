from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
)
from wtforms.validators import DataRequired, Length
import sqlalchemy as sa

from app.controllers.utils import replace_underscore
from app import models as m
from app.database import db


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


class NewStoreMasterGroupForm(FlaskForm):
    name = StringField(
        "Name",
        [DataRequired(), Length(1, 64)],
    )

    submit = SubmitField("Save")

    def validate_name(self, field):
        query = sa.select(m.StoreMasterGroup).where(
            m.StoreMasterGroup.name == field.data
        )

        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")


class EditStoreMasterGroupForm(NewStoreMasterGroupForm):
    store_master_group_uuid = StringField("store_master_group_uuid", [DataRequired()])

    def validate_name(self, field):
        query = sa.select(m.StoreMasterGroup).where(
            m.StoreMasterGroup.name == field.data,
            m.StoreMasterGroup.uuid != self.store_master_group_uuid.data,
        )

        if db.session.scalar(query) is not None:
            raise ValidationError("This master group name is taken.")


# class SubGroupForm(FlaskForm):
#     next_url = StringField("next_url")
#     group_id = IntegerField("Group", [DataRequired()])
#     new_sub_group_id = IntegerField("Sub Group", [DataRequired()])
#     parent_group_id = IntegerField("Parent Group", [DataRequired()])

#     def validate_name(self, field):
#         query = m.Group.select().where(m.Group.name == field.data)
#         if db.session.scalar(query) is not None:
#             raise ValidationError("This sub group name is taken.")

#         replace_underscore(self, field)


# class NewSubGroupForm(FlaskForm):
#     sub_group_id = IntegerField("Sub Group", [DataRequired()])
#     group_id = IntegerField("Group", [DataRequired()])

#     def validate_name(self, field):
#         query = m.Group.select().where(m.Group.name == field.data)
#         if db.session.scalar(query) is not None:
#             raise ValidationError("This sub group name is taken.")

#         replace_underscore(self, field)
