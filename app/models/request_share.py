from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin

from .product import Product
from .group_for_product import GroupProduct


class RequestShare(db.Model, ModelMixin):
    __tablename__ = "request_share"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups_for_product.id"))
    from_group_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("groups_for_product.id")
    )
    desire_quantity: orm.Mapped[int] = orm.mapped_column()
    status: orm.Mapped[str] = orm.mapped_column()
    product: orm.Mapped[Product] = orm.relationship()
    group: orm.Mapped[GroupProduct] = orm.relationship(foreign_keys=[group_id])
    from_group: orm.Mapped[GroupProduct] = orm.relationship(
        foreign_keys=[from_group_id]
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    @property
    def json(self):
        mg = s.RequestShare.from_orm(self)
        ujs = mg.json()
        mg_dict = json.loads(ujs)

        mg_dict["product"] = self.product.name
        mg_dict["group"] = self.group.name

        return json.dumps(mg_dict)