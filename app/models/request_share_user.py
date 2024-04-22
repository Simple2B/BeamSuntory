from sqlalchemy import ForeignKey, orm

from app.database import db
from .utils import ModelMixin
from .user import User
from .request_share import RequestShare


class RequestShareUser(db.Model, ModelMixin):
    __tablename__ = "request_share_user"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    user_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    request_share_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("request_share.id")
    )
    user: orm.Mapped[User] = orm.relationship()
    request_share: orm.Mapped[RequestShare] = orm.relationship()
