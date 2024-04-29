from datetime import datetime
from uuid import uuid4
import json
from typing import List

from flask_login import UserMixin, AnonymousUserMixin
import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

from app.database import db
from app.models.division import Division
from .utils import ModelMixin
from .group import Group
from .user_group import UserGroup
from .request_share_user import RequestShareUser
from .ship_request_notification import ShipRequestNotification
from .cart import Cart
from app.logger import log
from app import schema as s


def gen_password_reset_id() -> str:
    return str(uuid4())


class User(db.Model, UserMixin, ModelMixin):
    __tablename__ = "users"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)

    # Foreign keys
    role: orm.Mapped[int] = orm.mapped_column(
        sa.ForeignKey("divisions.id"), nullable=False
    )

    # Columns
    username: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        unique=True,
        nullable=False,
    )
    email: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        unique=True,
        nullable=False,
    )
    password_hash: orm.Mapped[str] = orm.mapped_column(sa.String(255), default="")
    activated: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.now,
    )
    unique_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=gen_password_reset_id,
    )
    reset_password_uid: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        default=gen_password_reset_id,
    )
    # NOTE thumbnail saved as base64 png string
    image: orm.Mapped[str] = orm.mapped_column(
        sa.String(255), nullable=True, default="png"
    )
    country: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        nullable=False,
    )
    region: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        nullable=False,
    )
    city: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        nullable=False,
    )
    zip_code: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        nullable=False,
    )
    street_address: orm.Mapped[str] = orm.mapped_column(
        sa.String(255),
        nullable=False,
    )
    approval_permission: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    sales_rep: orm.Mapped[bool] = orm.mapped_column(sa.Boolean, default=False)
    phone_number: orm.Mapped[str] = orm.mapped_column(sa.String(64), nullable=True)

    # Relations
    role_obj: orm.Mapped[Division] = orm.relationship(lazy="joined")
    user_groups: orm.Mapped[list[Group]] = orm.relationship(
        secondary=UserGroup.__table__,
        overlaps="parent,user_obj,child",
        order_by="Group.name.asc()",
    )
    is_deleted = orm.mapped_column(sa.Boolean, default=False)

    @property
    def has_notivications(self) -> bool:
        if self.role_obj.role_name == s.UserRole.WAREHOUSE_MANAGER.value:
            count = db.session.scalar(
                sa.select(sa.func.count(ShipRequestNotification.id)).where(
                    ShipRequestNotification.user_id == self.id,
                    ShipRequestNotification.reviewed_datetime >= datetime.now(),
                )
            )
            return bool(count)
        count = db.session.scalar(
            sa.select(sa.func.count(RequestShareUser.id)).where(
                RequestShareUser.user_id == self.id,
                RequestShareUser.reviewed_datetime >= datetime.now(),
            )
        )
        return bool(count)

    @property
    def has_carts(self) -> bool:
        count = db.session.scalar(
            sa.select(sa.func.count(Cart.id)).where(
                Cart.user_id == self.id,
                Cart.status == "pending",
            )
        )
        return bool(count)

    @hybrid_property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    @classmethod
    def authenticate(cls, user_id, password):
        query = cls.select().where(
            (sa.func.lower(cls.username) == sa.func.lower(user_id))
            | (sa.func.lower(cls.email) == sa.func.lower(user_id))
        )
        user = db.session.scalar(query)
        if not user:
            log(log.WARNING, "user:[%s] not found", user_id)

        if user is not None and check_password_hash(user.password, password):
            return user

    def reset_password(self):
        self.password_hash = ""
        self.reset_password_uid = gen_password_reset_id()
        self.save()

    def __repr__(self):
        return f"<{self.id}: {self.username},{self.email}>"

    @property
    def json(self):
        # insert group_name to result json
        ujs = s.User.model_validate(self).model_dump_json()
        u_dict = json.loads(ujs)

        user_group: List[UserGroup] = [
            ug
            for ug in db.session.execute(
                UserGroup.select().where(UserGroup.left_id == u_dict["id"])
            ).scalars()
        ]

        if len(user_group) > 0:
            groups_obj: Group = db.session.execute(
                Group.select().where(
                    Group.id.in_([ugid.right_id for ugid in user_group])
                )
            ).scalars()
            u_dict["group_name"] = ", ".join([g.name for g in groups_obj])
        else:
            u_dict["group_name"] = "Without group"

        u_dict["role_name"] = (
            db.session.execute(Division.select().where(Division.id == u_dict["role"]))
            .scalars()
            .first()
            .role_name
        )
        return json.dumps(u_dict)


class AnonymousUser(AnonymousUserMixin):
    role_obj = "anonymous"

    pass
