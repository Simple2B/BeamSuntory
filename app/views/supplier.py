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
from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


supplier_blueprint = Blueprint("supplier", __name__, url_prefix="/supplier")


@supplier_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def get_all():
    form_create: f.NewSupplierForm = f.NewSupplierForm()
    form_edit: f.SupplierForm = f.SupplierForm()

    q = request.args.get("q", type=str, default=None)
    query = m.Supplier.select().order_by(m.Supplier.id)
    count_query = sa.select(sa.func.count()).select_from(m.Supplier)
    if q:
        query = (
            m.Supplier.select()
            .where(m.Supplier.name.ilike(f"%{q}%") | m.Supplier.email.ilike(f"%{q}%"))
            .order_by(m.Supplier.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Supplier.name.ilike(f"%{q}%") | m.Supplier.email.ilike(f"%{q}%"))
            .select_from(m.Supplier)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    return render_template(
        "supplier/suppliers.html",
        suppliers=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        form_create=form_create,
        form_edit=form_edit,
    )


@supplier_blueprint.route("/save", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form: f.SupplierForm = f.SupplierForm()
    if form.validate_on_submit():
        query = m.Supplier.select().where(m.Supplier.id == int(form.supplier_id.data))
        s: m.Supplier | None = db.session.scalar(query)
        if not s:
            log(
                log.ERROR,
                "Not found supplier by id : [%s]",
                form.supplier_id.data,
            )
            flash("Cannot save supplier data", "danger")

        s.name = form.name.data
        s.email = form.email.data
        s.contact_number = form.contact_number.data
        s.country = form.country.data
        s.region = form.region.data
        s.city = form.city.data
        s.address = form.address.data
        s.zip = form.zip.data
        s.active = form.active.data
        s.save()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("supplier.get_all"))

    else:
        log(log.ERROR, "Supplier save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("supplier.get_all"))


@supplier_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form: f.NewSupplierForm = f.NewSupplierForm()
    if not form.validate_on_submit():
        flash("This username or email is already taken.", "danger")
        return redirect(url_for("supplier.get_all"))
    if form.validate_on_submit():
        supplier = m.Supplier(
            name=form.name.data,
            email=form.email.data,
            contact_number=form.contact_number.data,
            country=form.country.data,
            region=form.region.data,
            city=form.city.data,
            address=form.address.data,
            zip=form.zip.data,
            active=form.active.data,
        )
        log(log.INFO, "Form submitted. Supplier: [%s]", supplier)
        flash("Supplier added!", "success")
        supplier.save()

        return redirect(url_for("supplier.get_all"))

    flash("Something went wrong!", "danger")
    return redirect(url_for("supplier.get_all"))


@supplier_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    s = db.session.scalar(m.Supplier.select().where(m.Supplier.id == id))
    if not s:
        log(log.INFO, "There is no supplier with id: [%s]", id)
        flash("There is no such supplier", "danger")
        return "no supplier", 404

    delete_s = sa.delete(m.Supplier).where(m.Supplier.id == id)
    db.session.execute(delete_s)
    db.session.commit()
    log(log.INFO, "Supplier deleted. Supplier: [%s]", s)
    flash("Supplier deleted!", "success")
    return "ok", 200
