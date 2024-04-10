from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app import db
from .utils import ModelMixin


# avoid circular import during initialization
if TYPE_CHECKING:
    from .user import User
    from .store import Store


class FavoriteStoreUser(db.Model, ModelMixin):
    __tablename__ = "favorite_store_user"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    user_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    store_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("stores.id"))
    child: orm.Mapped["User"] = orm.relationship()
    parent: orm.Mapped["Store"] = orm.relationship()
