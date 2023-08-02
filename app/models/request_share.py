from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin

from .product import Product
from .group import Group


class RequestShare(db.Model, ModelMixin):
    __tablename__ = "request_share"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    product_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("products.id"))
    group_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    desire_quantity: orm.Mapped[int] = orm.mapped_column()
    status: orm.Mapped[str] = orm.mapped_column()
    product: orm.Mapped[Product] = orm.relationship()
    group: orm.Mapped[Group] = orm.relationship()

    # @property
    # def json(self):
    #     mg = s.ProductGroup.from_orm(self)
    #     return mg.json()
