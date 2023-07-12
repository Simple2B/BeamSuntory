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
from app.schema import UserRole
from app.logger import log


warehouse_blueprint = Blueprint("warehouse", __name__, url_prefix="/warehouse")


@warehouse_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    q = request.args.get("q", type=str, default=None)
    query = m.Warehouse.select().order_by(m.Warehouse.id)
    count_query = sa.select(sa.func.count()).select_from(m.Warehouse)
    if q:
        query = (
            m.Warehouse.select()
            .where(m.Warehouse.name.like(f"{q}%"))
            .order_by(m.Warehouse.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Warehouse.name.like(f"{q}%"))
            .select_from(m.Warehouse)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))
    master_groups_rows = db.session.execute(sa.select(m.MasterGroup)).all()

    managers = [
        man[0]
        for man in db.session.execute(
            sa.select(m.User).where(m.User.role.in_([UserRole.WAREHOUSE_MANAGER]))
        ).all()
    ]
    manager_id_manager_name = {man.id: man.username for man in managers}

    return render_template(
        "warehouse/warehouses.html",
        warehouses=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        main_master_groups=[i[0] for i in master_groups_rows],
        managers=managers,
        manager_id_manager_name=manager_id_manager_name,
    )


@warehouse_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewWarehouseForm = f.NewWarehouseForm()
    if form.validate_on_submit():
        query = m.Warehouse.select().where(m.Warehouse.name == form.name.data)
        mgr: m.Warehouse | None = db.session.scalar(query)
        if mgr:
            flash("This master warehouse name is already taken.", "danger")
            return redirect(url_for("warehouse.get_all"))

        manager: m.User = db.session.scalar(
            m.User.select().where(
                m.User.id
                == int(
                    form.manager_id.data,
                )
            )
        )

        if manager.role != UserRole.WAREHOUSE_MANAGER:
            flash("This user is not a warehouse manager.", "danger")
            return redirect(url_for("warehouse.get_all"))

        warehouse = m.Warehouse(
            name=form.name.data,
            phone_number=form.phone_number.data,
            city=form.city.data,
            zip=form.zip.data,
            address=form.address.data,
            manager_id=manager.id,
        )
        log(log.INFO, "Form submitted. warehouse: [%s]", warehouse)
        warehouse.save()
        flash("Warehouse added!", "success")
        return redirect(url_for("warehouse.get_all"))
    else:
        log(log.ERROR, "Warehouse creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("warehouse.get_all"))


@warehouse_blueprint.route("/edit", methods=["POST"])
@login_required
def save():
    form = f.WarehouseForm()
    if form.validate_on_submit():
        query = m.Warehouse.select().where(
            m.Warehouse.id == int(form.warehouse_id.data)
        )
        w: m.Warehouse | None = db.session.scalar(query)
        if not w:
            log(
                log.ERROR,
                "Not found warehouse by id : [%s]",
                form.warehouse_id.data,
            )
            flash("Cannot save warehouse data", "danger")
            return redirect(url_for("warehouse.get_all"))

        manager: m.User = db.session.scalar(
            m.User.select().where(
                m.User.id
                == int(
                    form.manager_id.data,
                )
            )
        )

        if manager.role != UserRole.WAREHOUSE_MANAGER:
            flash("This user is not a warehouse manager.", "danger")
            return redirect(url_for("warehouse.get_all"))

        w.name = form.name.data
        w.phone_number = form.phone_number.data
        w.city = form.city.data
        w.zip = form.zip.data
        w.address = form.address.data
        w.manager_id = manager.id
        w.save()
        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("warehouse.get_all"))

    else:
        log(log.ERROR, "Warehouse save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("warehouse.get_all"))


@warehouse_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    w = db.session.scalar(m.Warehouse.select().where(m.Warehouse.id == id))
    if not w:
        log(log.INFO, "There is no warehouse with id: [%s]", id)
        flash("There is no such warehouse", "danger")
        return "no warehouse", 404

    delete_w = sa.delete(m.Warehouse).where(m.Warehouse.id == id)
    db.session.execute(delete_w)

    db.session.commit()
    log(log.INFO, "Warehouse deleted: [%s]", w)
    flash("Warehouse deleted!", "success")
    return "ok", 200
