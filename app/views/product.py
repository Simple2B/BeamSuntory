import base64
import datetime
import json
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


def get_all_products(request, query=None, count_query=None):
    q = request.args.get("q", type=str, default=None)
    if query is None or count_query is None:
        query = m.Product.select().order_by(m.Product.id)
        count_query = sa.select(sa.func.count()).select_from(m.Product)
        if q:
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

    groups_for_products_obj = db.session.execute(m.GroupProduct.select()).all()
    mastr_for_prods_groups_for_prods = {}
    for group in groups_for_products_obj:
        if (
            group[0].master_groups_for_product.name
            not in mastr_for_prods_groups_for_prods
        ):
            mastr_for_prods_groups_for_prods[
                group[0].master_groups_for_product.name
            ] = [group[0]]
        else:
            mastr_for_prods_groups_for_prods[
                group[0].master_groups_for_product.name
            ].append(group[0])

    # get all product_groups to list and compare in view.html
    product_groups_obj = db.session.execute(m.ProductGroup.select()).all()

    # TODO: consider using a join instead of two queries <- Copilot
    # get all groups ids for current user to compare with product groups ids in view.html
    current_user_groups_rows = db.session.execute(
        m.UserGroup.select().where(m.UserGroup.left_id == current_user.id)
    ).all()

    master_groups = [row[0] for row in master_groups_rows_obj]
    master_groups_search = {}
    for group in groups_for_products_obj:
        if group[0].master_groups_for_product.name not in master_groups_search:
            master_groups_search[group[0].master_groups_for_product.name] = [
                group[0].name
            ]
        else:
            master_groups_search[group[0].master_groups_for_product.name].append(
                group[0].name
            )

    # NOTE: Create json object for "show-all-groups" button in products.html
    product_groups = [row[0] for row in product_groups_obj]
    product_mg_g = {
        p.child.name: {
            mg.parent.master_groups_for_product.name: "".join(
                [
                    g.parent.name
                    for g in product_groups
                    if p.child.name == g.child.name
                    and mg.parent.master_groups_for_product.name
                    == g.parent.master_groups_for_product.name
                ]
            )
            for mg in product_groups
            if p.child.name == mg.child.name
        }
        for p in product_groups
    }

    for prod in product_mg_g:
        for mg in mastr_for_prods_groups_for_prods:
            if mg not in product_mg_g[prod]:
                product_mg_g[prod][mg] = ""

    master_group_product_name = [
        mgp[0].name for mgp in db.session.execute(m.MasterGroupProduct.select()).all()
    ]
    product_mg_g["master_group_product_name"] = master_group_product_name

    suppliers = db.session.execute(m.Supplier.select()).scalars()

    return {
        "query": query,
        "pagination": pagination,
        "q": q,
        "master_groups": master_groups,
        "product_groups": product_groups,
        "current_user_groups_rows": current_user_groups_rows,
        "mastr_for_prods_groups_for_prods": mastr_for_prods_groups_for_prods,
        "master_groups_search": master_groups_search,
        "product_mg_g": json.dumps(product_mg_g),
        "master_product_groups_name": master_group_product_name,
        "suppliers": suppliers,
    }


@product_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    products_object = get_all_products(request)
    form_sort: f.SortByGroupProductForm = f.SortByGroupProductForm()
    form_create: f.NewProductForm = f.NewProductForm()
    form_edit: f.ProductForm = f.ProductForm()

    return render_template(
        "product/products.html",
        products=db.session.execute(
            products_object["query"]
            .offset(
                (products_object["pagination"].page - 1)
                * products_object["pagination"].per_page
            )
            .limit(products_object["pagination"].per_page)
        ).scalars(),
        page=products_object["pagination"],
        search_query=products_object["q"],
        main_master_groups=products_object["master_groups"],
        product_groups=products_object["product_groups"],
        current_user_groups=[
            row[0] for row in products_object["current_user_groups_rows"]
        ],
        master_groups_groups_available=products_object[
            "mastr_for_prods_groups_for_prods"
        ],
        master_groups_search=products_object["master_groups_search"],
        product_mg_g=products_object["product_mg_g"],
        master_group_product_name=products_object["master_product_groups_name"],
        suppliers=products_object["suppliers"],
        form_sort=form_sort,
        form_create=form_create,
        form_edit=form_edit,
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
        image = request.files["image"]
        image_string = base64.b64encode(image.read()).decode()
        product: m.Product = m.Product(
            name=str(form.name.data).strip(" "),
            product_type=form.product_type.data,
            supplier_id=form.supplier.data,
            currency=form.currency.data,
            regular_price=form.regular_price.data,
            retail_price=form.retail_price.data,
            image=image_string,
            description=form.description.data,
            # General Info ->
            SKU=form.SKU.data,
            low_stock_level=form.low_stock_level.data,
            shelf_life_start=shelf_life_stamp_start,
            shelf_life_end=shelf_life_stamp_end,
            program_year=form.program_year.data,
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
        image = request.files["image"]
        image_string = base64.b64encode(image.read()).decode()
        u.name = str(form.name.data).strip(" ")
        u.product_type = form.product_type.data
        u.supplier_id = form.supplier.data
        u.currency = form.currency.data
        u.regular_price = form.regular_price.data
        u.retail_price = form.retail_price.data

        if len(image_string) == 0:
            image_string = u.image
        else:
            u.image = image_string
        u.description = form.description.data
        # General Info ->
        u.SKU = form.SKU.data
        u.low_stock_level = form.low_stock_level.data
        u.shelf_life_start = shelf_life_stamp_start
        u.shelf_life_end = shelf_life_stamp_end
        u.program_year = form.program_year.data
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
            else:
                delete_gp = sa.delete(m.ProductGroup).where(
                    m.ProductGroup.product_id == int(form.product_id.data),
                    m.ProductGroup.group_id == group_row[0].group_id,
                )
                db.session.execute(delete_gp)

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
    prod: m.Product = db.session.scalar(m.Product.select().where(m.Product.id == id))
    if not prod:
        log(log.INFO, "There is no product with id: [%s]", id)
        flash("There is no such product", "danger")
        return "no product", 404

    # NOTE should we allow to delete product if it is in product_group, warehouse_product, carts, product_quantity_group
    product_warehouses = db.session.execute(
        m.WarehouseProduct.select().where(m.WarehouseProduct.product_id == prod.id)
    ).scalars()
    product_carts = db.session.execute(
        m.Cart.select().where(m.Cart.product_id == prod.id)
    ).scalars()
    product_groups = db.session.execute(
        m.ProductGroup.select().where(m.ProductGroup.product_id == prod.id)
    ).scalars()
    product_io = db.session.execute(
        m.ProductQuantityGroup.select().where(
            m.ProductQuantityGroup.product_id == prod.id
        )
    ).scalars()

    for prod_conn in [product_warehouses, product_carts, product_groups, product_io]:
        for pw in prod_conn:
            db.session.delete(pw)

    db.session.delete(prod)
    db.session.commit()
    log(log.INFO, "Product deleted. Product: [%s]", prod)
    flash("Product deleted!", "success")
    return "ok", 200


@product_blueprint.route("/sort", methods=["GET", "POST"])
@login_required
def sort():
    if request.method == "GET":
        return redirect(url_for("product.get_all"))
    form: f.SortByGroupProductForm = f.SortByGroupProductForm()
    form_create: f.NewProductForm = f.NewProductForm()
    form_edit: f.ProductForm = f.ProductForm()
    if form.validate_on_submit():
        group_names: list = form.sort_by.data.values()
        groups = [
            grp[0].id
            for grp in db.session.execute(
                m.GroupProduct.select().where(m.GroupProduct.name.in_(group_names))
            ).all()
        ]

        product_groups = [
            prg[0]
            for prg in db.session.execute(
                m.ProductGroup.select().where(m.ProductGroup.group_id.in_(groups))
            ).all()
        ]
        product_to_group = {
            pg.product_id: [
                t.group_id for t in product_groups if t.product_id == pg.product_id
            ]
            for pg in product_groups
        }
        product_ids_to_return = [
            pid for pid in product_to_group if len(product_to_group[pid]) == len(groups)
        ]

        q = request.args.get("q", type=str, default=None)
        query = (
            m.Product.select()
            .where(m.Product.id.in_(product_ids_to_return))
            .order_by(m.Product.id)
        )
        count_query = (
            sa.select(sa.func.count())
            .where(m.Product.id.in_(product_ids_to_return))
            .select_from(m.Product)
        )
        if q:
            query = (
                m.Product.select()
                .where(
                    m.Product.name.like(f"{q}%")
                    | m.Product.id.in_(product_ids_to_return)
                )
                .order_by(m.Product.id)
            )
            count_query = (
                sa.select(sa.func.count())
                .where(
                    m.Product.name.like(f"{q}%")
                    | m.Product.id.in_(product_ids_to_return)
                )
                .select_from(m.Product)
            )
        products_object = get_all_products(request, query, count_query)

        return render_template(
            "product/products.html",
            products=db.session.execute(
                products_object["query"]
                .offset(
                    (products_object["pagination"].page - 1)
                    * products_object["pagination"].per_page
                )
                .limit(products_object["pagination"].per_page)
            ).scalars(),
            page=products_object["pagination"],
            search_query=products_object["q"],
            main_master_groups=products_object["master_groups"],
            product_groups=products_object["product_groups"],
            current_user_groups=[
                row[0] for row in products_object["current_user_groups_rows"]
            ],
            master_groups_groups_available=products_object[
                "mastr_for_prods_groups_for_prods"
            ],
            master_groups_search=products_object["master_groups_search"],
            product_mg_g=products_object["product_mg_g"],
            master_group_product_name=products_object["master_product_groups_name"],
            suppliers=products_object["suppliers"],
            form_sort=form,
            form_create=form_create,
            form_edit=form_edit,
        )

    log(log.INFO, "Wrong sort")
    flash("Wrong sort", "danger")
    return redirect(url_for("product.get_all"))


@product_blueprint.route("/assign", methods=["POST"])
@login_required
def assign():
    form: f.AssignProductForm = f.AssignProductForm()
    if form.validate_on_submit():
        query = m.Product.select().where(m.Product.name == form.name.data)
        p: m.Product | None = db.session.scalar(query)
        if not p:
            log(log.ERROR, "Not found product by name : [%s]", form.name.data)
            flash("Cannot save product data", "danger")

        # TODO sort also by group_id and warehouse_id
        product_warehouse: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(m.WarehouseProduct.product_id == p.id)
        ).scalar()
        product_warehouse.product_quantity -= form.quantity.data
        product_warehouse.save()

        new_product_warehouse: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == p.id,
                m.WarehouseProduct.group_id == int(form.group.data),
            )
        ).scalar()
        if new_product_warehouse:
            new_product_warehouse.product_quantity += form.quantity.data
            new_product_warehouse.save()
        else:
            # TODO get warehouse_id
            warehouse: m.Warehouse = db.session.execute(m.Warehouse.select()).scalar()
            new_product_warehouse = m.WarehouseProduct(
                product_id=p.id,
                group_id=int(form.group.data),
                product_quantity=form.quantity.data,
                warehouse_id=warehouse.id,
            )
            new_product_warehouse.save()

        m.Assign(
            product_id=p.id,
            group_id=int(form.group.data),
            quantity=form.quantity.data,
        ).save()

        return redirect(url_for("product.get_all"))

    else:
        log(log.ERROR, "product assign errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))
