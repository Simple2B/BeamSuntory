from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin

from .product import Product


class Adjust(db.Model, ModelMixin):
    __tablename__ = "adjusts"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    note: orm.Mapped[str] = orm.mapped_column(sa.Text(), default="", nullable=True)
    product: orm.Mapped[Product] = orm.relationship()
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
