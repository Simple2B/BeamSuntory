from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin


if TYPE_CHECKING:
    from .product_quantity_group import ProductQuantityGroup


class PackageInfo(db.Model, ModelMixin):
    __tablename__ = "package_info"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    quantity_per_wrap: orm.Mapped[int] = orm.mapped_column()
    quantity_wrap_carton: orm.Mapped[int] = orm.mapped_column()
    quantity_carton_master: orm.Mapped[int] = orm.mapped_column(nullable=True)
    product_quantity_group_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("product_quantity_group.id")
    )
    product_quantity_group: orm.Mapped["ProductQuantityGroup"] = orm.relationship(
        foreign_keys=[product_quantity_group_id]
    )

    @property
    def json(self):
        return s.PackageInfo.model_validate(self).model_dump_json()
