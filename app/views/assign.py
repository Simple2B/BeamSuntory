from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
import sqlalchemy as sa
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s


assign_blueprint = Blueprint("assign", __name__, url_prefix="/assign")


@assign_blueprint.route("/", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.MANAGER.value,
        s.UserRole.SALES_REP.value,
    ]
)
def get_all():
    product = aliased(m.Product)
    group = aliased(m.Group)
    q = request.args.get("q", type=str, default=None)
    query = m.Assign.select().order_by(m.Assign.id)
    count_query = sa.select(sa.func.count()).select_from(m.Assign)
    if q:
        query = (
            m.Assign.select()
            .join(
                product,
                m.Assign.product_id == product.id,
            )
            .join(group, m.Assign.group_id == group.id)
            .where(product.name.ilike(f"%{q}%") | group.name.ilike(f"%{q}%"))
            .order_by(m.Assign.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .join(
                product,
                m.Assign.product_id == product.id,
            )
            .join(group, m.Assign.group_id == group.id)
            .where(product.name.ilike(f"%{q}%") | group.name.ilike(f"%{q}%"))
            .select_from(m.Assign)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "assign/assigns.html",
        assigns=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
    )
