from datetime import datetime
from uuid import uuid4

from flask_login import UserMixin, AnonymousUserMixin
import sqlalchemy as sa
from sqlalchemy import orm
from sqlalchemy.ext.hybrid import hybrid_property
from werkzeug.security import generate_password_hash, check_password_hash

from app.database import db
from app.models.division import Division
from .utils import ModelMixin, encrypt_data, decrypt_data
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

    _user_secret: orm.Mapped[bytes | None] = orm.mapped_column(
        sa.LargeBinary, nullable=True
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

    # notify
    is_notify_new_inventory: orm.Mapped[bool] = orm.mapped_column(default=True)
    is_notify_shipping: orm.Mapped[bool] = orm.mapped_column(default=True)
    is_notify_request_share_status: orm.Mapped[bool] = orm.mapped_column(default=True)

    has_access_bulk_ship: orm.Mapped[bool] = orm.mapped_column(
        default=False, server_default="0"
    )
    has_access_bulk_assign: orm.Mapped[bool] = orm.mapped_column(
        default=False, server_default="0"
    )

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

    @property
    def user_secret(self) -> str:
        if self._user_secret is None:
            return ""
        return decrypt_data(self._user_secret)

    @hybrid_property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)
        self._user_secret = encrypt_data(password)

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
        ujs = s.User.model_validate(self)

        if self.user_groups:
            ujs.group_name = ", ".join([g.name for g in self.user_groups])
        else:
            ujs.group_name = "Without group"

        ujs.role_name = self.role_obj.role_name
        return ujs.model_dump_json()

    @property
    def user_group_names(self):
        return [group.name for group in self.user_groups]


class AnonymousUser(AnonymousUserMixin):
    role_obj = "anonymous"

    pass
