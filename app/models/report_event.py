from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from app import schema as s

if TYPE_CHECKING:
    from .user import User
    from .ship_request import ShipRequest


class ReportEvent(db.Model, ModelMixin):
    __tablename__ = "report_events"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))

    # Columns
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    history: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    # Relationships
    ship_request: orm.Mapped["ShipRequest"] = orm.relationship()
    user: orm.Mapped["User"] = orm.relationship()

    @property
    def json(self):
        # s.ReportEvent.model_rebuild()
        return s.ReportEvent.model_validate(self).model_dump_json(by_alias=True)
