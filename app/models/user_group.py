from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .user import User

else:
    User = "User"


class UserGroup(db.Model, ModelMixin):
    __tablename__ = "user_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    left_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    right_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    child: orm.Mapped[User] = orm.relationship()
