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
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log


stock_target_group_blueprint = Blueprint(
    "stock_target_group", __name__, url_prefix="/stock_target_group"
)


@stock_target_group_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def get_all():
    form_create = f.NewGroupForm()
    form_edit = f.GroupForm()

    master_group = aliased(m.MasterGroup)
    q = request.args.get("q", type=str, default=None)
    query = (
        m.Group.select().where(m.Group.parent_group_id.is_(None)).order_by(m.Group.name)
    ).order_by(m.Group.name.asc())
    count_query = sa.select(sa.func.count()).select_from(m.Group)
    if q:
        query = (
            m.Group.select()
            .join(master_group, m.Group.master_group_id == master_group.id)
            .where(m.Group.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%"))
        )
        count_query = (
            sa.select(sa.func.count())
            .join(master_group, m.Group.master_group_id == master_group.id)
            .where(m.Group.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%"))
            .select_from(m.Group)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    master_groups_rows_objs = db.session.execute(m.MasterGroup.select()).all()
    master_groups = [row[0] for row in master_groups_rows_objs]

    return render_template(
        "stock_target_group/stock_target_groups.html",
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


@stock_target_group_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form = f.NewGroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("stock_target_group.get_all"))

    master_group = db.session.get(m.MasterGroup, form.master_group.data)
    if not master_group:
        flash("Master group is incorrect", "danger")
        return redirect(url_for("stock_target_group.get_all"))
    group = m.Group(
        name=form.name.data,
        master_group_id=master_group.id,
    )
    log(log.INFO, "Form submitted. Group: [%s]", group)
    group.save()

    admin_users = db.session.scalars(
        m.User.select().where(
            m.User.role_obj.has(m.Division.role_name == s.UserRole.ADMIN.value)
        )
    )

    for user in admin_users:
        m.UserGroup(left_id=user.id, right_id=group.id).save()

    flash("Group added!", "success")
    return redirect(url_for("stock_target_group.get_all"))


@stock_target_group_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form = f.GroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("stock_target_group.get_all"))

    group = db.session.get(m.Group, int(form.group_id.data))
    if not group:
        log(log.ERROR, "Not found group by id : [%s]", form.group_id.data)
        flash("Group not found", "danger")
        return redirect(url_for("stock_target_group.get_all"))

    master_group = db.session.get(m.MasterGroup, form.master_group.data)
    if not master_group:
        flash("Master group is incorrect", "danger")
        return redirect(url_for("stock_target_group.get_all"))

    group.name = form.name.data
    group.master_group_id = master_group.id
    group.save()
    if form.next_url.data:
        return redirect(form.next_url.data)
    return redirect(url_for("stock_target_group.get_all"))


@stock_target_group_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    group = db.session.get(m.Group, id)
    if not group:
        log(log.INFO, "There is no group with id: [%s]", id)
        flash("There is no such group", "danger")
        return "no group", 404

    db.session.delete(group)
    try:
        db.session.commit()
    except IntegrityError as e:
        log(log.ERROR, "Group deletion error: [%s]", e)
        db.session.rollback()
        flash("Unable to delete group, group has dependencies", "danger")
        return "Unable to delete group, group has dependencies", 409
    log(log.INFO, "Group deleted. Group: [%s]", group)
    flash("Group deleted!", "success")
    return "ok", 200
