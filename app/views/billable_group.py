from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)
from flask_login import login_required
from pydantic import ValidationError
import sqlalchemy as sa
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


billable_group_bp = Blueprint("billable_group", __name__, url_prefix="/billable_group")


@billable_group_bp.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_create: f.NewBillableGroupForm = f.NewBillableGroupForm()
    form_edit: f.BillableGroupForm = f.BillableGroupForm()

    master_group = aliased(m.MasterBillableGroup)
    q = request.args.get("q", type=str, default=None)
    query = sa.select(m.BillableGroup).order_by(m.BillableGroup.name.asc())
    count_query = sa.select(sa.func.count()).select_from(m.BillableGroup)
    if q:
        query = (
            sa.select(m.BillableGroup)
            .join(
                master_group,
                m.BillableGroup.master_billable_group_id == master_group.id,
            )
            .where(
                m.BillableGroup.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%")
            )
            .order_by(m.BillableGroup.name.asc())
        )
        count_query = (
            sa.select(sa.func.count())
            .join(
                master_group,
                m.BillableGroup.master_billable_group_id == master_group.id,
            )
            .where(
                m.BillableGroup.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%")
            )
            .select_from(m.BillableGroup)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    master_billable_groups = db.session.scalars(sa.select(m.MasterBillableGroup)).all()

    return render_template(
        "billable_group/billable_groups.html",
        groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        master_billable_groups=master_billable_groups,
    )


@billable_group_bp.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def create():
    form: f.NewBillableGroupForm = f.NewBillableGroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Billable group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("billable_group.get_all"))
    master_group = db.session.scalar(
        m.MasterBillableGroup.select().where(
            m.MasterBillableGroup.id == form.master_billable_group_id.data
        )
    )
    billable_group = m.BillableGroup(
        name=form.name.data,
        master_billable_group=master_group,
        rate=form.rate.data,
        assigned_to_inbound=form.assigned_to_inbound.data,
        assigned_to_outbound=form.assigned_to_outbound.data,
        excluded_from_global_increase=form.excluded_from_global_increase.data,
    )
    log(log.INFO, "Form submitted. master_group: [%s]", master_group)
    billable_group.save()
    flash("Billable group added!", "success")
    return redirect(url_for("billable_group.get_all"))


@billable_group_bp.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def save():
    form: f.BillableGroupForm = f.BillableGroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Billable group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("billable_group.get_all"))
    billable_group = db.session.get(m.BillableGroup, form.billable_group_id.data)
    master_group = db.session.get(
        m.MasterBillableGroup, form.master_billable_group_id.data
    )
    if not master_group or not billable_group:
        log(
            log.ERROR,
            "Not found group by id : [%s]",
            form.master_billable_group_id.data,
        )
        flash("Cannot save master group data", "danger")
        return redirect(url_for("billable_group.get_all"))

    billable_group.name = form.name.data
    billable_group.rate = form.rate.data
    billable_group.assigned_to_inbound = form.assigned_to_inbound.data
    billable_group.assigned_to_outbound = form.assigned_to_outbound.data
    billable_group.excluded_from_global_increase = (
        form.excluded_from_global_increase.data
    )
    billable_group.master_billable_group = master_group
    billable_group.save()
    return redirect(url_for("billable_group.get_all"))


@billable_group_bp.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def delete(id: int):
    billable_group = db.session.get(m.BillableGroup, id)
    if not billable_group:
        log(log.INFO, "There is no billable group with id: [%s]", id)
        flash("There is no such billable group", "danger")
        return "no billable group", 404

    db.session.delete(billable_group)
    db.session.commit()
    log(log.INFO, "Billable group deleted. Master group: [%s]", billable_group)
    flash("Billable group deleted!", "success")
    return "ok", 200


@billable_group_bp.route("/create_many", methods=["POST"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def create_many():
    form: f.NewBillableGroupsForm = f.NewBillableGroupsForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Billable group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("billable_group.get_all"))
    master_group = db.session.scalar(
        m.MasterBillableGroup.select().where(
            m.MasterBillableGroup.id == form.master_billable_group_id.data
        )
    )
    try:
        groups_data = s.GroupAllocatedList.model_validate_json(form.groups.data)
    except ValidationError:
        log(
            log.INFO,
            "Billable multiple creating validation failed: [%s]",
            form.groups.data,
        )
        flash("Billable multiple creating validation: wrong group data", "danger")
        return redirect(url_for("billable_group.get_all"))

    for group_data in groups_data.root:
        billable_group = m.BillableGroup(
            name=group_data.name,
            master_billable_group=master_group,
            rate=group_data.rate,
            assigned_to_inbound=group_data.assigned_to_inbound,
            assigned_to_outbound=group_data.assigned_to_outbound,
            excluded_from_global_increase=group_data.excluded_from_global_increase,
        )
        log(log.INFO, "Billable group created. master_group: [%s]", master_group)
        billable_group.save()
    flash("Billable groups added!", "success")
    return redirect(url_for("billable_group.get_all"))


@billable_group_bp.route("/increase_costs", methods=["POST"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def increase_costs():
    data = request.get_json()
    validated_data = s.BillableGroupIncreaseCostRequest.model_validate(data)
    if not validated_data:
        log(log.ERROR, "Increase costs validation failed: [%s]", data)
        flash("Increase costs validation failed", "danger")
        return "validation failed", 400
    cost = validated_data.cost
    billable_groups = db.session.scalars(sa.select(m.BillableGroup)).all()
    if not billable_groups:
        log(log.INFO, "There is no billable groups")
        flash("There is no billable groups", "danger")
        return "no billable groups", 404
    for group in billable_groups:
        if group.excluded_from_global_increase:
            continue
        group.rate *= 1 + cost / 100
        group.rate = round(group.rate, 2)
        group.save()
    db.session.commit()
    return "ok", 200
