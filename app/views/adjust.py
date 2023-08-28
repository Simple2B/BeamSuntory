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
    q = request.args.get("q", type=str, default=None)
    query = m.Adjust.select().order_by(m.Adjust.created_at.desc())
    count_query = sa.select(sa.func.count()).select_from(m.Adjust)
    if q:
        query = (
            m.Adjust.select()
            .join(product, m.Adjust.product_id == product.id)
            .where(product.name.ilike(f"%{q}%"))
            .order_by(m.Adjust.created_at.desc())
        )
        count_query = (
            sa.select(sa.func.count())
            .join(product, m.Adjust.product_id == product.id)
            .where(product.name.ilike(f"%{q}%"))
            .select_from(m.Adjust)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "adjust/adjusts.html",
        adjusts=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
    )
