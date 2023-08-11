from datetime import datetime
import json

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s


class Division(db.Model, ModelMixin):
    __tablename__ = "divisions"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    role_name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    type: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    parent_role: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True)
    activated: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    def __repr__(self):
        return f"<{self.id}: {self.role_name}>"

    @property
    def json(self):
        mg = s.Division.from_orm(self)
        ujs = mg.json()
        mg_dict = json.loads(ujs)

        # TODO this should be recursive
        parent: Division = db.session.execute(
            Division.select().where(Division.role_name == mg_dict["parent_role"])
        ).scalar()

        if parent:
            possible_parent_roles = db.session.execute(
                Division.select().where(
                    sa.and_(
                        Division.role_name != parent.parent_role,
                        Division.role_name != mg_dict["role_name"],
                    ),
                    sa.or_(
                        Division.parent_role != mg_dict["role_name"],
                        Division.parent_role.is_(None),
                    ),
                )
            ).scalars()
        else:
            possible_parent_roles = db.session.execute(
                Division.select().where(
                    Division.role_name != mg_dict["role_name"],
                    sa.or_(
                        Division.parent_role != mg_dict["role_name"],
                        Division.parent_role.is_(None),
                    ),
                )
            ).scalars()

        mg_dict["possible_parent_roles"] = [r.role_name for r in possible_parent_roles]

        return json.dumps(mg_dict)
