from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
import sqlalchemy as sa
from sqlalchemy.orm import aliased
from app.controllers import create_pagination

from app import models as m, db

adjust_blueprint = Blueprint("adjust", __name__, url_prefix="/adjust")


@adjust_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    product = aliased(m.Product)
    group = aliased(m.Group)
    adjust = aliased(m.Adjust)
    q = request.args.get("q", type=str, default=None)
    query = m.AdjustGroupQty.select().order_by(m.AdjustGroupQty.id)
    count_query = sa.select(sa.func.count()).select_from(m.AdjustGroupQty)
    if q:
        query = (
            m.AdjustGroupQty.select()
            .join(adjust, m.AdjustGroupQty.adjust_id == adjust.id)
            .join(group, m.AdjustGroupQty.group_id == group.id)
            .join(product, adjust.product_id == product.id)
            .where(
                group.name.ilike(f"%{q}%")
                | product.name.ilike(f"%{q}%")
                | adjust.note.ilike(f"%{q}%")
            )
            .order_by(m.AdjustGroupQty.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .join(adjust, m.AdjustGroupQty.adjust_id == adjust.id)
            .join(group, m.AdjustGroupQty.group_id == group.id)
            .join(product, adjust.product_id == product.id)
            .where(
                group.name.ilike(f"%{q}%")
                | product.name.ilike(f"%{q}%")
                | adjust.note.ilike(f"%{q}%")
            )
            .select_from(m.AdjustGroupQty)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "adjust/adjusts.html",
        adjust_groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
    )
