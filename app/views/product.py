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

    master_groups_rows_objs = db.session.execute(m.MasterGroup.select()).all()
    master_groups = [row[0] for row in master_groups_rows_objs]

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
        product: m.Product = m.Product(
            name=form.name.data,
            product_type=form.product_type.data,  # Mapped[s.ProductType]
            brand_id=form.brand_id.data,  # ForeignKey("str_values.id"))
            brand=form.brand_id.data,  # relationship(foreign_keys=[brand_id])
            sub_brand_id=form.sub_brand_id.data,  # ForeignKey("str_values.id"))
            # sub_brand=form.sub_brand.data,  # relationship(foreign_keys=[sub_brand_id])
            category_id=form.category_id.data,  # sa.ForeignKey("product_categories.id")
            # category=form.category.data,  # orm.relationship(),
            language_id=form.language_id.data,  # ForeignKey("str_values.id")),
            # language=form.language.data,  # relationship(foreign_keys=[language_id]),
            # vendor=orm.Mapped[str] = orm.mapped_column(sa.String(64)) # TODO do we need it??
            currency=form.currency.data,  # Mapped[s.Currency],
            regular_price=form.regular_price.data,  # sa.Float()
            retail_price=form.retail_price.data,  # sa.Float(),
            image=form.image.data,  # sa.String(64) # link or png base64 str??
            description=form.description.data,  # String(256)),
            # General Info ->
            SKU=form.SKU.data,  # String(64)),
            low_stock_level=form.low_stock_level.data,  # Integer()),
            stock_status=form.stock_status.data,  # Mapped[s.StockStatus],
            shelf_life=form.shelf_life.data,  # DateTime()),  # calendar
            program_year=form.program_year.data,  # Integer()),
            premises=form.premises.data,  # Mapped[s.Premises],
            package_qty=form.package_qty.data,  # Integer()),
            numb_of_items_per_case=form.numb_of_items_per_case.data,  # Integer()),
            numb_of_casess_per_outer_case=form.numb_of_cases_per_outer_case.data,  # Integer()),
            comments=form.comments.data,  # String(128)),
            # shipping
            weight=form.weight.data,  # Float()),
            length=form.length.data,  # Float()),
            width=form.width.data,  # Float()),
            hight=form.hight.data,  # Float()),
        )
        log(log.INFO, "Form submitted. Product: [%s]", product)
        product.save()
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
        u.name = form.name.data
        u.product_type = form.product_type.data  # Mapped[s.ProductType]

        u.brand_id = form.brand_id.data  # ForeignKey("str_values.id"))
        # u.brand = form.brand_id.data  # relationship(foreign_keys=[brand_id])
        u.sub_brand_id = form.sub_brand_id.data  # ForeignKey("str_values.id"))
        # u.sub_brand = (form.sub_brand.data,)  # relationshipforeign_keys=[sub_brand_id])
        u.category_id = (
            form.category_id.data,
        )  # sa.ForeignKey("product_categories.id")
        # u.category = form.category.data  # orm.relationship(),
        u.language_id = form.language_id.data  # ForeignKey("str_values.id")),
        # u.language = form.language.data  # relationship(foreign_keys=[language_id]),

        # vendor=orm.Mapped[str] = orm.mapped_column(sa.String(64)) # TODO do we need it??
        u.currency = form.currency.data  # Mapped[s.Currency],
        u.regular_price = form.regular_price.data  # sa.Float()
        u.retail_price = form.retail_price.data  # sa.Float(),

        u.image = form.image.data  # sa.String(64) # link or png base64 str??
        u.description = form.description.data  # String(256)),
        # General Info ->
        u.SKU = form.SKU.data  # String(64)),
        u.low_stock_level = form.low_stock_level.data  # Integer()),
        u.stock_status = form.stock_status.data  # Mapped[s.StockStatus],
        u.shelf_life = form.shelf_life.data  # DateTime()),  # calendar
        u.program_year = form.program_year.data  # Integer()),
        u.premises = form.premises.data  # Mapped[s.Premises],
        u.package_qty = form.package_qty.data  # Integer()),
        u.numb_of_items_per_case = form.numb_of_items_per_case.data  # Integer()),
        u.numb_of_casess_per_outer_case = (
            form.numb_of_cases_per_outer_case.data
        )  # Integer()),
        u.comments = form.comments.data  # String(128)),
        # shipping
        u.weight = form.weight.data  # Float()),
        u.length = form.length.data  # Float()),
        u.width = form.width.data  # Float()),
        u.hight = form.hight.data  # Float()),
        u.save()
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
