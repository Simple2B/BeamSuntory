from datetime import datetime
from typing import TYPE_CHECKING
import sqlalchemy as sa
from sqlalchemy import orm
import json

from app.database import db
from app import schema as s
from .utils import ModelMixin
from flask_login import current_user

from .product_group import ProductGroup
from .warehouse_product import WarehouseProduct
from .group_for_product import GroupProduct
from .warehouse import Warehouse
from .image import Image

if TYPE_CHECKING:
    from .supplier import Supplier
    from .report_sku import ReportSKU


class Product(db.Model, ModelMixin):
    __tablename__ = "products"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign Keys
    supplier_id: orm.Mapped[str] = orm.mapped_column(
        sa.ForeignKey("suppliers.id"), nullable=True
    )  # NOTE vendor = supplier
    image_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("images.id"), nullable=True
    )

    # Columns
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(256),
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
    SKU: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=False, unique=True)
    low_stock_level: orm.Mapped[int] = orm.mapped_column(sa.Integer(), nullable=True)
    expiry_date: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime, default=datetime.max
    )

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

    is_deleted: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean(), default=False, server_default=sa.sql.expression.false()
    )

    # Relationships
    image_obj: orm.Mapped["Image"] = orm.relationship()
    supplier: orm.Mapped["Supplier"] = orm.relationship()
    warehouse_products: orm.Mapped[list[WarehouseProduct]] = orm.relationship(
        viewonly=True, order_by=WarehouseProduct.product_quantity.desc()
    )
    # TODO remove relationships in WarehouseProduct (product, warehouse, etc...)
    # TODO use only as secondary
    warehouses: orm.Mapped[list[Warehouse]] = orm.relationship(
        secondary=WarehouseProduct.__table__, overlaps="warehouse,product"
    )

    # TODO is overlaps="user_obj" correct decision? remove it to see the warning
    product_groups: orm.Mapped[list[ProductGroup]] = orm.relationship(
        cascade="all, delete-orphan", order_by=ProductGroup.id, back_populates="child"
    )
    groups: orm.Mapped[list[GroupProduct]] = orm.relationship(
        secondary=ProductGroup.__table__,
        back_populates="products",
        overlaps="child,product_groups,parent",
        order_by=GroupProduct.name.asc(),
    )

    report_sku: orm.Mapped["ReportSKU"] = orm.relationship(
        order_by="ReportSKU.created_at.desc()", uselist=False, viewonly=True
    )

    @property
    def supplier_name(self):
        return self.supplier.name if self.supplier else "-"

    @property
    def last_transaction_data(self):
        if not self.report_sku:
            return "-"
        return (
            f"{self.report_sku.created_at.strftime('%Y/%m/%d')}, {self.report_sku.type}"
        )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def numb_of_day_left(self):
        return (self.expiry_date - datetime.now()).days

    @property
    def qty(self):
        return self.get_warehouse_products_qty()

    @property
    def brand(self):
        return ",".join(
            set(
                group.name
                for group in self.groups
                if group.master_groups_for_product.name == s.Brand.name.value
            )
        )

    def get_warehouse_products_qty(self, is_stock_own_by_me: bool = False):
        if is_stock_own_by_me:
            return sum(
                wp.product_quantity
                for wp in self.warehouse_products
                if wp.group in current_user.user_groups
            )
        return sum(wp.product_quantity for wp in self.warehouse_products)

    def get_groups_by_maste_group(self, name: str):
        groups = ",".join(
            [
                group.name
                for group in self.groups
                if group.master_groups_for_product.name == name
            ]
        )

        return (
            f"{self.program_year} {groups}" if name == "Program Year" else groups or "-"
        )

    def get_qty_by_group(self, filter: s.ReportFilter):
        if not filter.master_group and not filter.target_group:
            return self.qty

        if filter.master_group and not filter.target_group:
            return sum(
                wp.product_quantity
                for wp in self.warehouse_products
                if wp.group.master_group.name == filter.master_group
            )

        return sum(
            wp.product_quantity
            for wp in self.warehouse_products
            if wp.group.name == filter.target_group
        )

    @property
    def json(self):
        return s.Product.model_validate(self).model_dump_json(by_alias=True)

    @property
    def master_groups(self):
        from .master_group_for_product import MasterGroupProduct

        groups = db.session.scalars(
            sa.select(MasterGroupProduct)
            .join(GroupProduct)
            .join(ProductGroup)
            .filter(ProductGroup.product_id == self.id)
            .distinct()
        ).all()

        return groups

    @property
    def master_groups_names(self):
        return [group.name for group in self.master_groups]

    @property
    def json_product_master_groups(self):
        groups = self.master_groups
        return json.dumps(s.AdapterProductViewColumns.dump_python(groups))
