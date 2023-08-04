from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, ValidationError, BooleanField
from wtforms.validators import DataRequired

from app import models as m
from app import db


class StoreCategoryForm(FlaskForm):
    next_url = StringField("next_url")
    store_category_id = StringField("store_category_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    parent_category = StringField("Parent category")
    active = BooleanField("Status", [DataRequired()])
    image = StringField("Image", [DataRequired()])

    submit = SubmitField("Save")

    def validate_store_category_name(self, field):
        query = m.StoreCategory.select().where(m.StoreCategory.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This store category name is taken.")


class NewStoreCategoryForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    parent_category = StringField("Parent category")
    active = BooleanField("Status", [DataRequired()])
    image = StringField("Image", [DataRequired()])

    submit = SubmitField("Add product")

    def validate_store_category_name(self, field):
        query = m.StoreCategory.select().where(m.StoreCategory.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This store category name is taken.")
