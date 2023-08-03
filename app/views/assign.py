from flask import (
    Blueprint,
    render_template,
    request,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, db


assign_blueprint = Blueprint("assign", __name__, url_prefix="/assign")


@assign_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    q = request.args.get("q", type=str, default=None)
    query = m.Assign.select().order_by(m.Assign.id)
    count_query = sa.select(sa.func.count()).select_from(m.Assign)
    if q:
        query = m.Assign.select().where(m.Assign.id.like(f"{q}%")).order_by(m.Assign.id)
        count_query = (
            sa.select(sa.func.count())
            .where(m.Assign.id.like(f"{q}%"))
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
