from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required
import sqlalchemy as sa
from sqlalchemy.orm import aliased
from sqlalchemy.exc import IntegrityError
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


billable_group_bp = Blueprint("billable_group", __name__, url_prefix="/billable_group")


@billable_group_bp.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_create: f.NewBillable = f.NewGroupProductForm()
    form_edit: f.GroupProductForm = f.GroupProductForm()

    master_group = aliased(m.MasterGroupProduct)
    q = request.args.get("q", type=str, default=None)
    query = m.GroupProduct.select().order_by(m.GroupProduct.name.asc())
    count_query = sa.select(sa.func.count()).select_from(m.GroupProduct)
    if q:
        query = (
            m.GroupProduct.select()
            .join(master_group, m.GroupProduct.master_group_id == master_group.id)
            .where(
                m.GroupProduct.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%")
            )
            .order_by(m.GroupProduct.name.asc())
        )
        count_query = (
            sa.select(sa.func.count())
            .join(master_group, m.GroupProduct.master_group_id == master_group.id)
            .where(
                m.GroupProduct.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%")
            )
            .select_from(m.GroupProduct)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    master_groups_rows_objs = db.session.execute(m.MasterGroupProduct.select()).all()
    master_groups = [row[0] for row in master_groups_rows_objs]

    return render_template(
        "group_for_product/groups_for_product.html",
        groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        master_groups=master_groups,
        main_master_groups=master_groups,
        form_create=form_create,
        form_edit=form_edit,
    )
