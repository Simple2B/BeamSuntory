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
