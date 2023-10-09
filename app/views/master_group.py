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
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


master_group_blueprint = Blueprint("master_group", __name__, url_prefix="/master_group")


@master_group_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def get_all():
    form_create = f.NewMasterGroupForm()
    form_edit = f.MasterGroupForm()

    q = request.args.get("q", type=str, default=None)
    query = m.MasterGroup.select().order_by(m.MasterGroup.id)
    count_query = sa.select(sa.func.count()).select_from(m.MasterGroup)
    if q:
        query = (
            m.MasterGroup.select()
            .where(m.MasterGroup.name.ilike(f"%{q}%"))
            .order_by(m.MasterGroup.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.MasterGroup.name.ilike(f"%{q}%"))
            .select_from(m.MasterGroup)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    master_groups_rows = db.session.execute(sa.select(m.MasterGroup)).all()
    master_groups_mandatory = [group.value for group in s.MasterGroupMandatory]

    return render_template(
        "master_group/master_groups.html",
        master_groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        main_master_groups=[i[0] for i in master_groups_rows],
        master_groups_mandatory=master_groups_mandatory,
        form_create=form_create,
        form_edit=form_edit,
    )


@master_group_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form = f.NewMasterGroupForm()
    if form.validate_on_submit():
        query = m.MasterGroup.select().where(m.MasterGroup.name == form.name.data)
        mgr: m.MasterGroup | None = db.session.scalar(query)
        if mgr:
            flash("This master group name is already taken.", "danger")
            return redirect(url_for("master_group.get_all"))
        master_group = m.MasterGroup(
            name=form.name.data,
        )
        log(log.INFO, "Form submitted. master_group: [%s]", master_group)
        master_group.save()
        flash("Master group added!", "success")
        return redirect(url_for("master_group.get_all"))
    else:
        log(log.ERROR, "Master group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("master_group.get_all"))


@master_group_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form = f.MasterGroupForm()
    if form.validate_on_submit():
        query = m.MasterGroup.select().where(
            m.MasterGroup.id == int(form.master_group_id.data)
        )
        u: m.MasterGroup | None = db.session.scalar(query)
        if not u:
            log(
                log.ERROR,
                "Not found master group by id : [%s]",
                form.master_group_id.data,
            )
            flash("Cannot save master group data", "danger")
        u.name = form.name.data
        u.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("master_group.get_all"))

    else:
        log(log.ERROR, "Master group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("master_group.get_all"))


@master_group_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    master_group = db.session.get(m.MasterGroup, id)
    master_groups_mandatory = [group.value for group in s.MasterGroupMandatory]

    if not master_group:
        log(log.INFO, "There is no master group with id: [%s]", id)
        flash("There is no such master group", "danger")
        return "no master group", 404

    query_group = db.session.scalar(
        m.Group.select().where(m.Group.master_group_id == master_group.id)
    )

    if query_group:
        log(
            log.INFO,
            "Can not delete master group, while groups are connected to it: [%s]",
            id,
        )
        flash("Can not delete master group, while groups are connected to it", "danger")
        return "can not delete master group", 202

    if master_group.name in master_groups_mandatory:
        log(
            log.INFO,
            "Can not delete master group, while master group is mandatory: [%s]",
            id,
        )
        flash("Can not delete master group, while master group is mandatory", "danger")
        return redirect(url_for("master_group.get_all"))

    db.session.delete(master_group)
    db.session.commit()
    log(log.INFO, "Master group deleted. Master group: [%s]", master_group)
    flash("Master group deleted!", "success")
    return "ok", 200
