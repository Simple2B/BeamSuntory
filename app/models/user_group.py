from sqlalchemy import ForeignKey, orm

from app import db
from .user import User
from .utils import ModelMixin


class UserGroup(db.Model, ModelMixin):
    __tablename__ = "user_group"
    left_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("users.id"), primary_key=True
    )
    right_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("groups.id"), primary_key=True
    )
    child: orm.Mapped[User] = orm.relationship()
