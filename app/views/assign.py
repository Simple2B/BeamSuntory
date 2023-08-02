from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    # redirect,
    # url_for,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, db

# from app import forms as f
from app.logger import log


assign_blueprint = Blueprint("assign", __name__, url_prefix="/assign")


@assign_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    # form_edit: f.AssignForm = f.AssignForm()

    q = request.args.get("q", type=str, default=None)
    query = m.Assign.select().order_by(m.Assign.id)
    count_query = sa.select(sa.func.count()).select_from(m.Assign)
    if q:
        query = (
            m.Assign.select().where(m.Assign.name.like(f"{q}%")).order_by(m.Assign.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Assign.name.like(f"{q}%"))
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
        # form_edit=form_edit,
    )


# TODO consider adding edit or not
# @assign_blueprint.route("/edit", methods=["POST"])
# @login_required
# def save():
#     form = f.AssignForm()
#     if form.validate_on_submit():
#         query = m.Assign.select().where(
#             m.Assign.id == int(form.assign_id.data)
#         )
#         a: m.Assign | None = db.session.scalar(query)
#         if not a:
#             log(
#                 log.ERROR,
#                 "Not found assign by id : [%s]",
#                 form.assign_id.data,
#             )
#             flash("Cannot save assign data", "danger")
#             return redirect(url_for("assign.get_all"))

#         a.quantity = form.quantity.data
#         a.product_id = form.product.data
#         a.save()
#         if form.next_url.data:
#             return redirect(form.next_url.data)
#         return redirect(url_for("assign.get_all"))

#     else:
#         log(log.ERROR, "Assign save errors: [%s]", form.errors)
#         flash(f"{form.errors}", "danger")
#         return redirect(url_for("assign.get_all"))


@assign_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    a: m.Assign = db.session.scalar(m.Assign.select().where(m.Assign.id == id))
    if not a:
        log(log.INFO, "There is no assign with id: [%s]", id)
        flash("There is no such assign", "danger")
        return "no assign", 404

    delete_a = sa.delete(m.Assign).where(m.Assign.id == id)

    db.session.execute(delete_a)
    db.session.commit()
    log(log.INFO, "Assign deleted: [%s]", a)
    flash("Assign deleted!", "success")
    return "ok", 200
