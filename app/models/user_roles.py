from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin


class UserRoles(db.Model, ModelMixin):
    __tablename__ = "user_roles"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign Keys
    user_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    role_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("roles.id"))
