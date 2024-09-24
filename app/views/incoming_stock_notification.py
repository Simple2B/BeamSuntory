from datetime import datetime

from flask import (
    Blueprint,
    render_template,
    flash,
    redirect,
    request,
    url_for,
    current_app as app,
)

from flask_mail import Message
from flask_login import login_required, current_user
import sqlalchemy as sa

from app.controllers import create_pagination, role_required

from app import models as m, db, mail
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

    status = request.args.get("status", type=str, default="")
    q = request.args.get("q", type=str, default="")

    where_stmt = sa.true()
    if status:
        where_stmt = sa.and_(where_stmt, m.IncomingStockNotification.status == status)

    if q:
        where_stmt = sa.and_(
            where_stmt,
            sa.or_(
                m.IncomingStockNotification.description.ilike(f"%{q}%"),
                m.IncomingStockNotification.user.has(m.User.username.ilike(f"%{q}%")),
                m.IncomingStockNotification.products.any(
                    m.IncomingStockProduct.product.has(m.Product.name.ilike(f"%{q}%"))
                ),
                m.IncomingStockNotification.products.any(
                    m.IncomingStockProduct.product.has(m.Product.SKU.ilike(f"%{q}%"))
                ),
            ),
        )

    query = (
        sa.select(m.IncomingStockNotification)
        .where(where_stmt)
        .order_by(m.IncomingStockNotification.approx_arrival_date.desc())
    )
    count_query = (
        sa.select(sa.func.count())
        .where(where_stmt)
        .select_from(m.IncomingStockNotification)
    )

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
        q=q,
        status=status,
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
    """htmx"""
    form = f.IncomingStockNotificationCreateForm()
    products = db.session.scalars(sa.select(m.Product))
    return render_template(
        "incoming_stock_notification/modal_add.html",
        form=form,
        products=products,
        first_input=True,
    )


@incoming_stock_notifications_bp.route("/get-product-input", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.MANAGER.value,
    ]
)
def get_product_input():
    """htmx"""
    products = db.session.scalars(sa.select(m.Product))
    return render_template(
        "incoming_stock_notification/product_input.html", products=products
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
        log(log.ERROR, "Invalid data: %s", form.errors)
        flash("Invalid data", category="danger")
        return redirect(url_for("incoming_stock_notifications.get_all"))

    notify = m.IncomingStockNotification(
        user_id=current_user.id,
        approx_arrival_date=form.approx_arrival_date.data,
        description=form.description.data,
    )

    db.session.add(notify)
    products = s.AdapterIncomingStockProducts.validate_json(form.products_data.data)
    for product_data in products:
        product = db.session.scalar(
            sa.select(m.Product).where(m.Product.SKU == product_data.product_sku)
        )
        if not product:
            log.INFO("Product with SKU [%s] not found", product.product_sku)
            flash("Product not found", category="danger")
            return redirect(url_for("incoming_stock_notifications.get_all"))
        notify_product = m.IncomingStockProduct(
            product_id=product.id,
            quantity=product_data.quantity,
        )
        notify.products.append(notify_product)

    db.session.commit()

    users = db.session.scalars(
        sa.select(m.User).where(
            m.User.role_obj.has(
                m.Division.role_name == s.UserRole.WAREHOUSE_MANAGER.value
            )
        )
    ).all()

    for user in users:
        msg = Message(
            subject="Customer Incoming Stock",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email],
        )

        msg.html = render_template(
            "email/income_stock_notify.html",
            notify=notify,
            user=user,
        )
        mail.send(msg)

    return redirect(url_for("incoming_stock_notifications.get_all"))


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
        log(log.ERROR, "Notification with uuid [%s] not found", notify_uuid)
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

    form = f.IncomingStockNotificationReceivedForm()

    if not form.validate_on_submit():
        log(log.ERROR, "Invalid data: %s", form.errors)
        flash("Invalid data", category="danger")
        return redirect(url_for("incoming_stock_notifications.get_all"))

    notify = db.session.scalar(
        sa.select(m.IncomingStockNotification).where(
            m.IncomingStockNotification.uuid == form.notify_uuid.data,
            m.IncomingStockNotification.status
            != s.IncomingStockNotificationStatus.RECEIVED.value,
        )
    )

    if not notify:
        log(log.ERROR, "Notification with uuid [%s] not found", form.notify_uuid.data)
        flash("Notification not found", category="danger")
        return redirect(url_for("incoming_stock_notifications.get_all"))

    notify.status = s.IncomingStockNotificationStatus.RECEIVED.value
    notify.recived_date = datetime.now()
    db.session.commit()

    flash("Received", category="success")
    return redirect(url_for("incoming_stock_notifications.get_all"))
