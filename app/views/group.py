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
        query = m.Group.select().where(m.Group.name.like(f"{q}%")).order_by(m.Group.id)
        count_query = (
            sa.select(sa.func.count())
            .where(m.Group.name.like(f"{q}%"))
            .select_from(m.Group)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    master_groups_rows_objs = db.session.execute(m.MasterGroup.select()).all()
    master_groups = [row[0] for row in master_groups_rows_objs]

    return render_template(
        "group/groups.html",
        groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        master_groups=master_groups,
    )


@group_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form = f.NewGroupForm()
    if form.validate_on_submit():
        group = m.Group(
            name=form.name.data,
            master_group_id=form.master_group.data,
        )
        log(log.INFO, "Form submitted. Group: [%s]", group)
        group.save()
        flash("Group added!", "success")
        return redirect(url_for("group.get_all"))
    else:
        log(log.ERROR, "Group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("group.get_all"))


@group_blueprint.route("/edit", methods=["POST"])
@login_required
def save():
    form = f.GroupForm()
    if form.validate_on_submit():
        query = m.Group.select().where(m.Group.id == int(form.group_id.data))
        u: m.Group | None = db.session.scalar(query)
        if not u:
            log(log.ERROR, "Not found group by id : [%s]", form.group_id.data)
            flash("Cannot save group data", "danger")
        u.name = form.name.data
        u.master_group_id = form.master_group.data
        u.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("group.get_all"))

    else:
        log(log.ERROR, "group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("group.get_all"))


@group_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    u = db.session.scalar(m.Group.select().where(m.Group.id == id))
    if not u:
        log(log.INFO, "There is no group with id: [%s]", id)
        flash("There is no such group", "danger")
        return "no group", 404

    db.session.delete(u)
    db.session.commit()
    log(log.INFO, "Group deleted. Group: [%s]", u)
    flash("Group deleted!", "success")
    return "ok", 200
