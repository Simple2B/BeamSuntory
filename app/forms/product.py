from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    ValidationError,
    IntegerField,
    FloatField,
    DateField,
    FileField,
)
from wtforms.validators import DataRequired

from app import models as m
from app import db


class ProductForm(FlaskForm):
    next_url = StringField("next_url")
    product_id = StringField("product_id", [DataRequired()])
    name = StringField("Name", [DataRequired()])
    product_type = StringField("Product type", [DataRequired()])
    brand = IntegerField("Brand ID", [DataRequired()])
    category = StringField("Category ID", [DataRequired()])
    language = IntegerField("Language ID", [DataRequired()])
    # vendor=orm.Mapped[str] = orm.mapped_column(sa.String(64)) # TODO do we need it??
    currency = StringField("Currency", [DataRequired()])
    regular_price = FloatField("Regular price", [DataRequired()])
    retail_price = FloatField("Retail price", [DataRequired()])
    image = FileField("Image", [DataRequired()])  # link or png base64 str??
    description = StringField("Description", [DataRequired()])
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])
    low_stock_level = IntegerField("Low stock level", [DataRequired()])
    shelf_life = IntegerField("Shelf life", [DataRequired()])  # calendar
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
    product_type = StringField(
        "Product type", [DataRequired()]
    )  # Mapped[s.ProductType]
    brand = IntegerField("Brand ID", [DataRequired()])  # ForeignKey("str_values.id"))
    # brand = (form.brand_id.data,)  # relationship(foreign_keys=[brand_id])
    category = StringField(
        "Category ID", [DataRequired()]
    )  # sa.ForeignKey("product_categories.id")
    # category = (form.category.data,)  # orm.relationship(),
    language = IntegerField(
        "Language ID", [DataRequired()]
    )  # ForeignKey("str_values.id")),
    # language = (form.language.data,)  # relationship(foreign_keys=[language_id]),
    # vendor=orm.Mapped[str] = orm.mapped_column(sa.String(64)) # TODO do we need it??
    currency = StringField("Currency", [DataRequired()])  # Mapped[s.Currency],
    regular_price = FloatField("Regular price", [DataRequired()])  # sa.Float()
    retail_price = FloatField("Retail price", [DataRequired()])  # sa.Float(),
    image = FileField(
        "Image", [DataRequired()]
    )  # sa.String(64) # link or png base64 str??
    description = StringField("Description", [DataRequired()])  # String(256)),
    # General Info ->
    SKU = StringField("SKU", [DataRequired()])  # String(64)),
    low_stock_level = IntegerField("Low stock level", [DataRequired()])  # Integer()),s
    shelf_life = IntegerField(
        "Shelf life", [DataRequired()]
    )  # DateTime()),  # calendar
    program_year = IntegerField("Program year", [DataRequired()])  # Integer()),
    premises = StringField("Premises", [DataRequired()])  # Mapped[s.Premises],
    package_qty = IntegerField("Package qty", [DataRequired()])  # Integer()),
    numb_of_items_per_case = IntegerField(
        "Number of items per case", [DataRequired()]
    )  # Integer()),
    numb_of_cases_per_outer_case = IntegerField(
        "Number of cases per outer case", [DataRequired()]
    )  # Integer()),
    comments = StringField("Comments", [DataRequired()])  # String(128)),
    # shipping
    weight = FloatField("Weight", [DataRequired()])  # Float()),
    length = FloatField("Length", [DataRequired()])  # Float()),
    width = FloatField("Width", [DataRequired()])  # Float()),
    height = FloatField("Height", [DataRequired()])  # Float()),

    submit = SubmitField("Add product")

    def validate_product_name(self, field):
        query = m.Product.select().where(m.Product.name == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This product name is taken.")
