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


division_blueprint = Blueprint("division", __name__, url_prefix="/division")


@division_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def get_all():
    form_create: f.NewDivisionForm = f.NewDivisionForm()
    form_edit: f.DivisionForm = f.DivisionForm()

    q = request.args.get("q", type=str, default=None)
    query = m.Division.select().order_by(m.Division.id)
    count_query = sa.select(sa.func.count()).select_from(m.Division)
    if q:
        query = (
            m.Division.select()
            .where(m.Division.role_name.ilike(f"%{q}%"))
            .order_by(m.Division.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Division.role_name.ilike(f"%{q}%"))
            .select_from(m.Division)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    parent_roles = [
        i.role_name
        for i in db.session.execute(
            m.Division.select().order_by(m.Division.id)
        ).scalars()
    ]

    return render_template(
        "division/divisions.html",
        divisions=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        parent_roles=parent_roles,
        form_create=form_create,
        form_edit=form_edit,
    )


@division_blueprint.route("/save", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form: f.DivisionForm = f.DivisionForm()
    if form.validate_on_submit():
        query = m.Division.select().where(m.Division.id == int(form.division_id.data))
        d: m.Division | None = db.session.scalar(query)
        if not d:
            log(log.ERROR, "Not found role by id : [%s]", form.division_id.data)
            flash("Cannot save role", "danger")
            return redirect(url_for("division.get_all"))

        if d.role_name in s.UserRole.list() and not d.label_role_name:
            log(log.ERROR, "Cannot edit role with name: [%s]", d.role_name)
            flash(f"Cannot edit role: {d.role_name}", "danger")
            return redirect(url_for("division.get_all"))

        d.label_role_name = form.role_name.data
        d.activated = form.activated.data
        d.save()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("division.get_all"))

    else:
        log(log.ERROR, "Role save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("division.get_all"))


@division_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form: f.NewDivisionForm = f.NewDivisionForm()
    if not form.validate_on_submit():
        flash("This role is already taken.", "danger")
        return redirect(url_for("division.get_all"))
    if form.validate_on_submit():
        # not mistake, set role_name to as s.UserRole.MANAGER.value
        division = m.Division(
            role_name=s.UserRole.MANAGER.value,
            activated=form.activated.data,
            label_role_name=form.role_name.data,
        )
        query = m.Division.select().where(
            m.Division.label_role_name == division.label_role_name
        )

        if db.session.scalar(query) is not None:
            log(
                log.INFO, "Cannot create role with name: [%s]", division.label_role_name
            )
            flash("This role is already taken.", "danger")
            return redirect(url_for("division.get_all"))
        log(log.INFO, "Form submitted. Division: [%s]", division)
        flash("Role added!", "success")
        division.save()

        return redirect(url_for("division.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("division.get_all"))


@division_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    division = db.session.get(m.Division, id)
    if not division:
        log(log.INFO, "There is no role with id: [%s]", id)
        flash("There is no such role", "danger")
        return "no role", 404

    if division.role_name in s.UserRole.list() and not division.label_role_name:
        log(log.ERROR, "Cannot delete role with name: [%s]", division.role_name)
        flash(f"Cannot delete role: {division.role_name}", "danger")
        return redirect(url_for("division.get_all"))

    db.session.delete(division)
    db.session.commit()
    log(log.INFO, "Role deleted. Role: [%s]", division)
    flash("Role deleted!", "success")
    return "ok", 200
