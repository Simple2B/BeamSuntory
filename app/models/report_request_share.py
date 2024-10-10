from typing import TYPE_CHECKING
from datetime import datetime
import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s

from .utils import ModelMixin


if TYPE_CHECKING:
    from .user import User
    from .request_share import RequestShare


class ReportRequestShare(db.Model, ModelMixin):
    __tablename__ = "reports_request_share"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    request_share_id: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("request_share.id")
    )

    # Columns
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    history: orm.Mapped[str] = orm.mapped_column(sa.String(128), default="")
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )

    # Relations
    request_share: orm.Mapped["RequestShare"] = orm.relationship(
        back_populates="reports"
    )
    user: orm.Mapped["User"] = orm.relationship()

    @property
    def username(self):
        return self.user.username

    @property
    def created_at_formated(self):
        return self.created_at.strftime("%d/%m/%Y %H:%M:%S")

    def __repr__(self):
        return f"<ReportRequestShare {self.id}> user: {self.user.username}"

    @property
    def json(self):
        return s.ReportRequestShare.model_validate(self).model_dump_json(by_alias=True)
