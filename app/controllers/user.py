from functools import wraps
from flask import abort, request
from flask_login import current_user

from app import db
from app import schema as s
from app import models as m

from app.logger import log


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


def role_required(required_role, hasApprovalPermission=False):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not current_user:
                log(log.ERROR, "User is not authenticated")
                abort(401)
            if current_user.role_obj.role_name not in required_role:
                log(
                    log.ERROR,
                    "User with role :[%s] does not have permission to access route: [%s]",
                    current_user.role_obj.role_name,
                    request.path,
                )
                abort(403)
            if hasApprovalPermission:
                if not current_user.approval_permission:
                    log(
                        log.ERROR,
                        "User with role :[%s] does not have approval permission to access route: [%s]",
                        current_user.approval_permission,
                        request.path,
                    )
                    abort(403)
            return func(*args, **kwargs)

        return wrapper

    return decorator
