from typing import TYPE_CHECKING
from sqlalchemy import orm

from app import schema as s
from app.database import db
from .utils import ModelMixin


if TYPE_CHECKING:
    from .product_quantity_group import ProductQuantityGroup


class PackageInfo(db.Model, ModelMixin):
    __tablename__ = "package_info"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    quantity_per_wrap: orm.Mapped[int] = orm.mapped_column()
    quantity_wrap_carton: orm.Mapped[int] = orm.mapped_column()
    quantity_carton_master: orm.Mapped[int] = orm.mapped_column(nullable=True)

    product_quantity_group: orm.Mapped["ProductQuantityGroup"] = orm.relationship(
        back_populates="package_info", uselist=False
    )

    def __repr__(self):
        return f"<{self.id}: {self.product_quantity_group.group.name if self.product_quantity_group else ''}>"

    @property
    def json(self):
        return s.PackageInfo.model_validate(self).model_dump_json()
