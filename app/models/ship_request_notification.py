from typing import TYPE_CHECKING
from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin

if TYPE_CHECKING:
    from .user import User
    from .ship_request import ShipRequest


class ShipRequestNotification(db.Model, ModelMixin):
    __tablename__ = "ship_request_notifications"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    ship_request_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("ship_requests.id")
    )
    reviewed_datetime: orm.Mapped[datetime] = orm.mapped_column(default=datetime.max)
    user: orm.Mapped["User"] = orm.relationship()
    ship_request: orm.Mapped["ShipRequest"] = orm.relationship()

    @property
    def reviewed(self):
        return self.reviewed_datetime.replace(second=0) < datetime.now()

    def __repr__(self):
        return f"<{self.id}: {self.user.username}>"
