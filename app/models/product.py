import json

import sqlalchemy as sa
from sqlalchemy import orm

from flask_login import current_user

from app.database import db
from app import schema as s
from .utils import ModelMixin

from .product_group import ProductGroup
from .user_group import UserGroup
from .warehouse_product import WarehouseProduct
from .warehouse import Warehouse


class Product(db.Model, ModelMixin):
    __tablename__ = "products"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    product_type: orm.Mapped[s.ProductType]

    supplier_id: orm.Mapped[str] = orm.mapped_column(
        sa.ForeignKey("suppliers.id")
    )  # NOTE vendor = supplier
    currency: orm.Mapped[s.Currency]
    price: orm.Mapped[float] = orm.mapped_column(
        sa.Float(),
        nullable=False,
    )

    image: orm.Mapped[str] = orm.mapped_column(sa.Text())  # png base64 str
    description: orm.Mapped[str] = orm.mapped_column(sa.String(256))
    # General Info ->
    SKU: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    low_stock_level: orm.Mapped[int] = orm.mapped_column(sa.Integer())

    program_year: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    package_qty: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    numb_of_items_per_case: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    numb_of_cases_per_outer_case: orm.Mapped[int] = orm.mapped_column(sa.Integer())
    comments: orm.Mapped[str] = orm.mapped_column(sa.String(128))
    # shipping
    weight: orm.Mapped[float] = orm.mapped_column(sa.Float())
    length: orm.Mapped[float] = orm.mapped_column(sa.Float())
    width: orm.Mapped[float] = orm.mapped_column(sa.Float())
    height: orm.Mapped[float] = orm.mapped_column(sa.Float())

    # TODO is overlaps="user_obj" correct decision? remove it to see the warning
    product_groups: orm.Mapped[ProductGroup] = orm.relationship(
        cascade="all, delete-orphan", overlaps="child"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.Product.from_orm(self)
        ujs = mg.json()
        mg_dict = json.loads(ujs)
        current_product_products_groups_rows = db.session.execute(
            ProductGroup.select().where(ProductGroup.product_id == mg_dict["id"])
        ).all()
        current_user_groups_rows = db.session.execute(
            UserGroup.select().where(UserGroup.left_id == current_user.id)
        ).all()
        # here we get dict of current product group_name:master_group_name
        # example: {'Martini': 'Brand', 'Fr': 'Language', 'US': 'Country'}
        mstr_groups_groups = {
            i[0].parent.master_groups.name: i[0].parent.name
            for i in current_product_products_groups_rows
        }

        mg_dict["mstr_groups_groups"] = mstr_groups_groups
        mg_dict["current_user_groups"] = {
            grps[0].parent.master_groups.name: [
                g[0].parent.name
                for g in current_user_groups_rows
                if grps[0].parent.master_groups.name == g[0].parent.master_groups.name
            ]
            for grps in current_user_groups_rows
        }
        mg_dict["groups_ids"] = {
            i[0].parent.name: i[0].parent.id
            for i in current_product_products_groups_rows
        }
        warehouse_products = db.session.execute(
            WarehouseProduct.select().where(
                WarehouseProduct.product_id == mg_dict["id"]
            )
        ).scalars()
        mg_dict["available_quantity"] = (
            {wp.group.name: wp.product_quantity for wp in warehouse_products}
            if warehouse_products
            else {}
        )
        mg_dict["all_warehouses"] = [
            {
                "id": w.id,
                "name": w.name,
            }
            for w in db.session.execute(Warehouse.select()).scalars()
        ]
        # TODO looks like it is duplicate of available_quantity. Ask client
        mg_dict["total_available_items"] = mg_dict["available_quantity"]
        return json.dumps(mg_dict)
