from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s
from .assign import Assign
from .user import User


class BulkAssign(db.Model, ModelMixin):
    __tablename__ = "bulk_assigns"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(sa.String(256), default="")
    # Foreign keys
    user_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("users.id"))
    # Columns
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    uuid: orm.Mapped[str] = orm.mapped_column(sa.String(64), default=generate_uuid)
    # Relationships
    user: orm.Mapped[User] = orm.relationship("User")
    assigns: orm.Mapped[list[Assign]] = orm.relationship(cascade="all, delete-orphan")
    # Files
    absolute_file_path: orm.Mapped[str] = orm.mapped_column(sa.String(512))
    uploaded_file_path: orm.Mapped[str] = orm.mapped_column(sa.String(512))
    is_deleted: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    @property
    def json(self):
        return s.BulkAssign.model_validate(self).model_dump_json(by_alias=True)
