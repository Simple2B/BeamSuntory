from datetime import datetime
from typing import TYPE_CHECKING
from sqlalchemy import ForeignKey, orm

from app.database import db
from .utils import ModelMixin

if TYPE_CHECKING:
    from .request_share import RequestShare
    from .user import User


# it is notification modal
class RequestShareUser(db.Model, ModelMixin):
    __tablename__ = "request_share_user"
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    user_id: orm.Mapped[int] = orm.mapped_column(ForeignKey("users.id"))
    request_share_id: orm.Mapped[int] = orm.mapped_column(
        ForeignKey("request_share.id")
    )
    reviewed_datetime: orm.Mapped[datetime] = orm.mapped_column(default=datetime.max)
    user: orm.Mapped["User"] = orm.relationship()
    request_share: orm.Mapped["RequestShare"] = orm.relationship(
        back_populates="notification"
    )

    @property
    def reviewed(self):
        return self.reviewed_datetime.replace(second=0) < datetime.now()

    def __repr__(self):
        return f"<RequestShareUser {self.id} user: {self.user.username}>"
