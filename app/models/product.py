from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin
from .values import StrValue
from .product_category import ProductCategory


class Product(db.Model, ModelMixin):
    __tablename__ = "products"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    product_type: orm.Mapped[s.ProductType]

    brand_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("str_values.id"))
    brand: orm.Mapped[StrValue] = orm.relationship(foreign_keys=[brand_id])
    sub_brand_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("str_values.id"))
    sub_brand: orm.Mapped[StrValue] = orm.relationship(foreign_keys=[sub_brand_id])
    category_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("product_categories.id")
    )
    category: orm.Mapped[ProductCategory] = orm.relationship()
    language_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("str_values.id"))
    language: orm.Mapped[StrValue] = orm.relationship(foreign_keys=[language_id])

    # vendor: orm.Mapped[str] = orm.mapped_column(sa.String(64)) # TODO do we need it??
    currency: orm.Mapped[s.Currency]
    regular_price: orm.Mapped[float] = orm.mapped_column(
        sa.Float(),
        nullable=False,
    )
    retail_price: orm.Mapped[float] = orm.mapped_column(
        sa.Float(),
        nullable=False,
    )

    image: orm.Mapped[str] = orm.mapped_column(
        sa.String(64)
    )  # link or png base64 str??
    description: orm.Mapped[str] = orm.mapped_column(sa.String(256))
    # General Info ->
    SKU: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    low_stock_level: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    stock_status: orm.Mapped[s.StockStatus]
    shelf_life: orm.Mapped[datetime] = orm.mapped_column(sa.DateTime())  # calendar
    program_year: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    premises: orm.Mapped[s.Premises]
    package_qty: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    numb_of_items_per_case: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    numb_of_casess_per_outer_case: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    comments: orm.Mapped[str] = orm.mapped_column(sa.String(128))
    # shipping
    weight: orm.Mapped[float] = orm.mapped_column(sa.Float())
    length: orm.Mapped[float] = orm.mapped_column(sa.Float())
    width: orm.Mapped[float] = orm.mapped_column(sa.Float())
    height: orm.Mapped[float] = orm.mapped_column(sa.Float())

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.Product.from_orm(self)
        ujs = mg.json()
        mg_dict = json.loads(ujs)

        mg_dict["brand"] = mg.brand.value
        mg_dict["sub_brand"] = mg.sub_brand.value
        mg_dict["category"] = mg.category.name
        mg_dict["language"] = mg.language.value
        return json.dumps(mg_dict)
