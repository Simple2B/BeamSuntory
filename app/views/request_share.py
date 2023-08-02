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


request_share_blueprint = Blueprint(
    "request_share", __name__, url_prefix="/request_share"
)


@request_share_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    # form_edit: f.RequestShareForm = f.RequestShareForm()

    q = request.args.get("q", type=str, default=None)
    query = m.RequestShare.select().order_by(m.RequestShare.id)
    count_query = sa.select(sa.func.count()).select_from(m.RequestShare)
    if q:
        query = (
            m.RequestShare.select()
            .where(m.RequestShare.name.like(f"{q}%"))
            .order_by(m.RequestShare.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.RequestShare.name.like(f"{q}%"))
            .select_from(m.RequestShare)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "request_share/request_shares.html",
        request_shares=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        # form_edit=form_edit,
    )


# TODO consider adding edit or not
# @request_share_blueprint.route("/edit", methods=["POST"])
# @login_required
# def save():
#     form = f.RequestShareForm()
#     if form.validate_on_submit():
#         query = m.RequestShare.select().where(
#             m.RequestShare.id == int(form.request_share_id.data)
#         )
#         a: m.RequestShare | None = db.session.scalar(query)
#         if not a:
#             log(
#                 log.ERROR,
#                 "Not found request_share by id : [%s]",
#                 form.request_share_id.data,
#             )
#             flash("Cannot save request_share data", "danger")
#             return redirect(url_for("request_share.get_all"))

#         a.quantity = form.quantity.data
#         a.product_id = form.product.data
#         a.save()
#         if form.next_url.data:
#             return redirect(form.next_url.data)
#         return redirect(url_for("request_share.get_all"))

#     else:
#         log(log.ERROR, "Request Share save errors: [%s]", form.errors)
#         flash(f"{form.errors}", "danger")
#         return redirect(url_for("request_share.get_all"))


@request_share_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    a: m.RequestShare = db.session.scalar(
        m.RequestShare.select().where(m.RequestShare.id == id)
    )
    if not a:
        log(log.INFO, "There is no request_share with id: [%s]", id)
        flash("There is no such request_share", "danger")
        return "no request_share", 404

    delete_a = sa.delete(m.RequestShare).where(m.RequestShare.id == id)

    db.session.execute(delete_a)
    db.session.commit()
    log(log.INFO, "Request Share deleted: [%s]", a)
    flash("Request Share deleted!", "success")
    return "ok", 200
