import datetime
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

ship_request_blueprint = Blueprint("ship_request", __name__, url_prefix="/ship_request")


@ship_request_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewShipRequestForm = f.NewShipRequestForm()

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
    suppliers_rows = db.session.execute(sa.select(m.Supplier)).all()
    suppliers = [row[0] for row in suppliers_rows]

    return render_template(
        "ship_request/ship_requests.html",
        ship_requests=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        suppliers=suppliers,
        form_create=form_create,
    )


@ship_request_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewShipRequestForm = f.NewShipRequestForm()
    if not form.validate_on_submit():
        flash("Validation failed", "danger")
        return redirect(url_for("ship_request.get_all"))
    if form.validate_on_submit():
        ship_request = m.ShipRequest(
            order_numb=f"BEAM-DO{datetime.datetime.now().timestamp()}",
            # NOTE: what status is default?
            status="In Progress",
            supplier_id=form.supplier.data,
            # NOTE: commented, until store is created
            # store=form.store.data,
            store_category=form.store_category.data,
            order_type=form.order_type.data,
            quantity=int(form.quantity.data),
        )
        log(log.INFO, "Form submitted. Ship Request: [%s]", ship_request)
        flash("Ship request added!", "success")
        ship_request.save()

        return redirect(url_for("ship_request.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("ship_request.get_all"))


@ship_request_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    sr = db.session.scalar(m.ShipRequest.select().where(m.ShipRequest.id == id))
    if not sr:
        log(log.INFO, "There is no ship request with id: [%s]", id)
        flash("There is no such ship request", "danger")
        return "no ship request", 404

    delete_sr = sa.delete(m.ShipRequest).where(m.ShipRequest.id == id)
    db.session.execute(delete_sr)
    db.session.commit()
    log(log.INFO, "Ship Request deleted. Ship Request: [%s]", sr)
    flash("Ship Request deleted!", "success")
    return "ok", 200
