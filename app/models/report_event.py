from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from app import schema as s

if TYPE_CHECKING:
    from .event import Event
    from .user import User
    from .store import Store


class ReportEvent(db.Model, ModelMixin):
    __tablename__ = "report_events"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))

    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    user: orm.Mapped["User"] = orm.relationship()

    events: orm.Mapped[list["Event"]] = orm.relationship()
    history: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")

    store_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("stores.id"))
    store: orm.Mapped["Store"] = orm.relationship()

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    @property
    def json(self):
        return s.ReportEvent.model_validate(self).model_dump_json(by_alias=True)
