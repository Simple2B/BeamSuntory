from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import schema as s
from app.database import db
from .utils import ModelMixin

if TYPE_CHECKING:
    from .product import Product
    from .group_for_product import GroupProduct


class ProductGroup(db.Model, ModelMixin):
    __tablename__ = "product_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups_for_product.id"))
    child: orm.Mapped["Product"] = orm.relationship(back_populates="product_groups")
    parent: orm.Mapped["GroupProduct"] = orm.relationship(
        back_populates="product_groups"
    )

    def __repr__(self):
        return f"<id: {self.id}, Perent: {self.parent}>"

    @property
    def json(self):
        return s.ProductGroup.model_validate(self).model_dump_json()
