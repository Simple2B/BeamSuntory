import datetime
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
from app.controllers import create_pagination

from app import models as m, db
from app import forms as f
from app.logger import log


product_blueprint = Blueprint("product", __name__, url_prefix="/product")


@product_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    q = request.args.get("q", type=str, default=None)
    query = m.Product.select().order_by(m.Product.id)
    count_query = sa.select(sa.func.count()).select_from(m.Product)
    if q:
        # TODO consider something better then in_
        query = (
            m.Product.select()
            .where(m.Product.name.like(f"{q}%"))
            .order_by(m.Product.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Product.name.like(f"{q}%"))
            .select_from(m.Product)
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    master_groups_rows_obj = db.session.execute(m.MasterGroup.select()).all()

    # get all product_groups to list and compare in view.html
    product_groups_obj = db.session.execute(m.ProductGroup.select()).all()

    # TODO: consider using a join instead of two queries <- Copilot
    # get all groups ids for current user to compare with product groups ids in view.html
    current_user_groups_rows = db.session.execute(
        m.UserGroup.select().where(m.UserGroup.left_id == current_user.id)
    ).all()

    curr_usr_groups = [row[0].parent for row in current_user_groups_rows]
    master_groups = [row[0] for row in master_groups_rows_obj]
    master_groups_groups = {i.name: [f.id for f in i.groups] for i in master_groups}

    # get all master groups and groups available for current user
    master_groups_groups_available = {}
    # groups_available = []

    for group in curr_usr_groups:
        for mast_gr in master_groups_groups:
            if group.id in master_groups_groups[mast_gr]:
                if mast_gr not in master_groups_groups_available:
                    master_groups_groups_available[mast_gr] = [group]
                else:
                    master_groups_groups_available[mast_gr].append(group)

    return render_template(
        "product/products.html",
        products=db.session.execute(
            query.offset((pagination.page - 1) * pagination.per_page).limit(
                pagination.per_page
            )
        ).scalars(),
        page=pagination,
        search_query=q,
        main_master_groups=master_groups,
        product_groups=[row[0] for row in product_groups_obj],
        current_user_groups_ids=[row[0].right_id for row in current_user_groups_rows],
        master_groups_groups_available=master_groups_groups_available,
    )


@product_blueprint.route("/create", methods=["POST"])
@login_required
def create():
    form: f.NewProductForm = f.NewProductForm()
    if form.validate_on_submit():
        query = m.Product.select().where(m.Product.name == form.name.data)
        gr: m.Product | None = db.session.scalar(query)
        if gr:
            flash("This product name is already taken.", "danger")
            return redirect(url_for("product.get_all"))
        shelf_life_str_start = form.shelf_life_start.data
        shelf_life_str_end = form.shelf_life_end.data
        shelf_life_stamp_start = datetime.datetime.strptime(
            shelf_life_str_start, "%m/%d/%Y"
        )
        shelf_life_stamp_end = datetime.datetime.strptime(
            shelf_life_str_end, "%m/%d/%Y"
        )

        # NOTE return timestamp Float
        # shelf_life_stamp_end = time.mktime(
        #     datetime.datetime.strptime(shelf_life_str_end, "%m/%d/%Y").timetuple()
        # )
        product: m.Product = m.Product(
            name=form.name.data,
            product_type=form.product_type.data,
            # supplier=form.category.data,  # orm.relationship(),
            supplier_id=form.supplier.data,
            currency=form.currency.data,
            regular_price=form.regular_price.data,
            retail_price=form.retail_price.data,
            image=form.image.data,  # sa.String(64) # link or png base64 str??
            description=form.description.data,
            # General Info ->
            SKU=form.SKU.data,
            low_stock_level=form.low_stock_level.data,
            shelf_life_start=shelf_life_stamp_start,
            shelf_life_end=shelf_life_stamp_end,
            program_year=form.program_year.data,
            premises=form.premises.data,
            package_qty=form.package_qty.data,
            numb_of_items_per_case=form.numb_of_items_per_case.data,
            numb_of_cases_per_outer_case=form.numb_of_cases_per_outer_case.data,
            comments=form.comments.data,
            # shipping
            weight=form.weight.data,
            length=form.length.data,
            width=form.width.data,
            height=form.height.data,
        )
        log(log.INFO, "Form submitted. Product: [%s]", product)
        product.save()

        product_master_groups_ids = [
            int(request.form[i]) for i in request.form if "group" in i
        ]

        for group_id in product_master_groups_ids:
            product_group = m.ProductGroup(product_id=product.id, group_id=group_id)
            product_group.save()

        flash("Product added!", "success")
        return redirect(url_for("product.get_all"))
    else:
        log(log.ERROR, "Product creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


@product_blueprint.route("/edit", methods=["POST"])
@login_required
def save():
    form: f.ProductForm = f.ProductForm()
    if form.validate_on_submit():
        query = m.Product.select().where(m.Product.id == int(form.product_id.data))
        u: m.Product | None = db.session.scalar(query)
        if not u:
            log(log.ERROR, "Not found product by id : [%s]", form.product_id.data)
            flash("Cannot save product data", "danger")
        shelf_life_str_start = form.shelf_life_start.data
        shelf_life_str_end = form.shelf_life_end.data
        shelf_life_stamp_start = datetime.datetime.strptime(
            shelf_life_str_start, "%m/%d/%Y"
        )
        shelf_life_stamp_end = datetime.datetime.strptime(
            shelf_life_str_end, "%m/%d/%Y"
        )
        u.name = form.name.data
        u.product_type = form.product_type.data
        # u.supplier=form.category.data  # orm.relationship()
        u.supplier_id = form.supplier.data
        u.currency = form.currency.data
        u.regular_price = form.regular_price.data
        u.retail_price = form.retail_price.data

        u.image = form.image.data
        u.description = form.description.data
        # General Info ->
        u.SKU = form.SKU.data
        u.low_stock_level = form.low_stock_level.data
        u.shelf_life_start = shelf_life_stamp_start
        u.shelf_life_end = shelf_life_stamp_end
        u.program_year = form.program_year.data
        u.premises = form.premises.data
        u.package_qty = form.package_qty.data
        u.numb_of_items_per_case = form.numb_of_items_per_case.data
        u.numb_of_cases_per_outer_case = form.numb_of_cases_per_outer_case.data
        u.comments = form.comments.data
        # shipping
        u.weight = form.weight.data
        u.length = form.length.data
        u.width = form.width.data
        u.height = form.height.data
        u.save()

        # product_master_groups = {
        #     i: request.form[i] for i in request.form if "group" in i
        # }
        product_master_groups_ids = [
            int(request.form[i]) for i in request.form if "group" in i
        ]

        product_groups_obj = db.session.execute(
            m.ProductGroup.select().where(
                m.ProductGroup.product_id == int(form.product_id.data)
            )
        ).all()
        product_groups_ids = [group_row[0].group_id for group_row in product_groups_obj]

        for group_row in product_groups_obj:
            if group_row[0].group_id in product_master_groups_ids:
                continue
                # group.value = product_master_groups[group.group_id]
                # group.save()
            else:
                delete_gp = sa.delete(m.ProductGroup).where(
                    m.ProductGroup.product_id == int(form.product_id.data),
                    m.ProductGroup.group_id == group_row[0].group_id,
                )
                db.session.execute(delete_gp)
                # db.session.delete(group_row)
                # db.session.commit()

        for group_id in product_master_groups_ids:
            if group_id in product_groups_ids:
                continue
            else:
                product_group = m.ProductGroup(
                    product_id=int(form.product_id.data), group_id=group_id
                )
                product_group.save()

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("product.get_all"))

    else:
        log(log.ERROR, "product save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


@product_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
def delete(id: int):
    u = db.session.scalar(m.Product.select().where(m.Product.id == id))
    if not u:
        log(log.INFO, "There is no product with id: [%s]", id)
        flash("There is no such product", "danger")
        return "no product", 404

    db.session.delete(u)
    db.session.commit()
    log(log.INFO, "Product deleted. Product: [%s]", u)
    flash("Product deleted!", "success")
    return "ok", 200