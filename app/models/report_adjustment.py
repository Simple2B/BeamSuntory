from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app import db
from .utils import ModelMixin
from app import schema as s

if TYPE_CHECKING:
    from .user import User
    from .adjust import Adjust


class ReportAdjustment(db.Model, ModelMixin):
    __tablename__ = "report_adjustments"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))

    # Columns
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    history: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relationships
    adjustments: orm.Mapped["Adjust"] = orm.relationship(back_populates="adjustments")
    user: orm.Mapped["User"] = orm.relationship()

    @property
    def json(self):
        return s.ReportEvent.model_validate(self).model_dump_json(by_alias=True)
