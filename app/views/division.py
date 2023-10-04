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


division_blueprint = Blueprint("division", __name__, url_prefix="/division")


@division_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewDivisionForm = f.NewDivisionForm()
    form_edit: f.DivisionForm = f.DivisionForm()

    q = request.args.get("q", type=str, default=None)
    query = m.Role.select().order_by(m.Role.id)
    count_query = sa.select(sa.func.count()).select_from(m.Role)
    if q:
        query = m.Role.select().where(m.Role.name.ilike(f"%{q}%")).order_by(m.Role.id)
        count_query = (
            sa.select(sa.func.count())
            .where(m.Role.name.ilike(f"%{q}%"))
            .select_from(m.Role)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    parent_roles = [
        i.name
        for i in db.session.execute(m.Role.select().order_by(m.Role.id)).scalars()
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
def save():
    form: f.DivisionForm = f.DivisionForm()
    if form.validate_on_submit():
        query = m.Role.select().where(m.Role.id == int(form.division_id.data))
        d: m.Role | None = db.session.scalar(query)
        if not d:
            log(log.ERROR, "Not found role by id : [%s]", form.division_id.data)
            flash("Cannot save role", "danger")

        d.name = form.role_name.data
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
def create():
    form: f.NewDivisionForm = f.NewDivisionForm()
    if not form.validate_on_submit():
        flash("This role is already taken.", "danger")
        return redirect(url_for("division.get_all"))
    if form.validate_on_submit():
        division = m.Role(
            name=form.role_name.data,
            activated=form.activated.data,
        )
        query = m.Role.select().where(m.Role.name == division.name)

        if db.session.scalar(query) is not None:
            log(log.INFO, "Cannot create role with name: [%s]", division.name)
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
def delete(id: int):
    division = db.session.get(m.Role, id)
    if not division:
        log(log.INFO, "There is no role with id: [%s]", id)
        flash("There is no such role", "danger")
        return "no role", 404

    db.session.delete(division)
    db.session.commit()
    log(log.INFO, "Role deleted. Role: [%s]", division)
    flash("Role deleted!", "success")
    return "ok", 200
