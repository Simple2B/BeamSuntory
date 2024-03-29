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
from app.controllers import create_pagination, role_required

from app import models as m, db, mail
from app import schema as s
from app import forms as f
from app.logger import log


request_share_blueprint = Blueprint(
    "request_share", __name__, url_prefix="/request_share"
)


@request_share_blueprint.route("/", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def get_all():
    form_edit: f.RequestShareForm = f.RequestShareForm()

    q = request.args.get("q", type=str, default=None)
    status = request.args.get("status", type=str, default=None)
    query = m.RequestShare.select().order_by(m.RequestShare.id)
    count_query = sa.select(sa.func.count()).select_from(m.RequestShare)
    if q:
        search_by_q = (
            (m.RequestShare.product.has(m.Product.name.ilike(f"%{q}%")))
            | m.RequestShare.order_numb.ilike(f"%{q}%")
            | m.RequestShare.group.has(m.Group.name.ilike(f"%{q}%"))
            | m.RequestShare.from_group.has(m.Group.name.ilike(f"%{q}%"))
        )

        query = query.where(search_by_q)
        count_query = count_query.where(search_by_q)

    if status:
        query = query.where(m.RequestShare.status == status)
        count_query = count_query.where(m.RequestShare.status == status)

    pagination = create_pagination(total=db.session.scalar(count_query))

    statuses = [
        status[0] for status in db.session.query(m.RequestShare.status).distinct().all()
    ]

    return render_template(
        "request_share/request_shares.html",
        request_shares=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        form_edit=form_edit,
        statuses=statuses,
        search_status=status,
    )


@request_share_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value], True
)
def save():
    form: f.RequestShareForm = f.RequestShareForm()
    if form.validate_on_submit():
        query = m.RequestShare.select().where(
            m.RequestShare.id == int(form.request_share_id.data)
        )
        request_share: m.RequestShare | None = db.session.scalar(query)
        if not request_share:
            log(
                log.ERROR,
                "Not found request_share by id : [%s]",
                form.request_share_id.data,
            )
            flash("Cannot save request_share data", "danger")
            return redirect(url_for("request_share.get_all"))

        report_request_share = m.ReportRequestShare(
            type=s.ReportRequestShareActionType.UPDATED_QUANTITY.value,
            history=f"{request_share.desire_quantity} => {form.desire_quantity.data}",
            user=current_user,
            request_share=request_share,
        )

        request_share.desire_quantity = form.desire_quantity.data
        db.session.add(report_request_share)
        db.session.commit()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("request_share.get_all"))

    else:
        log(log.ERROR, "Request Share save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("request_share.get_all"))


@request_share_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    rs: m.RequestShare = db.session.scalar(
        m.RequestShare.select().where(m.RequestShare.id == id)
    )
    if not rs:
        log(log.INFO, "There is no request_share with id: [%s]", id)
        flash("There is no such request_share", "danger")
        return "no request_share", 404

    delete_a = sa.delete(m.RequestShare).where(m.RequestShare.id == id)

    db.session.execute(delete_a)
    db.session.commit()
    log(log.INFO, "Request Share deleted: [%s]", rs)
    flash("Request Share deleted!", "success")
    return "ok", 200


@request_share_blueprint.route("/share/<int:id>", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def share(id: int):
    request_share: m.RequestShare = db.session.scalar(
        m.RequestShare.select().where(m.RequestShare.id == id)
    )
    if not request_share:
        log(log.INFO, "There is no request_share with id: [%s]", id)
        flash("There is no such request_share", "danger")
        return redirect(url_for("request_share.get_all"))

    # TODO Filter by warehouse id also
    warehouse_to_prod: m.WarehouseProduct = db.session.scalar(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id == request_share.product_id,
            m.WarehouseProduct.group_id == request_share.group_id,
        )
    )

    warehouse_from_prod: m.WarehouseProduct = db.session.scalar(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id == request_share.product_id,
            m.WarehouseProduct.group_id == request_share.from_group_id,
        )
    )

    if not warehouse_from_prod:
        log(
            log.INFO,
            "These product is not in warehouse. Product id: [%s]",
            request_share.from_group_id,
        )
        flash("These product was depleted", "danger")
        return redirect(url_for("request_share.get_all"))

    if warehouse_from_prod.product_quantity < request_share.desire_quantity:
        log(
            log.INFO,
            "Not enough products in warehouse. Product id: [%s]",
            request_share.from_group_id,
        )
        flash("Not enough products in warehouse", "danger")
        return redirect(url_for("request_share.get_all"))

    report_inventory_list = m.ReportInventoryList(
        type="Product Shared",
        user_id=current_user.id,
    )
    report_inventory_list.save(False)

    if not warehouse_to_prod:
        qty_before = 0
        warehouse_to_prod = m.WarehouseProduct(
            product_id=request_share.product_id,
            group_id=request_share.group_id,
            product_quantity=request_share.desire_quantity,
            warehouse_id=warehouse_from_prod.warehouse_id,
        )
        warehouse_to_prod.save(False)
    else:
        qty_before = warehouse_to_prod.product_quantity
        warehouse_to_prod.product_quantity += request_share.desire_quantity
        warehouse_to_prod.save(False)

    warehouse_from_prod.product_quantity -= request_share.desire_quantity
    warehouse_from_prod.save(False)

    msg = Message(
        subject=f"Request share approved {request_share.order_numb}",
        sender=app.config["MAIL_DEFAULT_SENDER"],
        recipients=[request_share.user.email],
    )
    url = (
        url_for(
            "request_share.get_all",
            _external=True,
        )
        + f"?q={request_share.order_numb}"
    )

    msg.html = render_template(
        "email/request_share.html",
        user=request_share.user,
        request_share=request_share,
        url=url,
        action="approved",
    )
    mail.send(msg)

    m.ReportInventory(
        qty_before=warehouse_from_prod.product_quantity + request_share.desire_quantity,
        qty_after=warehouse_from_prod.product_quantity,
        report_inventory_list=report_inventory_list,
        product_id=warehouse_from_prod.product_id,
        warehouse_product=warehouse_from_prod,
    ).save(False)

    m.ReportInventory(
        qty_before=qty_before,
        qty_after=warehouse_to_prod.product_quantity,
        report_inventory_list=report_inventory_list,
        product_id=warehouse_to_prod.product_id,
        warehouse_product=warehouse_to_prod,
    ).save(False)

    m.ReportSKU(
        product_id=request_share.product_id,
        share=request_share,
        type=s.ReportSKUType.share.value,
        status=f"Assigned from {request_share.from_group_id} to {request_share.group_id}",
        warehouse_product=warehouse_to_prod,
    ).save(False)

    report_request_share = m.ReportRequestShare(
        type=s.ReportRequestShareActionType.SHARED.value,
        user=current_user,
        request_share=request_share,
        history=" ".join(
            [
                f"from: {warehouse_from_prod.warehouse.name} ->",
                f"to: {warehouse_to_prod.warehouse.name} -",
                f"quantity: {request_share.desire_quantity}",
            ]
        ),
    )
    request_share.status = "shared"
    request_share.finished_date = datetime.now().replace(microsecond=0)
    db.session.add(report_request_share)
    db.session.commit()
    log(log.INFO, "Request Share share: [%s]", request_share)
    flash("Request Share shared!", "success")
    return redirect(url_for("request_share.get_all"))


@request_share_blueprint.route("/decline/<int:id>", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def decline(id: int):
    request_share: m.RequestShare = db.session.get(m.RequestShare, id)
    if not request_share:
        log(log.INFO, "There is no request_share with id: [%s]", id)
        flash("There is no such request_share", "danger")
        return redirect(url_for("request_share.get_all"))

    request_share.status = "declined"
    request_share.finished_date = datetime.now().replace(microsecond=0)
    report_request_share = m.ReportRequestShare(
        type=s.ReportRequestShareActionType.DECLINED.value,
        user=current_user,
        request_share=request_share,
    )

    product_group: m.Group = db.session.execute(
        m.Group.select().where(m.Group.id == request_share.group_id)
    ).scalar()

    users: list[m.UserGroup] = [
        u
        for u in db.session.execute(
            m.UserGroup.select().where(m.UserGroup.right_id == product_group.id)
        ).scalars()
    ]
    if len(users) != 0:
        for u in users:
            # TODO: ask client about users notification without approval permission
            if not u.child.approval_permission:
                continue
            msg = Message(
                subject=f"Declined request share {request_share.order_numb}",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[u.child.email],
            )
            url = (
                url_for(
                    "request_share.get_all",
                    _external=True,
                )
                + f"?q={request_share.order_numb}"
            )

            msg.html = render_template(
                "email/request_share.html",
                user=u.child,
                action="declined",
                request_share=request_share,
                url=url,
            )
            mail.send(msg)

    db.session.add(report_request_share)
    db.session.commit()
    log(log.INFO, "Request Share declined: [%s]", request_share)
    flash("Request Share declined!", "success")
    return redirect(url_for("request_share.get_all"))
