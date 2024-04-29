from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
    FloatField,
    FileField,
    HiddenField,
    SelectField,
    TextAreaField,
)
from wtforms.validators import DataRequired, Optional
import filetype

from app import schema as s
from app import models as m
from app.database import db


class ProductForm(FlaskForm):
    product_id = HiddenField("product_id", [DataRequired()])
    name = StringField("Name", [DataRequired()], render_kw={"placeholder": "Name"})
    supplier = IntegerField("Supplier ID", validators=[Optional()])
    currency = SelectField(
        "Currency", validators=[Optional()], choices=[c.value for c in s.Currency]
    )
    regular_price = FloatField(
        "Regular price",
        validators=[Optional()],
        render_kw={"placeholder": "Regular price"},
        default=0,
    )
    retail_price = FloatField(
        "Retail price",
        validators=[Optional()],
        render_kw={"placeholder": "Retail price"},
        default=0,
    )
    image = FileField("Image", validators=[Optional()])
    description = StringField(
        "Description", [DataRequired()], render_kw={"placeholder": "Description"}
    )
    # General Info ->
    SKU = StringField("SKU", [DataRequired()], render_kw={"placeholder": "SKU"})
    low_stock_level = IntegerField(
        "Low stock level",
        validators=[Optional()],
        render_kw={"placeholder": "Low stock level"},
        default=0,
    )
    program_year = IntegerField(
        "Program year",
        validators=[Optional()],
        render_kw={"placeholder": "Program year"},
        default=2024,
    )
    package_qty = IntegerField(
        "Package qty",
        validators=[Optional()],
        render_kw={"placeholder": "Package qty"},
        default=0,
    )
    numb_of_items_per_case = IntegerField(
        "Number of items per case",
        validators=[Optional()],
        render_kw={"placeholder": "Number of items per case"},
        default=0,
    )
    numb_of_cases_per_outer_case = IntegerField(
        "Number of cases per outer case",
        validators=[Optional()],
        render_kw={"placeholder": "Number of cases per outer case"},
        default=0,
    )
    comments = StringField(
        "Comments",
        validators=[Optional()],
        render_kw={"placeholder": "Comments"},
        default="No comments.",
    )
    notes_location = TextAreaField(
        "Notes Location",
        validators=[Optional()],
        render_kw={"placeholder": "Notes Location"},
        default="",
    )
    # shipping
    weight = FloatField(
        "Weight",
        validators=[Optional()],
        render_kw={"placeholder": "Weight"},
        default=0,
    )
    length = FloatField(
        "Length",
        validators=[Optional()],
        render_kw={"placeholder": "Length"},
        default=0,
    )
    width = FloatField(
        "Width", validators=[Optional()], render_kw={"placeholder": "Width"}, default=0
    )
    height = FloatField(
        "Height",
        validators=[Optional()],
        render_kw={"placeholder": "Height"},
        default=0,
    )
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
    group = StringField("Group", [DataRequired()])
    sub_group = StringField("Sub Group")
    quantity = IntegerField("Quantity", [DataRequired()])
    from_group = StringField("From Group", [DataRequired()])

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
