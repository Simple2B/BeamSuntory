from typing import List
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    current_app as app,
)
from flask_login import login_required
from flask_mail import Message
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, schema as s, db, mail
from app import forms as f
from app.logger import log


bp = Blueprint("user", __name__, url_prefix="/user")


@bp.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewUserForm = f.NewUserForm()
    form_edit: f.UserForm = f.UserForm()

    q = request.args.get("q", type=str, default=None)
    query = m.User.select().order_by(m.User.id)
    count_query = sa.select(sa.func.count()).select_from(m.User)
    if q:
        {role.name: role for role in s.UserRole}
        query = (
            m.User.select()
            .where(
                m.User.username.like(f"{q}%")
                | m.User.email.like(f"{q}%")
                | m.User.role.in_([r for r in s.UserRole if q in r.name])
            )
            .order_by(m.User.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(
                m.User.username.like(f"{q}%")
                | m.User.email.like(f"{q}%")
                | m.User.role.in_([r for r in s.UserRole if q in r.name])
            )
            .select_from(m.User)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    groups_rows = db.session.execute(sa.select(m.Group)).all()
    master_groups_rows = db.session.execute(sa.select(m.MasterGroup)).all()

    return render_template(
        "user/users.html",
        users=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        groups=[i[0] for i in groups_rows],
        main_master_groups=[i[0] for i in master_groups_rows],
        form_create=form_create,
        form_edit=form_edit,
    )


@bp.route("/save", methods=["POST"])
@login_required
def save():
    form = f.UserForm()
    if form.validate_on_submit():
        query = m.User.select().where(m.User.id == int(form.user_id.data))
        u: m.User | None = db.session.scalar(query)
        if not u:
            log(log.ERROR, "Not found user by id : [%s]", form.user_id.data)
            flash("Cannot save user data", "danger")

        u.username = form.username.data
        u.email = form.email.data
        u.role = form.role.data
        u.country = form.country.data
        u.city = form.city.data
        u.region = form.region.data
        u.street_address = form.street_address.data
        u.zip_code = form.zip_code.data
        u.activated = form.activated.data
        u.approval_permission = form.approval_permission.data
        u.sales_rep = form.sales_rep.data
        u.phone_number = form.phone_number.data
        if form.password.data.strip("*\n "):
            u.password = form.password.data
        u.save()

        # delete old groups from user_group relational table
        # and add new groups to user_group relational table
        g_query = m.Group.select().where(
            m.Group.name.in_(str(form.group.data).split(", "))
        )
        group_obj: m.Group | None = db.session.scalars(g_query)
        group_ids = [g.id for g in group_obj]

        user_groups_obj: m.UserGroup = db.session.execute(
            m.UserGroup.select().where(m.UserGroup.left_id == u.id)
        ).scalars()
        user_group_group_ids = [ug.right_id for ug in user_groups_obj]

        for user_group_id in user_group_group_ids:
            if user_group_id not in group_ids:
                db.session.execute(
                    sa.delete(m.UserGroup).where(
                        m.UserGroup.right_id == user_group_id,
                        m.UserGroup.left_id == u.id,
                    )
                )
                db.session.commit()
        for group_id in group_ids:
            if group_id not in user_group_group_ids:
                m.UserGroup(left_id=u.id, right_id=group_id).save()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("user.get_all"))

    else:
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))


@bp.route("/create", methods=["POST"])
@login_required
def create():
    form = f.NewUserForm()
    if not form.validate_on_submit():
        flash("This username or email is already taken.", "danger")
        return redirect(url_for("user.get_all"))
    if form.validate_on_submit():
        user = m.User(
            username=form.username.data,
            email=form.email.data,
            role=form.role.data,
            password=form.password.data,
            activated=form.activated.data,
            country=form.country.data,
            region=form.region.data,
            city=form.city.data,
            zip_code=form.zip_code.data,
            street_address=form.street_address.data,
            approval_permission=form.approval_permission.data,
            sales_rep=form.sales_rep.data,
            phone_number=form.phone_number.data,
        )
        log(log.INFO, "Form submitted. User: [%s]", user)
        flash("User added!", "success")
        user.save()

        g_query = m.Group.select().where(
            m.Group.name.in_(str(form.group.data).split(", "))
        )
        group_obj: m.Group | None = db.session.scalars(g_query)
        group_ids: List[m.Group] = [g.id for g in group_obj]
        for group_id in group_ids:
            m.UserGroup(left_id=user.id, right_id=group_id).save()
        # create e-mail message
        msg = Message(
            subject="New password",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email],
        )
        url = url_for(
            "auth.password_recovery",
            reset_password_uid=user.unique_id,
            _external=True,
        )

        msg.html = render_template(
            "email/set.html",
            user=user,
            url=url,
        )
        mail.send(msg)

        return redirect(url_for("user.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("user.get_all"))


@bp.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    u = db.session.scalar(m.User.select().where(m.User.id == id))
    if not u:
        log(log.INFO, "There is no user with id: [%s]", id)
        flash("There is no such user", "danger")
        return "no user", 404

    delete_u = sa.delete(m.UserGroup).where(m.UserGroup.left_id == u.id)
    db.session.execute(delete_u)

    db.session.delete(u)
    db.session.commit()
    log(log.INFO, "User deleted. User: [%s]", u)
    flash("User deleted!", "success")
    return "ok", 200
