from datetime import datetime

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from .group import Group
from .property import Property


class ValueMixin:
    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )


class IntValue(db.Model, ModelMixin, ValueMixin):
    __tablename__ = "int_values"

    value: orm.Mapped[int] = orm.mapped_column(
        sa.Integer(),
        nullable=False,
    )
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped[Group] = orm.relationship()
    property_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("properties.id"))
    property: orm.Mapped[Property] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.value}>"


class StrValue(db.Model, ModelMixin, ValueMixin):
    __tablename__ = "str_values"

    value: orm.Mapped[int] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped[Group] = orm.relationship()
    property_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("properties.id"))
    property: orm.Mapped[Property] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.value}>"


class FloatValue(db.Model, ModelMixin, ValueMixin):
    __tablename__ = "float_values"

    value: orm.Mapped[float] = orm.mapped_column(
        sa.Float(),
        nullable=False,
    )
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped[Group] = orm.relationship()
    property_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("properties.id"))
    property: orm.Mapped[Property] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.value}>"


class BoolValue(db.Model, ModelMixin, ValueMixin):
    __tablename__ = "bool_values"

    value: orm.Mapped[int] = orm.mapped_column(
        sa.Boolean(),
        nullable=False,
    )
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped[Group] = orm.relationship()
    property_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("properties.id"))
    property: orm.Mapped[Property] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.value}>"


class DateValue(db.Model, ModelMixin, ValueMixin):
    __tablename__ = "date_values"

    value: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime(),
        nullable=False,
    )
    group_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("groups.id"))
    group: orm.Mapped[Group] = orm.relationship()
    property_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("properties.id"))
    property: orm.Mapped[Property] = orm.relationship()

    def __repr__(self):
        return f"<{self.id}: {self.value}>"
