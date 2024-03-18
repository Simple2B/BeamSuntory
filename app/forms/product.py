from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
    FloatField,
    FileField,
)
from wtforms.validators import DataRequired, Optional
import filetype

from app import models as m
from app import db


class ProductForm(FlaskForm):
    next_url = StringField("next_url")
    product_id = StringField("product_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    supplier = IntegerField("Supplier ID", validators=[Optional()])
    currency = StringField("Currency", validators=[Optional()])
    regular_price = FloatField("Regular price", validators=[Optional()])
    retail_price = FloatField("Retail price", validators=[Optional()])
    image = FileField("Image", validators=[Optional()])
    description = StringField("Description", [DataRequired()])
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])
    low_stock_level = IntegerField("Low stock level", validators=[Optional()])
    program_year = IntegerField("Program year", validators=[Optional()])
    package_qty = IntegerField("Package qty", validators=[Optional()])
    numb_of_items_per_case = IntegerField(
        "Number of items per case", validators=[Optional()]
    )
    numb_of_cases_per_outer_case = IntegerField(
        "Number of cases per outer case", validators=[Optional()]
    )
    comments = StringField("Comments", validators=[Optional()])
    notes_location = StringField("Notes Location", validators=[Optional()])
    # shipping
    weight = FloatField("Weight", validators=[Optional()])
    length = FloatField("Length", validators=[Optional()])
    width = FloatField("Width", validators=[Optional()])
    height = FloatField("Height", validators=[Optional()])
    # json groups
    product_groups = StringField("Groups", [DataRequired()])

    submit = SubmitField("Save")

    def validate_image(self, field):
        if field.data.content_type == "application/octet-stream":
            return
        is_file = filetype.guess(field.data)
        if not is_file or not filetype.is_image(field.data):
            raise ValidationError("File must be an image")

    def validate_SKU(self, field):
        query = m.Product.select().where(
            m.Product.SKU == field.data, m.Product.id != int(self.product_id.data)
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This SKU is taken.")

    def validate_name(self, field):
        query = m.Product.select().where(
            m.Product.name == field.data, m.Product.id != int(self.product_id.data)
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This product name is taken.")


class NewProductForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    supplier = IntegerField("Supplier ID", validators=[Optional()])
    currency = StringField("Currency", validators=[Optional()])
    regular_price = FloatField("Regular price", validators=[Optional()])
    retail_price = FloatField("Retail price", validators=[Optional()])
    image = FileField("Image", validators=[Optional()])
    description = StringField("Description", [DataRequired()])
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])
    low_stock_level = IntegerField("Low stock level", validators=[Optional()])
    program_year = IntegerField("Program year", validators=[Optional()])
    package_qty = IntegerField("Package qty", validators=[Optional()])
    numb_of_items_per_case = IntegerField(
        "Number of items per case", validators=[Optional()]
    )
    numb_of_cases_per_outer_case = IntegerField(
        "Number of cases per outer case", validators=[Optional()]
    )
    comments = StringField("Comments", validators=[Optional()])
    # shipping
    weight = FloatField("Weight", validators=[Optional()])
    length = FloatField("Length", validators=[Optional()])
    width = FloatField("Width", validators=[Optional()])
    height = FloatField("Height", validators=[Optional()])
    # json groups
    product_groups = StringField("Groups", [DataRequired()])

    submit = SubmitField("Add product")

    def validate_SKU(self, field):
        query = m.Product.select().where(m.Product.SKU == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This SKU is taken.")

    def validate_name(self, field):
        query = m.Product.select().where(m.Product.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This product name is taken.")

    def validate_image(self, field):
        if field.data.content_type == "application/octet-stream":
            return
        is_file = filetype.guess(field.data)
        if not is_file or not filetype.is_image(field.data):
            raise ValidationError("File must be an image")


class AssignProductForm(FlaskForm):
    name = StringField("Name", [DataRequired()])
    master_group = IntegerField("Master group", [DataRequired()])
    group = IntegerField("Group", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])
    from_group = StringField("From Group", [DataRequired()])
    # from_group_id = IntegerField("From Group ID", [DataRequired()])

    submit = SubmitField("Add product")


class RequestShareProductForm(FlaskForm):
    to_group_id = IntegerField("to_group_id", [DataRequired()])
    sku = StringField("SKU", [DataRequired()])
    desire_quantity = IntegerField("Desire Quantity", [DataRequired()])
    from_group_id = IntegerField("From Group", [DataRequired()])


class AdjustProductForm(FlaskForm):
    product_id = IntegerField("Product ID", [DataRequired()])
    warehouses_groups_quantity = StringField("Warehouses Groups Qty", [DataRequired()])
    note = StringField("Note")

    submit = SubmitField("Submit")


class UploadProductForm(FlaskForm):
    upload_csv = FileField("CSV", [DataRequired()])
    target_group_upload = IntegerField("Target Group")

    submit = SubmitField("Submit")
