from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin

from .product import Product
from .adjusts_group_qty import AdjustGroupQty


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
        mg = s.Adjust.from_orm(self)
        ujs = mg.model_dump_json()
        mg_dict = json.loads(ujs)

        mg_dict["product"] = {
            "name": self.product.name,
            "image": self.product.image,
            "SKU": self.product.SKU,
        }
        mg_dict["groups_qty"] = [
            {
                "group": ag.group.name,
                "quantity": ag.quantity,
                "warehouse": ag.warehouse.name,
            }
            for ag in db.session.execute(
                AdjustGroupQty.select().where(AdjustGroupQty.adjust_id == self.id)
            ).scalars()
        ]

        return json.dumps(mg_dict)
