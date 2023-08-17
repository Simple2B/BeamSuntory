import base64
import json
from flask import (
    Blueprint,
    jsonify,
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
    mstr_prod_grps_prod_grps_names = {}
    for group in groups_for_products_obj:
        if (
            group[0].master_groups_for_product.name
            not in mastr_for_prods_groups_for_prods
        ):
            mastr_for_prods_groups_for_prods[
                group[0].master_groups_for_product.name
            ] = [group[0]]
            mstr_prod_grps_prod_grps_names[group[0].master_groups_for_product.name] = [
                {"group_name": group[0].name, "group_id": group[0].id}
            ]
        else:
            mastr_for_prods_groups_for_prods[
                group[0].master_groups_for_product.name
            ].append(group[0])
            mstr_prod_grps_prod_grps_names[
                group[0].master_groups_for_product.name
            ].append({"group_name": group[0].name, "group_id": group[0].id})

    # get all product_groups to list and compare in view.html
    product_groups: list[m.ProductGroup] = [
        row for row in db.session.execute(m.ProductGroup.select()).scalars()
    ]

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
    product_mg_g = (
        {
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
        if len(product_groups) > 0
        else {}
    )

    for prod in product_mg_g:
        for mg in mastr_for_prods_groups_for_prods:
            if mg not in product_mg_g[prod]:
                product_mg_g[prod][mg] = ""

    master_group_product_name = [
        mgp[0].name for mgp in db.session.execute(m.MasterGroupProduct.select()).all()
    ]
    product_mg_g["master_group_product_name"] = master_group_product_name

    suppliers = [i for i in db.session.execute(m.Supplier.select()).scalars()]

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
        "suppliers": [s for s in suppliers],
        "all_product_groups": {
            i.name: i for i in db.session.execute(m.Group.select()).scalars()
        },
        "current_user_groups_names": [
            i[0].parent.name for i in current_user_groups_rows
        ],
        "mstr_prod_grps_prod_grps_names": json.dumps(mstr_prod_grps_prod_grps_names),
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
        all_product_groups=products_object["all_product_groups"],
        current_user_groups=[
            row[0] for row in products_object["current_user_groups_rows"]
        ],
        current_user_groups_names=products_object["current_user_groups_names"],
        master_groups_groups_available=products_object[
            "mastr_for_prods_groups_for_prods"
        ],
        master_groups_search=products_object["master_groups_search"],
        product_mg_g=products_object["product_mg_g"],
        master_group_product_name=products_object["master_product_groups_name"],
        suppliers=products_object["suppliers"],
        mstr_prod_grps_prod_grps_names=products_object[
            "mstr_prod_grps_prod_grps_names"
        ],
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

        supplier: m.Supplier = db.session.scalar(m.Supplier.select())

        image = request.files["image"]
        image_string = base64.b64encode(image.read()).decode()
        product: m.Product = m.Product(
            name=str(form.name.data).strip(" "),
            supplier_id=form.supplier.data if form.supplier.data else supplier.id,
            currency=form.currency.data if form.currency.data else "CAD",
            price=form.price.data if form.price.data else 0,
            image=image_string,
            description=form.description.data,
            # General Info ->
            SKU=form.SKU.data,
            low_stock_level=form.low_stock_level.data
            if form.low_stock_level.data
            else 0,
            program_year=form.program_year.data if form.program_year.data else 2023,
            package_qty=form.package_qty.data if form.package_qty.data else 0,
            numb_of_items_per_case=form.numb_of_items_per_case.data
            if form.numb_of_items_per_case.data
            else 0,
            numb_of_cases_per_outer_case=form.numb_of_cases_per_outer_case.data
            if form.numb_of_cases_per_outer_case.data
            else 0,
            comments=form.comments.data if form.comments.data else "no comment",
            # shipping
            weight=form.weight.data if form.weight.data else 0,
            length=form.length.data if form.length.data else 0,
            width=form.width.data if form.width.data else 0,
            height=form.height.data if form.height.data else 0,
        )
        log(log.INFO, "Form submitted. Product: [%s]", product)
        product.save()

        product_master_groups_ids = json.loads(form.product_groups.data)

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
        u: m.Product = db.session.scalar(query)
        if not u:
            log(log.ERROR, "Not found product by id : [%s]", form.product_id.data)
            flash("Cannot save product data", "danger")

        supplier: m.Supplier = db.session.scalar(m.Supplier.select())

        image = request.files["image"]
        image_string = base64.b64encode(image.read()).decode()
        u.name = str(form.name.data).strip(" ")
        u.supplier_id = form.supplier.data if form.supplier.data else supplier.id
        u.currency = form.currency.data if form.currency.data else "CAD"
        u.price = form.price.data if form.price.data else 0

        if len(image_string) == 0:
            image_string = u.image
        else:
            u.image = image_string
        u.description = form.description.data
        # General Info ->
        u.SKU = form.SKU.data
        u.low_stock_level = (
            form.low_stock_level.data if form.low_stock_level.data else 0
        )
        u.program_year = form.program_year.data if form.program_year.data else 2023
        u.package_qty = form.package_qty.data if form.package_qty.data else 0
        u.numb_of_items_per_case = (
            form.numb_of_items_per_case.data if form.numb_of_items_per_case.data else 0
        )
        u.numb_of_cases_per_outer_case = (
            form.numb_of_cases_per_outer_case.data
            if form.numb_of_cases_per_outer_case.data
            else 0
        )
        u.comments = form.comments.data if form.comments.data else "no comment"
        # shipping
        u.weight = form.weight.data if form.weight.data else 0
        u.length = form.length.data if form.length.data else 0
        u.width = form.width.data if form.width.data else 0
        u.height = form.height.data if form.height.data else 0
        u.save()

        product_master_groups_ids = json.loads(form.product_groups.data)

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
                delete_gp = db.session.execute(
                    m.ProductGroup.select().where(
                        m.ProductGroup.product_id == int(form.product_id.data),
                        m.ProductGroup.group_id == group_row[0].group_id,
                    )
                ).scalar()
                db.session.delete(delete_gp)
                db.session.commit()

        for group_id in product_master_groups_ids:
            if group_id in product_groups_ids:
                continue
            else:
                product_group = m.ProductGroup(
                    product_id=int(form.product_id.data), group_id=group_id
                )
                product_group.save()

        flash("Product edited successfully", "success")
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
            all_product_groups=products_object["all_product_groups"],
            current_user_groups=[
                row[0] for row in products_object["current_user_groups_rows"]
            ],
            current_user_groups_names=products_object["current_user_groups_names"],
            master_groups_groups_available=products_object[
                "mastr_for_prods_groups_for_prods"
            ],
            master_groups_search=products_object["master_groups_search"],
            product_mg_g=products_object["product_mg_g"],
            master_group_product_name=products_object["master_product_groups_name"],
            suppliers=products_object["suppliers"],
            mstr_prod_grps_prod_grps_names=products_object[
                "mstr_prod_grps_prod_grps_names"
            ],
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

        product_from_group: m.Group = db.session.execute(
            m.Group.select().where(
                m.Group.name == form.from_group.data,
            )
        ).scalar()

        # TODO sort also by group_id and warehouse_id
        product_warehouse: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == p.id,
                m.WarehouseProduct.group_id == product_from_group.id,
            )
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
            m.WarehouseProduct(
                product_id=p.id,
                group_id=int(form.group.data),
                product_quantity=form.quantity.data,
                warehouse_id=product_warehouse.warehouse_id,
            ).save()

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


@product_blueprint.route("/request_share", methods=["POST"])
@login_required
def request_share():
    form: f.RequestShareProductForm = f.RequestShareProductForm()
    if form.validate_on_submit():
        query = m.Product.select().where(m.Product.name == form.name.data)
        p: m.Product | None = db.session.scalar(query)
        if not p:
            log(log.ERROR, "Not found product by name : [%s]", form.name.data)
            flash("Cannot save product data", "danger")

        from_group_id = (
            db.session.execute(
                m.Group.select().where(
                    m.Group.name == form.from_group.data,
                )
            )
            .scalar()
            .id
        )

        rs: m.RequestShare = m.RequestShare(
            product_id=p.id,
            group_id=form.group_id.data,
            desire_quantity=form.desire_quantity.data,
            status="pending",
            from_group_id=from_group_id,
        )
        log(log.INFO, "Form submitted. Share Request: [%s]", rs)
        rs.save()

        product_group: m.Group = db.session.execute(
            m.Group.select().where(m.Group.id == form.group_id.data)
        ).scalar()

        users: list[m.UserGroup] = [
            u
            for u in db.session.execute(
                m.UserGroup.select().where(m.UserGroup.right_id == product_group.id)
            ).scalars()
        ]

        if len(users) != 0:
            for u in users:
                if not u.child.approval_permission:
                    continue
                msg = Message(
                    subject="New request share",
                    sender=app.config["MAIL_DEFAULT_SENDER"],
                    recipients=[u.child.email],
                )
                url = url_for(
                    "product.get_all",
                    _external=True,
                )

                msg.html = render_template(
                    "email/set.html",
                    user=u.child,
                    desire_quantity=form.desire_quantity.data,
                    url=url,
                )
                sru = m.RequestShareUser(
                    user_id=u.child.id,
                    request_share_id=rs.id,
                )
                sru.save()
                # TODO uncomment when ready to notify
                # mail.send(msg)
        flash("Share request created!", "success")
        return redirect(url_for("product.get_all"))

    else:
        log(log.ERROR, "product assign errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


@product_blueprint.route("/adjust", methods=["POST"])
@login_required
def adjust():
    form: f.DepleteProductForm = f.DepleteProductForm()
    product_desire_quantity = int(form.quantity.data)

    if form.validate_on_submit():
        warehouse_product: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.warehouse_id == form.warehouse_id.data,
                m.WarehouseProduct.product_id == form.product_id.data,
                m.WarehouseProduct.group_id == form.group_id.data,
            )
        ).scalar()

    product_name = (
        db.session.execute(
            m.Product.select().where(m.Product.id == form.product_id.data)
        )
        .scalar()
        .name
    )
    warehouse_name = (
        db.session.execute(
            m.Warehouse.select().where(m.Warehouse.id == form.warehouse_id.data)
        )
        .scalar()
        .name
    )

    if not warehouse_product:
        log(
            log.INFO,
            "These product is not in warehouse. Product id: [%s]",
            form.product_id.data,
        )
        return (
            jsonify(
                message=f"""Product "{product_name}" is out of warehouse "{warehouse_name}".""",
            ),
            200,
        )

    if warehouse_product.product_quantity == product_desire_quantity:
        log(
            log.INFO,
            "Quantity of product is the same. Product id: [%s]",
            form.product_id.data,
        )
        return (
            jsonify(
                message=f"""Quantity of product "{product_name}" in warehouse "{warehouse_name}"
                    is the same as you want to change.""",
            ),
            200,
        )

    warehouse_product.product_quantity = product_desire_quantity
    warehouse_product.save()

    log(
        log.INFO,
        "Adjust product: [%s][%s",
        form.product_id.data,
        form.warehouse_id.data,
    )
    return (
        jsonify(
            message=f"""Quantity of Product "{product_name}" in warehouse "{warehouse_name}"
                was changed to {product_desire_quantity}""",
        ),
        201,
    )
