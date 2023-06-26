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
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log


group_blueprint = Blueprint("group", __name__, url_prefix="/group")


@group_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    q = request.args.get("q", type=str, default=None)
    query = m.Group.select().order_by(m.Group.id)
    count_query = sa.select(sa.func.count()).select_from(m.Group)
    if q:
        query = m.Group.select().where(m.User.name.like(f"{q}%")).order_by(m.Group.id)
        count_query = (
            sa.select(sa.func.count())
            .where(m.Group.name.like(f"{q}%"))
            .select_from(m.Group)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "group/groups.html",
        group=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
    )


@group_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form = f.GroupForm()
    if form.validate_on_submit():
        group = m.Group(
            name=form.name.data,
            master_group_id=form.master_group.data,
        )
        log(log.INFO, "Form submitted. Group: [%s]", group)
        group.save()
        flash("Group added!", "success")
        return redirect(url_for("group.get_all"))


@group_blueprint.route("/edit", methods=["POST"])
@login_required
def save():
    form = f.GroupForm()
    if form.validate_on_submit():
        query = m.Group.select().where(m.Group.id == int(form.user_id.data))
        u: m.User | None = db.session.scalar(query)
        if not u:
            log(log.ERROR, "Not found user by id : [%s]", form.user_id.data)
            flash("Cannot save user data", "danger")
        u.username = form.username.data
        u.email = form.email.data
        u.activated = form.activated.data
        if form.password.data.strip("*\n "):
            u.password = form.password.data
        u.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("user.get_all"))

    else:
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))
