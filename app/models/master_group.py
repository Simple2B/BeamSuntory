from datetime import datetime
import json
from typing import List

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin
from app import schema as s
from app import models as m


class MasterGroup(db.Model, ModelMixin):
    __tablename__ = "master_groups"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    name: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    groups: orm.Mapped[List[m.Group]] = orm.relationship(back_populates="master_groups")

    def __repr__(self):
        return f"<{self.id}: {self.name}>"

    @property
    def json(self):
        mg = s.MasterGroup.from_orm(self)
        ujs = mg.json()
        mg_dict = json.loads(ujs)

        master_groups_list_groups = {}
        groups: list[m.Group] = db.session.execute(m.Group.select()).scalars()

        for group in groups:
            if group.master_groups.name not in master_groups_list_groups:
                master_groups_list_groups[group.master_groups.name] = [
                    {"group_name": group.name, "group_id": group.id}
                ]
            else:
                master_groups_list_groups[group.master_groups.name].append(
                    {"group_name": group.name, "group_id": group.id}
                )
        mg_dict["master_groups_list_groups"] = master_groups_list_groups
        return json.dumps(mg_dict)
