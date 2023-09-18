from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from app import schema as s
from .utils import ModelMixin


class DeliveryAgent(db.Model, ModelMixin):
    __tablename__ = "delivery_agents"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    first_name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    last_name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    username: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    contact_number: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    street_address: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )
    active: orm.Mapped[bool] = orm.mapped_column(
        sa.Boolean(),
    )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.username}>"

    @property
    def json(self):
        return s.DeliveryAgent.model_validate(self).model_dump_json()
