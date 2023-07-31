from sqlalchemy import ForeignKey, orm

from app import db, schema as s
from .utils import ModelMixin


class PackageInfo(db.Model, ModelMixin):
    __tablename__ = "package_info"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    quantity_per_wrap: orm.Mapped[int] = orm.mapped_column()
    quantity_wrap_carton: orm.Mapped[int] = orm.mapped_column()
    quantity_carton_master: orm.Mapped[int] = orm.mapped_column()
    inbound_order_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("inbound_orders.id")
    )

    @property
    def json(self):
        mg = s.PackageInfo.from_orm(self)
        return mg.json()
