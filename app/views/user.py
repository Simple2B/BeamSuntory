from typing import List
from datetime import datetime
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    current_app as app,
)
from flask_login import login_required, current_user
from flask_mail import Message
import sqlalchemy as sa
from sqlalchemy.orm import aliased
from app.controllers import create_pagination, role_required

from app import schema as s

from app import models as m, db, mail
from app import forms as f
from app.logger import log
from config import SALES_REP_LOCKER_NAME


bp = Blueprint("user", __name__, url_prefix="/user")


@bp.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def get_all():
    form_create: f.NewUserForm = f.NewUserForm()
    form_edit: f.UserForm = f.UserForm()

    role = aliased(m.Division)
    q = request.args.get("q", type=str, default=None)
    query = m.User.select().where(m.User.is_deleted.is_(False)).order_by(m.User.id)
    count_query = (
        sa.select(sa.func.count())
        .where(m.User.is_deleted.is_(False))
        .select_from(m.User)
    )
    if q:
        query = (
            m.User.select()
            .join(role, m.User.role == role.id)
            .where(
                m.User.is_deleted.is_(False),
                m.User.username.ilike(f"%{q}%")
                | m.User.email.ilike(f"%{q}%")
                | role.role_name.ilike(f"%{q}%"),
            )
            .order_by(m.User.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .join(role, m.User.role == role.id)
            .where(
                m.User.is_deleted.is_(False),
                m.User.username.ilike(f"%{q}%")
                | m.User.email.ilike(f"%{q}%")
                | role.role_name.ilike(f"%{q}%"),
            )
            .select_from(m.User)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "user/users.html",
        users=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        groups=list(db.session.scalars(m.Group.select().order_by(m.Group.name))),
        main_master_groups=list(
            db.session.scalars(m.MasterGroup.select().order_by(m.MasterGroup.name))
        ),
        form_create=form_create,
        form_edit=form_edit,
        divisions=list(db.session.scalars(m.Division.select())),
    )


@bp.route("/save", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def save():
    form = f.UserForm()
    if not form.validate_on_submit():
        log(log.ERROR, "User save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("user.get_all"))

    query = m.User.select().where(m.User.id == int(form.user_id.data))
    user: m.User | None = db.session.scalar(query)
    if not user:
        log(log.ERROR, "Not found user by id : [%s]", form.user_id.data)
        flash("Cannot save user data", "danger")

    was_user_activated = not user.activated

    user.username = form.username.data
    user.email = form.email.data
    user.role = form.role.data
    user.country = form.country.data
    user.city = form.city.data
    user.region = form.region.data
    user.street_address = form.street_address.data
    user.zip_code = form.zip_code.data
    user.activated = form.activated.data
    user.approval_permission = form.approval_permission.data
    user.sales_rep = form.sales_rep.data
    user.phone_number = form.phone_number.data
    if form.password.data.strip("*\n "):
        user.password = form.password.data

    if (
        current_user.role_obj.role_name == s.UserRole.WAREHOUSE_MANAGER.value
        and user.role_obj.role_name != s.UserRole.WAREHOUSE_MANAGER.value
    ):
        log(
            log.ERROR,
            "Warehouse manager can not edit user with role: [%s]",
            user.role_obj.role_name,
        )
        flash("Warehouse manager can create only warehouse managers", "danger")
        return redirect(url_for("user.get_all"))
    user.save()

    # and add new groups to user_group relational table
    g_query = m.Group.select().where(m.Group.name.in_(str(form.group.data).split(", ")))
    group_obj: m.Group | None = db.session.scalars(g_query)
    group_ids = [g.id for g in group_obj]

    user_groups_obj: m.UserGroup = db.session.scalars(
        m.UserGroup.select().where(m.UserGroup.left_id == user.id)
    )
    user_group_group_ids = [ug.right_id for ug in user_groups_obj]

    for user_group_id in user_group_group_ids:
        if user_group_id not in group_ids:
            if user.role_obj.role_name == s.UserRole.ADMIN.value:
                log(log.ERROR, "Can not remove groups from user: admin")
                flash(
                    "Can not remove groups from user: admin",
                    "danger",
                )
                return redirect(url_for("user.get_all"))
            else:
                db.session.execute(
                    sa.delete(m.UserGroup).where(
                        m.UserGroup.right_id == user_group_id,
                        m.UserGroup.left_id == user.id,
                    )
                )
                db.session.commit()

    for group_id in group_ids:
        if group_id not in user_group_group_ids:
            m.UserGroup(left_id=user.id, right_id=group_id).save()

    if was_user_activated and form.activated.data:
        log(log.INFO, "Sending email to active user: [%s]", user.email)
        msg = Message(
            subject="New password",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=["nazarr.kobryn@gmail.com"],
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
            app_name=app.config["APP_NAME"],
        )
        mail.send(msg)

    if form.next_url.data:
        return redirect(form.next_url.data)
    return redirect(url_for("user.get_all"))


@bp.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def create():
    form = f.NewUserForm()
    if not form.validate_on_submit():
        flash("This username or email is already taken.", "danger")
        return redirect(url_for("user.get_all"))

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
    user.save()

    if (
        current_user.role_obj.role_name == s.UserRole.WAREHOUSE_MANAGER.value
        and user.role_obj.role_name != s.UserRole.WAREHOUSE_MANAGER.value
    ):
        log(
            log.ERROR,
            "Warehouse manager can not create user with role: [%s]",
            user.role_obj.role_name,
        )
        flash("Warehouse manager can create only warehouse managers", "danger")
        db.session.delete(user)
        db.session.commit()
        return redirect(url_for("user.get_all"))

    sales_rep_role_id = (
        db.session.execute(
            m.Division.select().where(
                m.Division.role_name == s.UserRole.SALES_REP.value
            )
        )
        .scalar()
        .id
    )
    if user.role == sales_rep_role_id:
        store_category: m.StoreCategory = db.session.execute(
            m.StoreCategory.select().where(
                m.StoreCategory.name == SALES_REP_LOCKER_NAME
            )
        ).scalar()
        store = m.Store(
            store_category_id=store_category.id,
            store_name=f"{user.username}_{SALES_REP_LOCKER_NAME}",
            contact_person=user.username,
            email=user.email,
            phone_numb=user.phone_number,
            country=user.country if user.sales_rep else form.locker_country.data,
            region=user.region if user.sales_rep else form.locker_region.data,
            city=user.city if user.sales_rep else form.locker_city.data,
            address=(
                user.street_address
                if user.sales_rep or not user.street_address
                else form.locker_street_address.data
            ),
            zip=user.zip_code if user.sales_rep else form.locker_zip_code.data,
            active=True,
            user_id=user.id,
        )
        store.save()
    log(log.INFO, "Form submitted. User: [%s]", user)
    flash("User added!", "success")

    if user.role == s.UserRole.ADMIN.value:
        g_query = m.Group.select()
        group_obj: m.Group | None = db.session.scalars(g_query)
        group_ids: List[m.Group] = [g.id for g in group_obj]
        for group_id in group_ids:
            m.UserGroup(left_id=user.id, right_id=group_id).save()
    else:
        g_query = m.Group.select().where(
            m.Group.name.in_(str(form.group.data).split(", "))
        )
        group_obj: m.Group | None = db.session.scalars(g_query)
        group_ids: List[m.Group] = [g.id for g in group_obj]
        for group_id in group_ids:
            m.UserGroup(left_id=user.id, right_id=group_id).save()

    # create e-mail message
    if user.activated:
        log(log.INFO, "Sending email to active user: [%s]", user.email)
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
            app_name=app.config["APP_NAME"],
        )
        mail.send(msg)

    return redirect(url_for("user.get_all"))


@bp.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    user = db.session.get(m.User, id)
    if not user or user.is_deleted:
        log(log.INFO, "There is no user with id: [%s]", id)
        flash("There is no such user", "danger")
        return "no user", 404

    delete_u = sa.delete(m.UserGroup).where(m.UserGroup.left_id == user.id)
    db.session.execute(delete_u)

    now = datetime.now()
    user.is_deleted = True
    user.email = f"{user.email}_deleted_at_{now}"
    user.username = f"{user.username}_deleted_at_{now}"
    db.session.commit()
    log(log.INFO, "User deleted. User: [%s]", user)
    flash("User deleted!", "success")
    return "ok", 200


@bp.route("/request-share-notifications", methods=["GET"])
@login_required
def request_share_notification():

    now = datetime.now()

    requests_share_notifications = db.session.scalars(
        sa.select(m.RequestShareUser)
        .join(m.RequestShare)
        .where(
            sa.func.date(m.RequestShareUser.reviewed_datetime) >= now.date(),
            sa.and_(
                m.RequestShare.from_group_id.in_(
                    [group.id for group in current_user.user_groups]
                ),
                current_user.approval_permission,
                m.RequestShareUser.user_id == current_user.id,
            ),
        )
        .order_by(m.RequestShareUser.reviewed_datetime.desc())
    ).all()

    new_notification_ids = []
    for notification in requests_share_notifications:
        if not notification.reviewed:
            notification.reviewed_datetime = now
            new_notification_ids.append(notification.id)

    db.session.commit()

    return render_template(
        "user/request_share_notification.html",
        requests_share_notifications=requests_share_notifications,
        new_notification_ids=new_notification_ids,
    )


@bp.route("/ship-request-notifications", methods=["GET"])
@login_required
@role_required([s.UserRole.WAREHOUSE_MANAGER.value])
def ship_request_notification():

    now = datetime.now()

    ship_req_notifications = db.session.scalars(
        sa.select(m.ShipRequestNotification)
        .join(m.ShipRequest)
        .where(
            sa.func.date(m.ShipRequestNotification.reviewed_datetime) >= now.date(),
            m.ShipRequestNotification.user_id == current_user.id,
            m.ShipRequest.status == s.ShipRequestStatus.waiting_for_warehouse,
        )
        .order_by(m.ShipRequestNotification.reviewed_datetime.desc())
    ).all()

    new_notifications_ids = []
    for notification in ship_req_notifications:
        if not notification.reviewed:
            notification.reviewed_datetime = now
            new_notifications_ids.append(notification.id)

    db.session.commit()

    return render_template(
        "user/ship_request_notification.html",
        ship_req_notifications=ship_req_notifications,
        new_notifications_ids=new_notifications_ids,
    )
