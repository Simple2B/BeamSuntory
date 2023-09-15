from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin

if TYPE_CHECKING:
    from .event import Event


class ReportEvent(db.Model, ModelMixin):
    __tablename__ = "report_events"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))

    event_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("events.id"))
    event: orm.Mapped["Event"] = orm.relationship()

    quantity: orm.Mapped[int] = orm.mapped_column(sa.Integer)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )
