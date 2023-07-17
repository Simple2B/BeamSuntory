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


delivery_agent_blueprint = Blueprint(
    "delivery_agent", __name__, url_prefix="/delivery_agent"
)


@delivery_agent_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    form_create: f.NewDeliveryAgentForm = f.NewDeliveryAgentForm()
    form_edit: f.DeliveryAgentForm = f.DeliveryAgentForm()

    q = request.args.get("q", type=str, default=None)
    query = m.DeliveryAgent.select().order_by(m.DeliveryAgent.id)
    count_query = sa.select(sa.func.count()).select_from(m.DeliveryAgent)
    if q:
        query = (
            m.DeliveryAgent.select()
            .where(
                m.DeliveryAgent.username.like(f"{q}%")
                | m.DeliveryAgent.email.like(f"{q}%")
            )
            .order_by(m.DeliveryAgent.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(
                m.DeliveryAgent.username.like(f"{q}%")
                | m.DeliveryAgent.email.like(f"{q}%")
            )
            .select_from(m.DeliveryAgent)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "delivery_agent/delivery_agents.html",
        delivery_agents=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
    )


@delivery_agent_blueprint.route("/save", methods=["POST"])
@login_required
def save():
    form: f.DeliveryAgentForm = f.DeliveryAgentForm()
    if form.validate_on_submit():
        query = m.DeliveryAgent.select().where(
            m.DeliveryAgent.id == int(form.delivery_agent_id.data)
        )
        da: m.DeliveryAgent | None = db.session.scalar(query)
        if not da:
            log(
                log.ERROR,
                "Not found delivery_agent by id : [%s]",
                form.delivery_agent_id.data,
            )
            flash("Cannot save delivery agent data", "danger")

        da.username = form.username.data
        da.email = form.email.data
        da.first_name = form.first_name.data
        da.last_name = form.last_name.data
        da.contact_number = form.contact_number.data
        da.street_address = form.street_address.data
        da.active = form.active.data
        da.save()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("delivery_agent.get_all"))

    else:
        log(log.ERROR, "Delivery Agent save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("delivery_agent.get_all"))


@delivery_agent_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewDeliveryAgentForm = f.NewDeliveryAgentForm()
    if not form.validate_on_submit():
        flash("This username or email is already taken.", "danger")
        return redirect(url_for("delivery_agent.get_all"))
    if form.validate_on_submit():
        delivery_agent = m.DeliveryAgent(
            username=form.username.data,
            email=form.email.data,
            first_name=form.first_name.data,
            last_name=form.last_name.data,
            contact_number=form.contact_number.data,
            street_address=form.street_address.data,
            active=form.active.data,
        )
        log(log.INFO, "Form submitted. Delivery Agent: [%s]", delivery_agent)
        flash("Delivery Agent added!", "success")
        delivery_agent.save()

        return redirect(url_for("delivery_agent.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("delivery_agent.get_all"))


@delivery_agent_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    da = db.session.scalar(m.DeliveryAgent.select().where(m.DeliveryAgent.id == id))
    if not da:
        log(log.INFO, "There is no delivery agent with id: [%s]", id)
        flash("There is no such delivery agent", "danger")
        return "no delivery agent", 404

    delete_da = sa.delete(m.DeliveryAgent).where(m.DeliveryAgent.id == id)
    db.session.execute(delete_da)
    db.session.commit()
    log(log.INFO, "Delivery Agent deleted. Delivery Agent: [%s]", da)
    flash("Delivery Agent deleted!", "success")
    return "ok", 200
