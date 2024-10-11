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
    stm_where = sa.or_(
        m.RequestShare.user_id == current_user.id,
        sa.and_(
            m.RequestShare.from_group_id.in_(
                [group.id for group in current_user.user_groups]
            ),
            current_user.approval_permission,
        ),
    )
    if current_user.role == s.UserRole.ADMIN.value:
        stm_where = sa.true()
    query = (
        sa.select(m.RequestShare)
        .where(stm_where)
        .order_by(m.RequestShare.created_at.desc())
    )
    count_query = (
        sa.select(sa.func.count()).where(stm_where).select_from(m.RequestShare)
    )
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

    statuses = db.session.scalars(sa.select(sa.distinct(m.RequestShare.status))).all()

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
    if not form.validate_on_submit():
        log(log.ERROR, "Request Share save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("request_share.get_all"))

    request_share = db.session.get(m.RequestShare, int(form.request_share_id.data))
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
        return "", 404

    if request_share.status == "shared":
        log(log.INFO, "Request_share already shared id: [%s]", id)
        flash("Someone already shared", "danger")
        return "", 404

    warehouse_to_prod: m.WarehouseProduct = db.session.scalar(
        sa.select(m.WarehouseProduct).where(
            m.WarehouseProduct.product_id == request_share.product_id,
            m.WarehouseProduct.group_id == request_share.group_id,
        )
    )

    warehouse_from_prod: m.WarehouseProduct = db.session.scalar(
        sa.select(m.WarehouseProduct).where(
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
        return "", 404

    if warehouse_from_prod.available_quantity < request_share.desire_quantity:
        log(
            log.INFO,
            "Not enough products in warehouse. Product id: [%s]",
            request_share.from_group_id,
        )
        flash("Not enough products in warehouse", "danger")
        return "", 404

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

    m.ReportInventory(
        qty_before=qty_before,
        qty_after=warehouse_to_prod.product_quantity,
        report_inventory_list=report_inventory_list,
        product_id=warehouse_to_prod.product_id,
        warehouse_product=warehouse_to_prod,
    ).save(False)

    if request_share.desire_quantity > warehouse_from_prod.product_quantity:
        remainder = request_share.desire_quantity - warehouse_from_prod.product_quantity
        warehouse_from_prod.product_quantity = 0
        m.ReportInventory(
            qty_before=warehouse_from_prod.product_quantity
            + request_share.desire_quantity
            - remainder,
            qty_after=warehouse_from_prod.product_quantity,
            report_inventory_list=report_inventory_list,
            product_id=warehouse_from_prod.product_id,
            warehouse_product=warehouse_from_prod,
        ).save(False)
        warehouse_from_prods = db.session.scalars(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.id != warehouse_from_prod.id,
                m.WarehouseProduct.product_id == warehouse_from_prod.product_id,
                m.WarehouseProduct.group_id == warehouse_from_prod.group_id,
            )
        ).all()
        for warehouse_from_prod in warehouse_from_prods:
            if warehouse_from_prod.product_quantity >= remainder:
                remainder = 0
                m.ReportInventory(
                    qty_before=warehouse_from_prod.product_quantity,
                    qty_after=warehouse_from_prod.product_quantity - remainder,
                    report_inventory_list=report_inventory_list,
                    product_id=warehouse_from_prod.product_id,
                    warehouse_product=warehouse_from_prod,
                ).save(False)
                warehouse_from_prod.product_quantity -= remainder
                break
            else:
                remainder -= warehouse_from_prod.product_quantity
                warehouse_from_prod.product_quantity = 0
                warehouse_from_prod.save(False)
                m.ReportInventory(
                    qty_before=warehouse_from_prod.product_quantity + remainder,
                    qty_after=warehouse_from_prod.product_quantity,
                    report_inventory_list=report_inventory_list,
                    product_id=warehouse_from_prod.product_id,
                    warehouse_product=warehouse_from_prod,
                ).save(False)
    else:
        warehouse_from_prod.product_quantity -= request_share.desire_quantity
        warehouse_from_prod.save(False)

        m.ReportInventory(
            qty_before=warehouse_from_prod.product_quantity
            + request_share.desire_quantity,
            qty_after=warehouse_from_prod.product_quantity,
            report_inventory_list=report_inventory_list,
            product_id=warehouse_from_prod.product_id,
            warehouse_product=warehouse_from_prod,
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

    if request_share.user.is_notify_request_share_status:
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
    if request_share.status == "declined":
        log(log.INFO, "Request_share already declined id: [%s]", id)
        flash("Someone already declined", "danger")
        return redirect(url_for("request_share.get_all"))

    request_share.status = "declined"
    request_share.finished_date = datetime.now().replace(microsecond=0)
    report_request_share = m.ReportRequestShare(
        type=s.ReportRequestShareActionType.DECLINED.value,
        user=current_user,
        request_share=request_share,
    )

    db.session.add(report_request_share)
    db.session.commit()

    url = (
        url_for(
            "request_share.get_all",
            _external=True,
        )
        + f"?q={request_share.order_numb}"
    )

    if request_share.user.is_notify_request_share_status:
        msg = Message(
            subject=f"Declined request share {request_share.order_numb}",
            sender=app.config["MAIL_DEFAULT_SENDER"],
            recipients=[request_share.user.email],
        )
        msg.html = render_template(
            "email/request_share.html",
            user=request_share.user,
            action="declined",
            request_share=request_share,
            url=url,
        )
        mail.send(msg)

    log(log.INFO, "Request Share declined: [%s]", request_share)
    flash("Request Share declined!", "success")
    return redirect(url_for("request_share.get_all"))
