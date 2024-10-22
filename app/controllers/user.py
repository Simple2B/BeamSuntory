from functools import wraps
from flask import abort, redirect, request, url_for
from flask_login import current_user

from app.database import db
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


def role_required(
    required_role,
    has_approval_permission=False,
    has_bulk_ship=False,
    has_bulk_assign=False,
):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            if not current_user:
                log(log.ERROR, "User is not authenticated")
                abort(401)

            if current_user.is_deleted:
                log(log.ERROR, "User is deleted")
                return redirect(url_for("auth.logout"))

            if current_user.role_obj.role_name not in required_role:
                log(
                    log.ERROR,
                    "User with role :[%s] does not have permission to access route: [%s]",
                    current_user.role_obj.role_name,
                    request.path,
                )
                abort(403)
            if has_approval_permission:
                if not current_user.approval_permission:
                    log(
                        log.ERROR,
                        "User with role :[%s] does not have approval permission to access route: [%s]",
                        current_user.approval_permission,
                        request.path,
                    )
                    abort(403)
            if has_bulk_ship:
                if not current_user.has_access_bulk_ship:
                    log(
                        log.ERROR,
                        "User with role :[%s] does not have bulk ship permission to access route: [%s]",
                        current_user.has_access_bulk_ship,
                        request.path,
                    )
                    abort(403)
            if has_bulk_assign:
                if not current_user.has_access_bulk_assign:
                    log(
                        log.ERROR,
                        "User with role :[%s] does not have bulk assign permission to access route: [%s]",
                        current_user.has_access_bulk_assign,
                        request.path,
                    )
                    abort(403)
            return func(*args, **kwargs)

        return wrapper

    return decorator
