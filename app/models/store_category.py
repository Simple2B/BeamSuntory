from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin
from .store import Store


class StoreCategory(db.Model, ModelMixin):
    __tablename__ = "store_categories"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    parent_category: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=True,
    )
    active: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean,
        nullable=False,
    )
    image: orm.Mapped[str] = orm.mapped_column(
        sa.Text(),
        nullable=True,
    )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    stores: orm.Mapped[list["Store"]] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        # TODO refactor
        mg_dict = json.loads(s.StoreCategory.model_validate(self).model_dump_json())
        stores = db.session.execute(
            Store.select().where(Store.store_category_id == mg_dict["id"])
        ).scalars()

        mg_dict["store_category_store"] = [
            {"store_name": store.store_name, "store_id": store.id} for store in stores
        ]

        return json.dumps(mg_dict)
