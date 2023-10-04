from typing import TYPE_CHECKING
import json
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin

from .product_group import ProductGroup
from .warehouse_product import WarehouseProduct
from .warehouse import Warehouse

if TYPE_CHECKING:
    from .supplier import Supplier


class Product(db.Model, ModelMixin):
    __tablename__ = "products"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign Keys
    supplier_id: orm.Mapped[str] = orm.mapped_column(
        sa.ForeignKey("suppliers.id"), nullable=True
    )  # NOTE vendor = supplier

    # Columns
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(256),
        unique=True,
        nullable=False,
    )
    currency: orm.Mapped[s.Currency] = orm.mapped_column(
        sa.Enum(s.Currency), nullable=True
    )
    regular_price: orm.Mapped[float] = orm.mapped_column(sa.Float(), nullable=True)
    retail_price: orm.Mapped[float] = orm.mapped_column(sa.Float(), nullable=True)

    image: orm.Mapped[str] = orm.mapped_column(sa.Text())  # png base64 str
    description: orm.Mapped[str] = orm.mapped_column(sa.String(512), nullable=False)
    # General Info ->
    SKU: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=False)
    low_stock_level: orm.Mapped[int] = orm.mapped_column(sa.Integer(), nullable=True)

    program_year: orm.Mapped[int] = orm.mapped_column(sa.Integer(), nullable=True)
    package_qty: orm.Mapped[int] = orm.mapped_column(sa.Integer(), nullable=True)
    numb_of_items_per_case: orm.Mapped[int] = orm.mapped_column(
        sa.Integer(), nullable=True
    )
    numb_of_cases_per_outer_case: orm.Mapped[int] = orm.mapped_column(
        sa.Integer(), nullable=True
    )
    comments: orm.Mapped[str] = orm.mapped_column(sa.String(256), nullable=True)
    notes_location: orm.Mapped[str] = orm.mapped_column(sa.Text, nullable=True)
    # shipping
    weight: orm.Mapped[float] = orm.mapped_column(sa.Float(), nullable=True)
    length: orm.Mapped[float] = orm.mapped_column(sa.Float(), nullable=True)
    width: orm.Mapped[float] = orm.mapped_column(sa.Float(), nullable=True)
    height: orm.Mapped[float] = orm.mapped_column(sa.Float(), nullable=True)

    # Relationships
    supplier: orm.Mapped["Supplier"] = orm.relationship()
    warehouse_products: orm.Mapped[list[WarehouseProduct]] = orm.relationship(
        viewonly=True
    )
    # TODO remove relationships in WarehouseProduct (product, warehouse, etc...)
    # TODO use only as secondary
    warehouses: orm.Mapped[list[Warehouse]] = orm.relationship(
        secondary=WarehouseProduct.__table__,
        overlaps="warehouse",
    )

    # TODO is overlaps="user_obj" correct decision? remove it to see the warning
    product_groups: orm.Mapped[list[ProductGroup]] = orm.relationship(
        cascade="all, delete-orphan", overlaps="child"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        # TODO refactor
        ujs = s.Product.model_validate(self).model_dump_json()
        mg_dict = json.loads(ujs)

        # here we get dict of current product group_name:master_group_name
        # example: {'Brand': 'Martini', 'Fr': 'Language', 'Country': 'US'}
        warehouse_products = [
            wp
            for wp in db.session.execute(
                WarehouseProduct.select().where(
                    WarehouseProduct.product_id == mg_dict["id"]
                )
            ).scalars()
        ]

        # TODO: move it to schema
        mg_dict["product_in_warehouses"] = {}

        for wp in warehouse_products:
            if wp.group.name in mg_dict["product_in_warehouses"]:
                mg_dict["product_in_warehouses"][wp.group.name][
                    f"{wp.warehouse_id}"
                ] = wp.product_quantity
            else:
                mg_dict["product_in_warehouses"][wp.group.name] = {
                    f"{wp.warehouse_id}": wp.product_quantity
                }

        return json.dumps(mg_dict)
