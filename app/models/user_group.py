from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app.database import db
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .user import User
    from .group import Group


# TODO Refactor!!!
class UserGroup(db.Model, ModelMixin):
    __tablename__ = "user_group"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    left_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    right_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("groups.id"))
    child: orm.Mapped["User"] = orm.relationship(overlaps="child")
    # TODO is overlaps="user_obj" correct decision? remove it to see the warning
    parent: orm.Mapped["Group"] = orm.relationship(
        overlaps="user_obj", order_by="Group.name.desc()"
    )
