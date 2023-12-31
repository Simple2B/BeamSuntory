from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin, generate_uuid

from .product import Product
from .group import Group
from .user import User


class RequestShare(db.Model, ModelMixin):
    __tablename__ = "request_share"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    from_group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    user_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))

    # Columns
    order_numb: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        unique=True,
        default=generate_uuid,
    )
    desire_quantity: orm.Mapped[int] = orm.mapped_column()
    status: orm.Mapped[str] = orm.mapped_column()
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now(),
    )
    finished_date: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        nullable=True,
    )
    # Relations
    product: orm.Mapped[Product] = orm.relationship()
    group: orm.Mapped[Group] = orm.relationship(foreign_keys=[group_id])
    from_group: orm.Mapped[Group] = orm.relationship(foreign_keys=[from_group_id])
    user: orm.Mapped["User"] = orm.relationship()

    @property
    def json(self):
        return s.RequestShare.model_validate(self).model_dump_json()
