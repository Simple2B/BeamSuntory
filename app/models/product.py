from typing import TYPE_CHECKING
import json
import sqlalchemy as sa
from sqlalchemy import orm

from flask_login import current_user

from app.database import db
from app import schema as s
from app.models.group_for_product import GroupProduct
from .utils import ModelMixin

from .product_group import ProductGroup
from .user_group import UserGroup
from .warehouse_product import WarehouseProduct
from .warehouse import Warehouse

if TYPE_CHECKING:
    from .supplier import Supplier


class Product(db.Model, ModelMixin):
    __tablename__ = "products"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(256),
        unique=True,
        nullable=False,
    )

    supplier_id: orm.Mapped[str] = orm.mapped_column(
        sa.ForeignKey("suppliers.id"), nullable=True
    )  # NOTE vendor = supplier
    supplier: orm.Mapped["Supplier"] = orm.relationship()

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

    warehouse_products: orm.Mapped[list[WarehouseProduct]] = orm.relationship(
        viewonly=True
    )
    warehouses: orm.Mapped[list[Warehouse]] = orm.relationship(
        secondary=WarehouseProduct.__table__
    )

    # TODO is overlaps="user_obj" correct decision? remove it to see the warning
    product_groups: orm.Mapped[ProductGroup] = orm.relationship(
        cascade="all, delete-orphan", overlaps="child"
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        # TODO refactor
        ujs = s.Product.model_validate(self).model_dump_json()
        mg_dict = json.loads(ujs)
        current_user_groups_rows = db.session.execute(
            UserGroup.select().where(UserGroup.left_id == current_user.id)
        ).all()
        # here we get dict of current product group_name:master_group_name
        # example: {'Brand': 'Martini', 'Fr': 'Language', 'Country': 'US'}
        whp = [
            i
            for i in db.session.execute(
                WarehouseProduct.select().where(
                    WarehouseProduct.product_id == mg_dict["id"]
                )
            ).scalars()
        ]
        mg_dict["mstr_groups_groups"] = {
            i.group.name: i.group.master_group.name for i in whp
        }

        mg_dict["current_user_groups"] = {
            grps[0].parent.master_group.name: [
                g[0].parent.name
                for g in current_user_groups_rows
                if grps[0].parent.master_group.name == g[0].parent.master_group.name
            ]
            for grps in current_user_groups_rows
        }
        mg_dict["groups_ids"] = {i.group.name: i.group.id for i in whp}
        warehouse_products = [
            wp
            for wp in db.session.execute(
                WarehouseProduct.select().where(
                    WarehouseProduct.product_id == mg_dict["id"]
                )
            ).scalars()
        ]

        mg_dict["available_quantity"] = {}

        mg_dict["product_in_warehouses"] = {}

        for wp in warehouse_products:
            if wp.group.name in mg_dict["available_quantity"]:
                mg_dict["available_quantity"][wp.group.name] = int(
                    mg_dict["available_quantity"][wp.group.name]
                ) + int(wp.product_quantity)
            else:
                mg_dict["available_quantity"][wp.group.name] = wp.product_quantity

            if wp.group.name in mg_dict["product_in_warehouses"]:
                mg_dict["product_in_warehouses"][wp.group.name][
                    f"{wp.warehouse_id}"
                ] = wp.product_quantity
            else:
                mg_dict["product_in_warehouses"][wp.group.name] = {
                    f"{wp.warehouse_id}": wp.product_quantity
                }

        mg_dict["all_warehouses"] = [
            {
                "id": w.id,
                "name": w.name,
            }
            for w in db.session.execute(Warehouse.select()).scalars()
        ]
        # TODO looks like it is duplicate of available_quantity. Ask client
        mg_dict["total_available_items"] = mg_dict["available_quantity"]
        groups_for_products_obj = db.session.execute(GroupProduct.select()).all()
        mstr_prod_grps_prod_grps_names = {}
        for group in groups_for_products_obj:
            if (
                group[0].master_groups_for_product.name
                not in mstr_prod_grps_prod_grps_names
            ):
                mstr_prod_grps_prod_grps_names[
                    group[0].master_groups_for_product.name
                ] = [{"group_name": group[0].name, "group_id": group[0].id}]
            else:
                mstr_prod_grps_prod_grps_names[
                    group[0].master_groups_for_product.name
                ].append({"group_name": group[0].name, "group_id": group[0].id})
        mg_dict["mstr_prod_grps_prod_grps_names"] = mstr_prod_grps_prod_grps_names
        mstr_grps_grps_names_in_prod = {}
        groups_in_products_obj = db.session.execute(
            GroupProduct.select().where(
                GroupProduct.id.in_([i.group_id for i in self.product_groups])
            )
        ).all()
        for group in groups_in_products_obj:
            if (
                group[0].master_groups_for_product.name
                not in mstr_grps_grps_names_in_prod
            ):
                mstr_grps_grps_names_in_prod[
                    group[0].master_groups_for_product.name
                ] = [{"group_name": group[0].name, "group_id": group[0].id}]
            else:
                mstr_grps_grps_names_in_prod[
                    group[0].master_groups_for_product.name
                ].append({"group_name": group[0].name, "group_id": group[0].id})
        mg_dict["mstr_grps_grps_names_in_prod"] = mstr_grps_grps_names_in_prod

        mg_dict["warehouse_product_qty"] = 0

        for wp in warehouse_products:
            mg_dict["warehouse_product_qty"] += wp.product_quantity

        return json.dumps(mg_dict)
