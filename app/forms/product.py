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
    image = FileField("Image")
    description = StringField("Description", [DataRequired()])
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])
    low_stock_level = IntegerField("Low stock level", [DataRequired()])
    shelf_life_start = StringField("Shelf life start", [DataRequired()])
    shelf_life_end = StringField("Shelf life end", [DataRequired()])
    program_year = IntegerField("Program year", [DataRequired()])
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
    image = FileField("Image")
    description = StringField("Description", [DataRequired()])
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])
    low_stock_level = IntegerField("Low stock level", [DataRequired()])
    shelf_life_start = StringField("Shelf life start", [DataRequired()])
    shelf_life_end = StringField("Shelf life end", [DataRequired()])
    program_year = IntegerField("Program year", [DataRequired()])
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
    sort_by = JSONField("Sort by", [DataRequired()])
    submit = SubmitField("Submit")


class AssignProductForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    master_group = IntegerField("Master group", [DataRequired()])
    group = IntegerField("Group", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])
    from_group = StringField("From Group", [DataRequired()])

    submit = SubmitField("Add product")


class RequestShareProductForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    group_id = IntegerField("Group", [DataRequired()])
    SKU = StringField("Name", [DataRequired()])
    available_quantity = IntegerField("Available Quantity", [DataRequired()])
    desire_quantity = IntegerField("Desire Quantity", [DataRequired()])
    from_group = StringField("From Group", [DataRequired()])

    submit = SubmitField("Add product")


class DepleteProductForm(FlaskForm):
    product_id = IntegerField("Product ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])
    group_id = IntegerField("Group ID", [DataRequired()])
    # NOTE: quantity is passed as string because 0 does not validate
    quantity = StringField("Quantity", [DataRequired()])

    submit = SubmitField("Submit")
