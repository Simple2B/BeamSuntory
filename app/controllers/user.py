from functools import wraps
from flask import abort
from flask_login import current_user

from app import db
from app import schema as s
from app import models as m


def create_admin(admin_data: s.AdminCreate):
    role = db.session.execute(
        m.Division.select().where(m.Division.role_name == s.UserRole.ADMIN.value)
    ).scalar()
    admin = m.User(**admin_data.model_dump(exclude_none=True))
    admin.role = role.id
    admin.activated = True
    admin.approval_permission = True
    admin.sales_rep = False

    groups = db.session.scalars(m.Group.select())
    for group in groups:
        db.session.add(m.UserGroup(child=admin, parent=group))

    db.session.add(admin)
    db.session.commit()


def role_required(required_role):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if current_user.role not in required_role:
                abort(403)  # Forbidden status code
            return func(*args, **kwargs)

        return wrapper

    return decorator
