import sqlalchemy as sa
from flask import (
    Blueprint,
    flash,
    redirect,
    render_template,
    request,
    url_for,
)
from flask_login import login_required

from app import db
from app import forms as f
from app import models as m
from app import schema as s
from app.controllers import create_pagination, role_required
from app.logger import log

master_billable_group_bp = Blueprint(
    "master_billable_group", __name__, url_prefix="/master_billable_group"
)


@master_billable_group_bp.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_create: f.NewMasterBillableGroupForm = f.NewMasterBillableGroupForm()
    form_edit: f.MasterBillableGroupForm = f.MasterBillableGroupForm()

    q = request.args.get("q", type=str, default=None)
    query = m.MasterBillableGroup.select().order_by(m.MasterBillableGroup.name.asc())
    count_query = sa.select(sa.func.count()).select_from(m.MasterBillableGroup)
    if q:
        query = (
            m.MasterBillableGroup.select()
            .where(m.MasterBillableGroup.name.ilike(f"%{q}%"))
            .order_by(m.MasterBillableGroup.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.MasterBillableGroup.name.ilike(f"%{q}%"))
            .select_from(m.MasterBillableGroup)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    master_groups_rows = db.session.execute(sa.select(m.MasterBillableGroup)).all()

    return render_template(
        "master_billable_group/master_billable_groups.html",
        master_groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        main_master_groups=[i[0] for i in master_groups_rows],
        form_create=form_create,
        form_edit=form_edit,
    )


@master_billable_group_bp.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def create():
    form: f.NewMasterBillableGroupForm = f.NewMasterBillableGroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Master group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("master_billable_group.get_all"))
    master_group = m.MasterBillableGroup(name=form.name.data)
    log(log.INFO, "Form submitted. master_group: [%s]", master_group)
    master_group.save()
    flash("Master group added!", "success")
    return redirect(url_for("master_billable_group.get_all"))


@master_billable_group_bp.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def save():
    form: f.MasterBillableGroupForm = f.MasterBillableGroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Master group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("master_billable_group.get_all"))

    master_group = db.session.get(
        m.MasterBillableGroup, form.master_billable_group_id.data
    )
    if not master_group:
        log(
            log.ERROR,
            "Not found master group by id : [%s]",
            form.master_billable_group_id.data,
        )
        flash("Cannot save master group data", "danger")
        return redirect(url_for("master_billable_group.get_all"))

    master_group.name = form.name.data
    master_group.save()
    return redirect(url_for("master_billable_group.get_all"))


@master_billable_group_bp.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def delete(id: int):
    master_group = db.session.get(m.MasterBillableGroup, id)
    if not master_group:
        log(log.INFO, "There is no master group with id: [%s]", id)
        flash("There is no such master group", "danger")
        return "no master group", 404

    if master_group.billable_groups:
        log(
            log.INFO,
            "Can not delete master group, while groups are connected to it: [%s]",
            id,
        )
        flash("Can not delete master group, while groups are connected to it", "danger")
        return "can not delete master group", 202

    db.session.delete(master_group)
    db.session.commit()
    log(log.INFO, "Master group deleted. Master group: [%s]", master_group)
    flash("Master group deleted!", "success")
    return "ok", 200
