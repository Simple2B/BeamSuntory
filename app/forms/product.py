from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
    FloatField,
    FileField,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db
from .utils import JSONField


class ProductForm(FlaskForm):
    next_url = StringField("next_url")
    product_id = StringField("product_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    product_type = StringField("Product type", [DataRequired()])
    supplier = IntegerField("Supplier ID", [DataRequired()])
    currency = StringField("Currency", [DataRequired()])
    regular_price = FloatField("Regular price", [DataRequired()])
    retail_price = FloatField("Retail price", [DataRequired()])
    image = FileField("Image", [DataRequired()])  # link or png base64 str??
    description = StringField("Description", [DataRequired()])
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])
    low_stock_level = IntegerField("Low stock level", [DataRequired()])
    shelf_life_start = StringField("Shelf life start", [DataRequired()])
    shelf_life_end = StringField("Shelf life end", [DataRequired()])
    program_year = IntegerField("Program year", [DataRequired()])
    premises = StringField("Premises", [DataRequired()])
    package_qty = IntegerField("Package qty", [DataRequired()])
    numb_of_items_per_case = IntegerField("Number of items per case", [DataRequired()])
    numb_of_cases_per_outer_case = IntegerField(
        "Number of cases per outer case", [DataRequired()]
    )
    comments = StringField("Comments", [DataRequired()])
    # shipping
    weight = FloatField("Weight", [DataRequired()])
    length = FloatField("Length", [DataRequired()])
    width = FloatField("Width", [DataRequired()])
    height = FloatField("Height", [DataRequired()])

    submit = SubmitField("Save")

    def validate_product_name(self, field):
        query = m.Product.select().where(m.Product.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This product name is taken.")


class NewProductForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    product_type = StringField("Product type", [DataRequired()])
    supplier = IntegerField("Supplier ID", [DataRequired()])
    currency = StringField("Currency", [DataRequired()])
    regular_price = FloatField("Regular price", [DataRequired()])
    retail_price = FloatField("Retail price", [DataRequired()])
    image = FileField("Image", [DataRequired()])  # link or png base64 str??
    description = StringField("Description", [DataRequired()])
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])
    low_stock_level = IntegerField("Low stock level", [DataRequired()])
    shelf_life_start = StringField("Shelf life start", [DataRequired()])
    shelf_life_end = StringField("Shelf life end", [DataRequired()])
    program_year = IntegerField("Program year", [DataRequired()])
    premises = StringField("Premises", [DataRequired()])
    package_qty = IntegerField("Package qty", [DataRequired()])
    numb_of_items_per_case = IntegerField("Number of items per case", [DataRequired()])
    numb_of_cases_per_outer_case = IntegerField(
        "Number of cases per outer case", [DataRequired()]
    )
    comments = StringField("Comments", [DataRequired()])
    # shipping
    weight = FloatField("Weight", [DataRequired()])
    length = FloatField("Length", [DataRequired()])
    width = FloatField("Width", [DataRequired()])
    height = FloatField("Height", [DataRequired()])

    submit = SubmitField("Add product")

    def validate_product_name(self, field):
        query = m.Product.select().where(m.Product.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This product name is taken.")


class SortByGroupProductForm(FlaskForm):
    # sort_by = JSONField("Sort by", [DataRequired()])
    sort_by = JSONField("Sort by", [DataRequired()])
    submit = SubmitField("Submit")
