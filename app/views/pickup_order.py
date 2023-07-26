from flask import (
    Blueprint,
    render_template,
    request,
    flash,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log


# NOTE outgoing stock IS ship request. Meaning good going from warehouse to store
pickup_order_blueprint = Blueprint("pickup_order", __name__, url_prefix="/pickup_order")


@pickup_order_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()
    form_edit: f.ShipRequestForm = f.ShipRequestForm()

    q = request.args.get("q", type=str, default=None)
    query = m.ShipRequest.select().order_by(m.ShipRequest.id)
    count_query = sa.select(sa.func.count()).select_from(m.ShipRequest)
    if q:
        query = (
            m.ShipRequest.select()
            .where(
                m.ShipRequest.order_numb.like(f"{q}%")
                | m.ShipRequest.store_category.like(f"{q}%")
                | m.ShipRequest.order_type.like(f"{q}%")
                | m.ShipRequest.status.like(f"{q}%")
            )
            .order_by(m.ShipRequest.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(
                m.ShipRequest.order_numb.like(f"{q}%")
                | m.ShipRequest.store_category.like(f"{q}%")
                | m.ShipRequest.order_type.like(f"{q}%")
                | m.ShipRequest.status.like(f"{q}%")
            )
            .select_from(m.ShipRequest)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    ship_requests = [
        i
        for i in db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars()
    ]
    current_order_carts = {
        spr.order_numb: [
            cart
            for cart in db.session.execute(
                m.Cart.select().where(m.Cart.order_numb == spr.order_numb)
            ).scalars()
        ]
        for spr in ship_requests
    }
    warehouses_rows = db.session.execute(sa.select(m.Warehouse)).scalars()
    warehouses = [{"name": w.name, "id": w.id} for w in warehouses_rows]

    return render_template(
        "pickup_order/pickup_orders.html",
        ship_requests=ship_requests,
        current_order_carts=current_order_carts,
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
        warehouses=warehouses,
    )


@pickup_order_blueprint.route("/pickup/<int:id>", methods=["GET"])
@login_required
def pickup(id: int):
    sr: m.ShipRequest = db.session.scalar(
        m.ShipRequest.select().where(m.ShipRequest.id == id)
    )
    if not sr:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    sr.status = "In transit"
    sr.save()

    log(log.INFO, "Ship Request pickup done. Ship Request: [%s]", sr)
    flash("Ship Request pickup done!", "success")
    return "ok", 200