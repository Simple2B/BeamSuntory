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

from app import schema as s
from app import models as m, db
from app import forms as f
from app.logger import log


sub_stock_target_group_blueprint = Blueprint(
    "sub_stock_target_group", __name__, url_prefix="/sub_stock_target_group"
)


@sub_stock_target_group_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def get_all():
    form_create = f.NewSubGroupForm()
    form_edit = f.SubGroupForm()

    master_group = aliased(m.MasterGroup)
    q = request.args.get("q", type=str, default=None)
    query = (
        sa.select(m.Group)
        .where(m.Group.parent_group_id.isnot(None))
        .order_by(m.Group.name)
    )
    count_query = (
        sa.select(sa.func.count())
        .where(m.Group.parent_group_id.isnot(None))
        .select_from(m.Group)
    )
    if q:
        query = (
            m.Group.select()
            .join(master_group, m.Group.master_group_id == master_group.id)
            .where(m.Group.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%"))
            .order_by(m.Group.name)
        )
        count_query = (
            sa.select(sa.func.count())
            .join(master_group, m.Group.master_group_id == master_group.id)
            .where(m.Group.name.ilike(f"%{q}%") | master_group.name.ilike(f"%{q}%"))
            .select_from(m.Group)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    all_groups = db.session.scalars(sa.select(m.Group)).all()

    return render_template(
        "sub_stock_target_group/groups.html",
        groups=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        all_groups=all_groups,
        form_create=form_create,
        form_edit=form_edit,
    )


@sub_stock_target_group_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form = f.NewSubGroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "Group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    parent_group = db.session.get(m.Group, form.group_id.data)
    if not parent_group:
        log(log.ERROR, "Not found group by id : [%s]", form.group_id.data)
        flash("Cannot create group", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    sub_group = db.session.get(m.Group, form.sub_group_id.data)

    if not sub_group:
        log(log.INFO, "There is no such sub group: [%s]", form.sub_group_id.data)
        flash("There is no such sub group", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    if sub_group.parent_group_id is not None:
        log(log.INFO, "Sub group already has parent group: [%s]", sub_group)
        flash("Sub group already exist", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    if parent_group == sub_group:
        log(log.INFO, "Group and sub group are the same: [%s]", sub_group)
        flash("Group and sub group are the same", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    sub_group.parent_group_id = parent_group.id
    sub_group.save()
    log(log.INFO, "Sub group created. Group: [%s]", sub_group)
    flash("Sub Group created!", "success")
    return redirect(url_for("sub_stock_target_group.get_all"))


@sub_stock_target_group_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form = f.SubGroupForm()
    if not form.validate_on_submit():
        log(log.ERROR, "group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    parent_group = db.session.get(m.Group, form.group_id.data)
    if not parent_group:
        log(log.ERROR, "Not found group by id : [%s]", form.group_id.data)
        flash("Cannot create group", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    new_sub_group = db.session.get(m.Group, form.new_sub_group_id.data)

    if not new_sub_group:
        log(log.INFO, "There is no such sub group: [%s]", form.new_sub_group_id.data)
        flash("There is no such sub group", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    current_sub_group = db.session.get(m.Group, form.group_id.data)

    if not current_sub_group:
        log(log.INFO, "There is no such sub group: [%s]", form.group_id.data)
        flash("There is no such sub group", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    if new_sub_group.parent_group_id is not None:
        log(log.INFO, "Sub group already has parent group: [%s]", new_sub_group)
        flash("Sub group already exist", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    if parent_group == new_sub_group:
        log(log.INFO, "Group and sub group are the same: [%s]", new_sub_group)
        flash("Group and sub group are the same", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))

    new_sub_group.parent_group_id = parent_group.id
    current_sub_group.parent_group_id = None

    db.session.commit()

    log(log.INFO, "Sub group created. Group: [%s]", new_sub_group)

    if form.next_url.data:
        return redirect(form.next_url.data)
    return redirect(url_for("sub_stock_target_group.get_all"))


@sub_stock_target_group_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    group = db.session.get(m.Group, id)
    if not group:
        log(log.INFO, "There is no group with id: [%s]", id)
        flash("There is no such group", "danger")
        return "no group", 404

    group.parent_group_id = None
    db.session.commit()
    log(log.INFO, "Sub Group was moved to Group. Group: [%s]", group)
    flash("Sub Group deleted!", "success")
    return "ok", 200


@sub_stock_target_group_blueprint.route("/get_sub_group", methods=["GET"])
def get_sub_group():
    try:
        params = s.SubGroupParams.model_validate(dict(request.args))
    except ValidationError as e:
        log(log.ERROR, "Validation error: [%s]", e)
        return "Validation error", 400

    group = db.session.get(m.Group, params.group_id)

    if not group:
        log(log.INFO, "There is no group with id: [%s]", params.group_id)
        return "no group", 404

    sub_groups = db.session.scalars(
        sa.select(m.Group).where(m.Group.parent_group_id == params.group_id)
    ).all()

    template = "sub_stock_target_group/sub_group_datalist.html"

    if params.inbound_order:
        log(log.INFO, "Inbound order params")
        template = "sub_stock_target_group/sub_group_datalist_inbound_order.html"
        model_root = s.GroupRoot.model_validate(sub_groups)

        return s.Group.model_dump_json(model_root)

    if params.type_select:
        log(log.INFO, "Type select params")
        template = "sub_stock_target_group/sub_group_select.html"

    model_root = s.GroupRoot.model_validate(sub_groups)

    return render_template(
        template,
        sub_groups=sub_groups,
    )
