import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin


class Image(db.Model, ModelMixin):
    __tablename__ = "images"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(256),
        unique=True,
        nullable=False,
    )
    path: orm.Mapped[str] = orm.mapped_column(
        sa.String(256),
        nullable=False,
    )
    extension: orm.Mapped[str] = orm.mapped_column(
        sa.String(32),
        nullable=False,
    )

    def __repr__(self):
        return f"<{self.id}: {self.name}>"
