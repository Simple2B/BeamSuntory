from typing import List, Dict
import json
from datetime import datetime

from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)

from flask_login import login_required, current_user
import sqlalchemy as sa
from sqlalchemy import desc
from pydantic import ValidationError

from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


incoming_stock_notifications_bp = Blueprint(
    "incoming_stock_notifications", __name__, url_prefix="/incoming-stock-notifications"
)


@incoming_stock_notifications_bp.route("/", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def get_all():
    query = sa.select(m.IncomingStockNotification).order_by(
        m.IncomingStockNotification.approx_arrival_date.desc()
    )
    count_query = sa.select(sa.func.count()).select_from(m.IncomingStockNotification)

    pagination = create_pagination(total=db.session.scalar(count_query))
    incoming_stock_notifications = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )

    return render_template(
        "incoming_stock_notification/incoming_stock_notifications.html",
        page=pagination,
        incoming_stock_notifications=incoming_stock_notifications,
    )


@incoming_stock_notifications_bp.route("/create", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def get_create_modal():
    form = f.IncomingStockNotificationCreateForm()
    products = db.session.scalars(sa.select(m.Product))
    return render_template(
        "incoming_stock_notification/modal_add.html", form=form, products=products
    )


@incoming_stock_notifications_bp.route("/create", methods=["POST"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def create():
    form = f.IncomingStockNotificationCreateForm()

    if not form.validate_on_submit():
        flash("Invalid data", category="danger")
        return redirect(url_for("incoming_stock_notifications.get_all"))

    notify = m.IncomingStockNotification(
        user_id=current_user.id,
        approx_arrival_date=form.approx_arrival_date.data,
        description=form.description.data,
    )
    # db.session.add(notify)
    # for product in form.products_data.data:
    #     try:
    #         product = m.IncomingStockProduct(
    #             product_id=product["product_id"],
    #             quantity=product["quantity"],
    #         )
    #     except ValidationError as e:
    #         log.ERROR("Error creating product: %s", e.json())
    #         flash("Invalid data", category="danger")
    #         return redirect(url_for("incoming_stock_notifications.get_all"))
    #     notify.products.append(product)

    # TODO: semd mail to user

    return render_template("incoming_stock_notification/create.html", form=form)


@incoming_stock_notifications_bp.route("/<notify_uuid>/view", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def view_modal(notify_uuid):
    notify = db.session.scalar(
        sa.select(m.IncomingStockNotification).where(
            m.IncomingStockNotification.uuid == notify_uuid
        )
    )

    if not notify:
        log.INFO("Notification with uuid [%s] not found", notify_uuid)
        return render_template("toast.html", message="Not found", category="danger")

    form = f.IncomingStockNotificationReceivedForm()
    form.notify_uuid.data = notify_uuid

    return render_template(
        "incoming_stock_notification/modal_view.html", notify=notify, form=form
    )


@incoming_stock_notifications_bp.route("/received", methods=["POST"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def received():

    form = f.IncomingStockNotificationCreateForm()

    if not form.validate_on_submit():
        flash("Invalid data", category="danger")
        return redirect(url_for("incoming_stock_notifications.get_all"))

    notify = db.session.scalar(
        sa.select(m.IncomingStockNotification).where(
            m.IncomingStockNotification.uuid == form.notify_uuid.data
        )
    )

    if not notify:
        log.INFO("Notification with uuid [%s] not found", form.notify_uuid.data)
        return render_template("toast.html", message="Not found", category="danger")

    notify.status = s.IncomingStockNotificationStatus.RECEIVED.value
    notify.recived_date = datetime.now()
    db.session.commit()

    # TODO: send mail to user

    flash("Received", category="success")
    return redirect(url_for("incoming_stock_notifications.get_all"))
