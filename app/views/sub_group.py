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
    if form.validate_on_submit():
        # query = m.Group.select().where(m.Group.name == form.name.data)
        # gr: m.Group | None = db.session.scalar(query)
        # if gr:
        #     flash("This group name is already taken.", "danger")
        #     return redirect(url_for("sub_stock_target_group.get_all"))
        parent_group = db.session.get(m.Group, form.group_id.data)
        if not parent_group:
            log(log.ERROR, "Not found group by id : [%s]", form.group_id.data)
            flash("Cannot create group", "danger")
            return redirect(url_for("sub_stock_target_group.get_all"))

        group = m.Group(
            name=form.name.data,
            master_group_id=parent_group.master_group_id,
            parent_group_id=parent_group.id,
        )
        log(log.INFO, "Form submitted. Group: [%s]", group)
        group.save()

        admin_users = db.session.scalars(
            m.User.select().where(
                m.User.role_obj.has(m.Division.role_name == s.UserRole.ADMIN.value)
            )
        )

        for user in admin_users:
            m.UserGroup(left_id=user.id, right_id=group.id)

        db.session.commit()

        flash("Group added!", "success")
        return redirect(url_for("sub_stock_target_group.get_all"))
    else:
        log(log.ERROR, "Group creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("sub_stock_target_group.get_all"))


@sub_stock_target_group_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form = f.SubGroupForm()
    if form.validate_on_submit():
        query = m.Group.select().where(m.Group.id == int(form.group_id.data))
        group: m.Group | None = db.session.scalar(query)
        if not group:
            log(log.ERROR, "Not found group by id : [%s]", form.group_id.data)
            flash("Cannot save group data", "danger")

        parent_group = db.session.get(m.Group, form.parent_group_id.data)
        if not parent_group:
            log(log.ERROR, "Not found group by id : [%s]", form.parent_group_id.data)
            flash("Cannot save group data", "danger")
            return redirect(url_for("sub_stock_target_group.get_all"))

        group.name = form.name.data
        group.master_group_id = parent_group.master_group_id
        group.parent_group_id = parent_group.id
        group.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("sub_stock_target_group.get_all"))

    else:
        log(log.ERROR, "group save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
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
        template = "sub_stock_target_group/sub_group_datalist_inbound_order.html"
        model_root = s.GroupRoot.model_validate(sub_groups)

        return s.Group.model_dump_json(model_root)

    if params.type_select:
        template = "sub_stock_target_group/sub_group_select.html"

    model_root = s.GroupRoot.model_validate(sub_groups)

    return render_template(
        template,
        sub_groups=sub_groups,
    )
