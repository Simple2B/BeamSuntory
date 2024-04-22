from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
)
from wtforms.validators import DataRequired

from app.controllers.utils import replace_underscore
from app import models as m
from app.database import db


class GroupProductForm(FlaskForm):
    next_url = StringField("next_url")
    group_product_id = StringField("group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    master_group = StringField("Master Group", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.GroupProduct.select().where(m.GroupProduct.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This group_for_product name is taken.")

    def validate_name(self, field):
        replace_underscore(self, field)


class NewGroupProductForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    master_group = StringField("Master Group", [DataRequired()])

    submit = SubmitField("Add group")

    def validate_group_name(self, field):
        query = m.GroupProduct.select().where(m.GroupProduct.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This group_for_product name is taken.")

    def validate_name(self, field):
        replace_underscore(self, field)


class MasterGroupProductForm(FlaskForm):
    next_url = StringField("next_url")
    master_group_product_id = StringField("master_group_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.name == field.data
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group_for_product name is taken.")

    def validate_name(self, field):
        replace_underscore(self, field)


class NewMasterGroupProductForm(FlaskForm):
    name = StringField("Name", [DataRequired()])

    submit = SubmitField("Save")

    def validate_group_name(self, field):
        query = m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.name == field.data
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This master group_for_product name is taken.")

    def validate_name(self, field):
        replace_underscore(self, field)
