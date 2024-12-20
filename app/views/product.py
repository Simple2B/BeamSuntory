import csv
import codecs
from http import HTTPStatus
import base64
from datetime import datetime
from pathlib import Path
import filetype
from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
    current_app as app,
    abort,
)
from flask_login import login_required, current_user
from pydantic import ValidationError
from pydantic import TypeAdapter

import sqlalchemy as sa
from app.controllers import (
    create_pagination,
    save_image,
    role_required,
    sort_user_groups,
    get_query_params_from_headers,
    BASE_IMAGE_PATH,
    find_image,
)

from app import models as m, db
from app import schema as s
from app import forms as f
from app.celery import notify_users_assign, notify_users_new_request_share
from app.logger import log

from .product_htmx import product_htmx

DEFUALT_IMAGE_ID = 1
DEFUALT_IMAGE_PATH = "app/static/img/no_picture_default.png"
product_blueprint = Blueprint("product", __name__, url_prefix="/product")
product_blueprint.register_blueprint(product_htmx)
adapter = TypeAdapter(list[int])


# TODO: needs refactor FIRST!!
def get_all_products(request, query=None, count_query=None, my_stocks=False):
    get_all_start = datetime.now()
    log(log.DEBUG, "Product get_all started: [%s]", get_all_start)
    is_events = request.args.get("is_events", type=bool, default=False)
    is_all_stocks_in_inventory = request.args.get(
        "is_all_stocks_in_inventory", type=bool, default=False
    )
    is_stocks_own_by_me = request.args.get(
        "is_stocks_own_by_me", type=bool, default=False
    )
    is_events_stocks_own_by_me = request.args.get(
        "is_events_stocks_own_by_me", type=bool, default=False
    )

    user_group_id = request.args.get("user_group_id", type=int, default="")

    master_groups = request.args.get("master_groups", type=str, default="").strip()
    master_groups_list = master_groups.split(",")

    q = request.args.get("q", type=str, default="")

    reverse_event_filter = ~m.Product.warehouse_products.any(
        m.WarehouseProduct.group.has(
            m.Group.master_group.has(m.MasterGroup.name == s.Events.name.value)
        )
    )

    if query is None or count_query is None:
        query = (
            sa.select(m.Product)
            .where(m.Product.is_deleted.is_(False))
            .order_by(m.Product.SKU.asc())
        )

        count_query = (
            sa.select(sa.func.count())
            .where(m.Product.is_deleted.is_(False))
            .select_from(m.Product)
        )

    if master_groups:
        for group in master_groups_list:
            master_group_filter = m.Product.product_groups.any(
                m.ProductGroup.parent.has(m.GroupProduct.name.ilike(f"%{group}%"))
            )
            query = query.where(master_group_filter)
            count_query = count_query.where(master_group_filter)

    if is_events:
        event_filter = m.Product.warehouse_products.any(
            m.WarehouseProduct.group.has(
                m.Group.master_group.has(m.MasterGroup.name == s.Events.name.value)
            )
        )

        query = query.where(event_filter)
        count_query = count_query.where(event_filter)

    if is_all_stocks_in_inventory:
        is_all_stocks_in_inventory_filter = m.Product.warehouse_products.any(
            m.WarehouseProduct.product_quantity > 0
        )

        query = query.where(is_all_stocks_in_inventory_filter)
        count_query = count_query.where(is_all_stocks_in_inventory_filter)

    if user_group_id:
        curr_user_products_ids = [
            i.product_id
            for i in db.session.execute(
                m.WarehouseProduct.select().where(
                    m.WarehouseProduct.group_id == user_group_id,
                    m.WarehouseProduct.product_quantity > 0,
                )
            ).scalars()
        ]
        query = query.where(
            m.Product.id.in_(curr_user_products_ids), reverse_event_filter
        )
        count_query = count_query.where(
            m.Product.id.in_(curr_user_products_ids), reverse_event_filter
        )

    if is_stocks_own_by_me:
        if current_user.role_obj.role_name == s.UserRole.ADMIN.value:
            curr_user_groups_ids = db.session.scalars(
                sa.select(m.Group.id).where(
                    m.Group.name.ilike("admin"),
                )
            ).all()
        else:
            curr_user_groups_ids = [group.id for group in current_user.user_groups]

        curr_user_products_ids = db.session.scalars(
            sa.select(m.WarehouseProduct.product_id).where(
                m.WarehouseProduct.group_id.in_(curr_user_groups_ids),
                m.WarehouseProduct.product_quantity > 0,
            )
        ).all()

        query = query.where(
            m.Product.id.in_(curr_user_products_ids), reverse_event_filter
        )
        count_query = count_query.where(
            m.Product.id.in_(curr_user_products_ids), reverse_event_filter
        )

    if is_events_stocks_own_by_me:
        event_filter = m.Product.warehouse_products.any(
            m.WarehouseProduct.group.has(
                m.Group.master_group.has(m.MasterGroup.name == s.Events.name.value)
            )
        )
        curr_user_groups_ids = [
            i.right_id
            for i in db.session.execute(
                m.UserGroup.select().where(
                    m.UserGroup.left_id == current_user.id,
                    m.UserGroup.parent.has(
                        m.Group.master_group.has(
                            m.MasterGroup.name == s.Events.name.value
                        )
                    ),
                )
            ).scalars()
        ]
        curr_user_products_ids = [
            i.product_id
            for i in db.session.execute(
                m.WarehouseProduct.select().where(
                    m.WarehouseProduct.group_id.in_(curr_user_groups_ids),
                    event_filter,
                )
            ).scalars()
        ]
        query = query.where(
            m.Product.id.in_(curr_user_products_ids),
        )
        count_query = count_query.where(m.Product.id.in_(curr_user_products_ids))

    if q:
        query = query.where(
            m.Product.name.ilike(f"%{q}%")
            | m.Product.SKU.ilike(f"%{q}%")
            | m.Product.description.ilike(f"%{q}%")
        )
        count_query = count_query.where(
            m.Product.name.ilike(f"%{q}%")
            | m.Product.SKU.ilike(f"%{q}%")
            | m.Product.description.ilike(f"%{q}%")
        )

    log(
        log.DEBUG,
        "Product get_all filters finished in [%s]",
        datetime.now() - get_all_start,
    )
    get_all_filters_time = datetime.now()

    pagination = create_pagination(total=db.session.scalar(count_query))

    master_groups = db.session.scalars(
        sa.select(m.MasterGroup).order_by(m.MasterGroup.name.asc())
    ).all()

    log(
        log.DEBUG,
        "Product get_all groups query and pagination finished in [%s]",
        datetime.now() - get_all_filters_time,
    )
    get_all_groups_time = datetime.now()

    master_for_prods_groups_for_prods = {}

    log(
        log.DEBUG,
        "Product get_all master_for_prods_groups_for_prods finished in [%s]",
        datetime.now() - get_all_groups_time,
    )

    # get all product_groups to list and compare in view.html
    product_groups = db.session.scalars(
        sa.select(m.ProductGroup)
        .join(m.GroupProduct)
        .order_by(m.GroupProduct.name.asc())
    ).all()

    # TODO: consider using a join instead of two queries <- Copilot
    # get all groups ids for current user to compare with product groups ids in view.html
    current_user_groups_rows = db.session.scalars(
        sa.select(m.UserGroup)
        .join(m.Group)
        .where(m.UserGroup.left_id == current_user.id)
        .order_by(m.Group.name.asc())
    ).all()

    master_groups_search = db.session.scalars(sa.select(m.MasterGroupProduct)).all()

    master_group_product_name = [
        master_group.name
        for master_group in master_groups_search
        if master_group.name != s.Brand.name.value
    ]
    suppliers = db.session.scalars(
        sa.select(m.Supplier).order_by(m.Supplier.name.asc())
    ).all()

    target_groups = db.session.scalars(m.Group.select().order_by(m.Group.name))

    current_user_groups_rows.sort(key=sort_user_groups)

    return {
        "query": query,
        "pagination": pagination,
        "is_events": is_events,
        "master_groups": master_groups,
        "product_groups": product_groups,
        "current_user_groups_rows": current_user_groups_rows,
        "master_for_prods_groups_for_prods": master_for_prods_groups_for_prods,
        "master_groups_list": master_groups_list,
        "q": q,
        "is_events_stocks_own_by_me": is_events_stocks_own_by_me,
        "is_stocks_own_by_me": is_stocks_own_by_me,
        "is_all_stocks_in_inventory": is_all_stocks_in_inventory,
        "user_group_id": user_group_id,
        "master_groups_search": master_groups_search,
        "master_product_groups_name": master_group_product_name,
        "suppliers": [s for s in suppliers],
        "all_product_groups": {
            i.name: i
            for i in db.session.execute(
                m.Group.select()
                .where(m.Group.parent_group_id.is_(None))
                .order_by(m.Group.name.asc())
            ).scalars()
        },
        "current_user_groups_names": [i.parent.name for i in current_user_groups_rows],
        "target_groups": target_groups,
        # TODO remove when testing is done
        "datetime": datetime,
    }


@product_blueprint.route("/<id>/view", methods=["GET"])
@login_required
def product_view(id: int):
    """htmx"""
    product = db.session.get(m.Product, id)
    is_events = request.args.get("is_events", type=str, default="False") == "True"

    if not product or product.is_deleted:
        log(log.ERROR, "Not found product by id : [%s]", id)
        return render_template("error_modal.html", message="Can't find product")

    warehouses = {}
    warehouse_products_by_group = dict()  # type: dict[str, dict[str, int]]
    for warehouse_product in product.warehouse_products:

        if warehouse_product.group.name not in warehouse_products_by_group:
            warehouse_products_by_group[warehouse_product.group.name] = (
                warehouse_product
            )

        if warehouse_product.warehouse.name not in warehouses:
            warehouses[warehouse_product.warehouse.name] = (
                warehouse_product.available_quantity
            )
        else:
            warehouses[
                warehouse_product.warehouse.name
            ] += warehouse_product.available_quantity

    return render_template(
        "product/modal_view.html",
        product=product,
        warehouse_products_by_group=warehouse_products_by_group,
        is_events=is_events,
        warehouses=warehouses,
    )


@product_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    products_object = get_all_products(request)

    name = request.args.get("is_stocks_own_by_me", type=bool, default=False)
    url_with_params = url_for("product.get_all", name=name)

    customized_view_columns_names = [
        n for n in products_object["master_product_groups_name"]
    ]
    customized_view_columns_names.insert(0, "Regular Price")

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
        master_groups_list=products_object["master_groups_list"],
        is_all_stocks_in_inventory=products_object["is_all_stocks_in_inventory"],
        is_stocks_own_by_me=products_object["is_stocks_own_by_me"],
        user_group_id=products_object["user_group_id"],
        is_events_stocks_own_by_me=products_object["is_events_stocks_own_by_me"],
        is_events=products_object["is_events"],
        main_master_groups=products_object["master_groups"],
        product_groups=products_object["product_groups"],
        all_product_groups=products_object["all_product_groups"],
        current_user_groups=products_object["current_user_groups_rows"],
        current_user_groups_names=products_object["current_user_groups_names"],
        master_groups_groups_available=products_object[
            "master_for_prods_groups_for_prods"
        ],
        master_groups_search=products_object["master_groups_search"],
        master_group_product_name=products_object["master_product_groups_name"],
        customized_view_columns_names=customized_view_columns_names,
        suppliers=products_object["suppliers"],
        target_groups=products_object["target_groups"],
        datetime=products_object["datetime"],
        url_with_params=url_with_params,
    )


@product_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def create():
    form: f.NewProductForm = f.NewProductForm()
    query_params = get_query_params_from_headers()
    if not form.validate_on_submit():
        log(log.ERROR, "Product creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all", **query_params))

    try:
        product_group_ids = adapter.validate_json(form.product_groups.data)
    except ValidationError as e:
        log(log.ERROR, "product_groups data is not valid json: [%s]", e)
        flash("Groups data is not valid", "danger")
        return redirect(url_for("product.get_all", **query_params))

    if not len(product_group_ids):
        log(log.ERROR, "Product must belong to at least one group")
        flash("Product must belong to at least one group", "danger")
        return redirect(url_for("product.get_all", **query_params))

    supplier: m.Supplier = db.session.scalar(m.Supplier.select())

    product: m.Product = m.Product(
        name=str(form.name.data).strip(" "),
        supplier_id=form.supplier.data if form.supplier.data else supplier.id,
        currency=form.currency.data if form.currency.data else "CAD",
        regular_price=form.regular_price.data,
        retail_price=form.retail_price.data,
        description=form.description.data,
        # General Info ->
        SKU=form.SKU.data,
        low_stock_level=form.low_stock_level.data,
        program_year=form.program_year.data,
        package_qty=form.package_qty.data,
        numb_of_items_per_case=form.numb_of_items_per_case.data,
        numb_of_cases_per_outer_case=form.numb_of_cases_per_outer_case.data,
        expiry_date=form.expiry_date.data,
        comments=form.comments.data,
        # shipping
        weight=form.weight.data,
        length=form.length.data,
        width=form.width.data,
        height=form.height.data,
    )
    image = form.image.data
    if image:
        image_name = (
            f"{form.SKU.data}{'.'.join(image.filename.split('.')[:-1])}"
            if image.filename
            else f"{form.SKU.data}"
        )
        kind = filetype.guess(image)

        if not kind:
            log(log.ERROR, "Can't guess image type.")
            flash("Can't guess image type.", "danger")
            return redirect(url_for("product.get_all", **query_params))

        if (
            db.session.scalar(sa.select(m.Image).where(m.Image.name == image_name))
            is not None
        ):
            flash("Image name already exist", "danger")
            return redirect(url_for("product.get_all", **query_params))

        try:
            image_path, _ = save_image(
                image=image, path=f"product/{image_name}.{kind.extension}"
            )
        except PermissionError as e:
            log(log.ERROR, "Can't save product image. Error: [%s]", e)
            flash("Can't save image some problems.", "danger")
            return redirect(url_for("product.get_all", **query_params))

        new_img = m.Image(
            name=image_name,
            path=image_path,
            extension=kind.extension,
        )
        product.image_obj = new_img
        product.image = new_img.get_base64().decode()
    else:
        product.image_id = DEFUALT_IMAGE_ID
        product.image = ""
    db.session.add(product)
    db.session.commit()

    product_group_ids = tuple(set(product_group_ids))

    for group_id in product_group_ids:
        product_group = m.ProductGroup(product_id=product.id, group_id=group_id)
        product_group.save(False)
    db.session.commit()

    log(log.INFO, "Form submitted. Product: [%s]", product)
    return redirect(url_for("product.get_all", **query_params))


@product_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def save():
    form: f.ProductForm = f.ProductForm()
    query_params = get_query_params_from_headers()

    if not form.validate_on_submit():
        log(log.ERROR, "product save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all", **query_params))

    try:
        product_group_ids = adapter.validate_json(form.product_groups.data)
    except ValidationError as e:
        log(log.ERROR, "product_groups data is not valid json: [%s]", e)
        flash("Groups data is not valid", "danger")
        return redirect(url_for("product.get_all", **query_params))

    product = db.session.get(m.Product, form.product_id.data)
    if not product or product.is_deleted:
        log(log.ERROR, "Not found product by id : [%s]", form.product_id.data)
        flash("Cannot save product data", "danger")
        return redirect(url_for("product.get_all", **query_params))

    supplier: m.Supplier = db.session.scalar(m.Supplier.select())

    product.name = str(form.name.data).strip(" ")
    product.supplier_id = form.supplier.data if form.supplier.data else supplier.id
    product.currency = form.currency.data if form.currency.data else "CAD"
    product.regular_price = form.regular_price.data
    product.retail_price = form.retail_price.data
    product.description = form.description.data
    # General Info ->
    product.SKU = form.SKU.data
    product.low_stock_level = form.low_stock_level.data
    product.program_year = form.program_year.data
    product.package_qty = form.package_qty.data
    product.numb_of_items_per_case = form.numb_of_items_per_case.data
    product.numb_of_cases_per_outer_case = form.numb_of_cases_per_outer_case.data
    product.expiry_date = form.expiry_date.data
    product.comments = form.comments.data
    product.notes_location = form.notes_location.data
    # shipping
    product.weight = form.weight.data
    product.length = form.length.data
    product.width = form.width.data
    product.height = form.height.data
    image = form.image.data
    if image:
        image_name = (
            f"{form.SKU.data}{'.'.join(image.filename.split('.')[:-1])}"
            if image.filename
            else f"{form.SKU.data}"
        )
        kind = filetype.guess(image)

        if not kind:
            log(log.ERROR, "Can't guess image type.")
            flash("Can't guess image type.", "danger")
            return redirect(url_for("product.get_all", **query_params))

        if (
            db.session.scalar(sa.select(m.Image).where(m.Image.name == image_name))
            is not None
        ):
            flash("Image name already exist", "danger")
            return redirect(url_for("product.get_all", **query_params))

        try:
            image_path, image_string = save_image(
                image=image, path=f"product/{image_name}.{kind.extension}"
            )
        except PermissionError as e:
            log(log.ERROR, "Can't save product image. Error: [%s]", e)
            flash("Can't save image some problems.", "danger")
            return redirect(url_for("product.get_all", **query_params))

        product.image = image_string
        if product.image_obj and product.image_obj.id != DEFUALT_IMAGE_ID:
            product.image_obj.name = image_name
            product.image_obj.path = image_path
            product.image_obj.extension = kind.extension
        else:
            new_img = m.Image(
                name=image_name,
                path=image_path,
                extension=kind.extension,
            )
            product.image_obj = new_img
            product.image = new_img.get_base64().decode()

    product.save(False)
    db.session.commit()
    product_group_ids = tuple(set(product_group_ids))

    product.product_groups = []
    for group_id in product_group_ids:
        product_group = m.ProductGroup(
            product_id=int(form.product_id.data), group_id=group_id
        )
        product_group.save()

    db.session.commit()
    return redirect(url_for("product.get_all", **query_params))


@product_blueprint.route("/product-ship-form/<warehouse_product_id>", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.MANAGER.value,
        s.UserRole.SALES_REP.value,
    ]
)
def get_product_ship_form(warehouse_product_id: int):
    form: f.NewCartForm = f.NewCartForm()
    warehouse_product = db.session.get(m.WarehouseProduct, warehouse_product_id)
    if not warehouse_product:
        log(log.ERROR, "Not found warehouse product [%s]", warehouse_product_id)
        return render_template(
            "error_modal.html", message="Can't find product warehouse"
        )

    form.warehouse_product_id.data = warehouse_product_id

    is_event = False
    if warehouse_product.group.master_group.name == s.Events.name.value:
        is_event = True

    if is_event:
        return render_template(
            "product/modal_event.html",
            form=form,
            warehouse_product=warehouse_product,
        )
    return render_template(
        "product/ship.html",
        form=form,
        warehouse_product=warehouse_product,
    )


@product_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    """htmx"""
    product: m.Product = db.session.get(m.Product, id)
    if not product or product.is_deleted:
        log(log.INFO, "There is no product with id: [%s]", id)
        flash("There is no such product", "danger")
        return "no product", 404

    now = datetime.now().strftime("%Y%m%d%H%M%S")
    product.is_deleted = True
    product.SKU = f"{product.SKU}_deleted_at_{now}"

    carts = db.session.scalars(
        sa.select(m.Cart).where(
            m.Cart.product_id == product.id, m.Cart.status == s.CartStatus.PENDING.value
        )
    ).all()

    for cart in carts:
        # we don't need to reduce from stock, because it's not shipped yet
        cart.status = s.CartStatus.CANCELLED.value

    db.session.commit()
    log(log.INFO, "Product deleted. Product: [%s]", product)
    flash("Product deleted!", "success")
    return "ok", 200


@product_blueprint.route("/assign/<warehouse_product_id>", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def get_assign_form(warehouse_product_id: int):
    form: f.AssignProductForm = f.AssignProductForm()
    product_warehouse = db.session.get(m.WarehouseProduct, warehouse_product_id)
    if not product_warehouse:
        log(log.ERROR, "Can't find product_warehouse [%s]", warehouse_product_id)
        return render_template(
            "error_modal.html", message="Can't find product warehouse"
        )

    form.product_SKU.data = product_warehouse.product.SKU
    main_master_groups = db.session.scalars(sa.select(m.MasterGroup)).all()
    groups = main_master_groups[0].groups if main_master_groups[0] else []

    return render_template(
        "product/modal_assign.html",
        form=form,
        product_warehouse=product_warehouse,
        main_master_groups=main_master_groups,
        groups=groups,
    )


@product_blueprint.route("/assign/groups", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def get_assign_groups():
    master_group_id = request.args.get("master_group", type=int, default=0)
    groups = []
    if not master_group_id:
        log(log.ERROR, "Get assign groups not found master_group_id")
        return render_template("product/assing_groups.html", groups=groups)

    master_group = db.session.get(m.MasterGroup, master_group_id)

    if not master_group:
        log(log.ERROR, "Not found master_group by id : [%s]", master_group_id)
        return render_template("product/assing_groups.html", groups=groups)

    return render_template("product/assing_groups.html", groups=master_group.groups)


@product_blueprint.route("/assign/sub_groups", methods=["GET"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def get_assign_sub_groups():
    group_name = request.args.get("group", type=str, default="")
    groups = []
    if not group_name:
        log(log.ERROR, "Get assign groups not found group name")
        return render_template("product/assing_sub_groups.html", groups=groups)

    group = db.session.scalar(sa.select(m.Group).where(m.Group.name == group_name))
    if not group or not group.child_groups:
        log(log.ERROR, "Not found group by name : [%s]", group_name)
        return render_template("product/assing_sub_groups.html", groups=groups)

    return render_template(
        "product/assing_sub_groups.html", sub_groups=group.child_groups
    )


@product_blueprint.route("/assign", methods=["POST"])
@login_required
@role_required(
    [s.UserRole.ADMIN.value, s.UserRole.MANAGER.value, s.UserRole.SALES_REP.value]
)
def assign():
    form: f.AssignProductForm = f.AssignProductForm()
    query_params = get_query_params_from_headers()

    if not form.validate_on_submit():
        log(log.ERROR, "product assign errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all", **query_params))
    query = sa.select(m.Product).where(m.Product.SKU == form.product_SKU.data)
    product = db.session.scalar(query)

    if not product or product.is_deleted:
        log(log.ERROR, "Not found product by name : [%s]", form.name.data)
        flash("Cannot save product data", "danger")
        return redirect(url_for("product.get_all", **query_params))

    product_from_group: m.Group = db.session.scalar(
        sa.select(m.Group).where(
            m.Group.name == form.from_group.data,
        )
    )
    if form.sub_group.data:
        product_to_group: m.Group = db.session.scalar(
            sa.select(m.Group).where(
                m.Group.name == form.sub_group.data,
            )
        )
    else:
        product_to_group: m.Group = db.session.scalar(
            sa.select(m.Group).where(
                m.Group.name == form.group.data,
            )
        )

    if not product_from_group or not product_to_group:
        log(log.ERROR, "Group not found")
        flash("Cannot save product data", "danger")
        return redirect(url_for("product.get_all", **query_params))

    if product_from_group.id == product_to_group.id:
        log(log.ERROR, "Cannot assign to same group")
        flash(
            f"Cannot assign from {product_from_group.name} to {product_to_group.name}",
            "danger",
        )
        return redirect(url_for("product.get_all", **query_params))

    product_warehouses_from = db.session.scalars(
        sa.select(m.WarehouseProduct)
        .where(
            m.WarehouseProduct.product_id == product.id,
            m.WarehouseProduct.group_id == product_from_group.id,
        )
        .order_by(m.WarehouseProduct.product_quantity.asc())
    ).all()
    if (
        not product_warehouses_from
        or product_warehouses_from[0].available_quantity < form.quantity.data
    ):
        log(log.ERROR, "Not enough product in warehouse")
        flash("Not enough product in warehouse", "danger")
        return redirect(url_for("product.get_all", **query_params))

    report_inventory_list = m.ReportInventoryList(
        type="Product Assigned",
        user_id=current_user.id,
    )
    report_inventory_list.save(False)

    # NOTE create report for inventory
    new_qty = form.quantity.data
    for product_warehouse in product_warehouses_from:
        if (
            new_qty > product_warehouse.product_quantity
            and product_warehouse.product_quantity != 0
        ):
            report_inventory = m.ReportInventory(
                qty_before=product_warehouse.product_quantity,
                qty_after=0,
                report_inventory_list=report_inventory_list,
                product_id=product_warehouse.product_id,
                warehouse_product=product_warehouse,
            ).save(False)
            new_qty -= product_warehouse.product_quantity
            product_warehouse.product_quantity = 0
        else:
            report_inventory = m.ReportInventory(
                qty_before=product_warehouse.product_quantity,
                qty_after=product_warehouse.product_quantity - new_qty,
                report_inventory_list=report_inventory_list,
                product_id=product_warehouse.product_id,
                warehouse_product=product_warehouse,
            ).save(False)
            product_warehouse.product_quantity -= new_qty
            break

    new_product_warehouse = db.session.scalar(
        sa.select(m.WarehouseProduct).where(
            m.WarehouseProduct.product_id == product.id,
            m.WarehouseProduct.group_id == product_to_group.id,
        )
    )
    if new_product_warehouse:
        qty_before = new_product_warehouse.product_quantity
        new_product_warehouse.product_quantity += form.quantity.data
    else:
        qty_before = 0
        new_product_warehouse = m.WarehouseProduct(
            product_id=product.id,
            group_id=product_to_group.id,
            product_quantity=form.quantity.data,
            warehouse_id=product_warehouse.warehouse_id,
        )
        new_product_warehouse.save(False)

    report_inventory = m.ReportInventory(
        qty_before=qty_before,
        qty_after=new_product_warehouse.product_quantity,
        report_inventory_list_id=report_inventory_list.id,
        product_id=new_product_warehouse.product_id,
        warehouse_product=new_product_warehouse,
    )
    report_inventory.save(False)

    assign_obj = m.Assign(
        product_id=product.id,
        group_id=product_to_group.id,
        quantity=form.quantity.data,
        from_group_id=product_from_group.id,
        user_id=current_user.id,
        type=s.ReportEventType.created.value,
    )
    assign_obj.save(False)

    m.ReportSKU(
        product_id=new_product_warehouse.product_id,
        assign=assign_obj,
        type=s.ReportSKUType.assign.value,
        status=f"Assigned from {product_from_group.name} to {product_to_group.name}",
    ).save(False)

    db.session.commit()

    redirect_url = (
        url_for(
            "assign.get_all",
            _external=True,
        )
        + f"?q={assign_obj.uuid}"
    )

    notify_users_assign.delay(assign_obj.id, app.config["ENV"], redirect_url)

    return redirect(url_for("product.get_all", **query_params))


@product_blueprint.route("/request_share/<warehouse_product_id>", methods=["GET"])
@login_required
def get_request_share_form(warehouse_product_id: int):
    form: f.RequestShareProductForm = f.RequestShareProductForm()
    warehouse_product = db.session.get(m.WarehouseProduct, warehouse_product_id)
    if not warehouse_product:
        log(log.ERROR, "Can't find product_warehouse [%s]", warehouse_product_id)
        return render_template(
            "error_modal.html", message="Can't find product warehouse"
        )
    user_groups = current_user.user_groups
    return render_template(
        "product/modal_request_share.html",
        form=form,
        warehouse_product=warehouse_product,
        user_groups=user_groups,
    )


@product_blueprint.route("/request_share", methods=["POST"])
@login_required
def request_share():
    form: f.RequestShareProductForm = f.RequestShareProductForm()
    query_params = get_query_params_from_headers()
    if not form.validate_on_submit():
        log(log.ERROR, "product assign errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all", **query_params))
    warehouse_product: m.WarehouseProduct | None = db.session.scalar(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product.has(m.Product.SKU == form.sku.data),
            m.WarehouseProduct.group.has(m.Group.id == form.from_group_id.data),
        )
    )

    if not warehouse_product:
        log(
            log.ERROR,
            "Not found product by SKU and group: [%s], [%s]",
            form.sku.data,
            form.from_group_id.data,
        )
        flash("Cannot save product data", "danger")
        return redirect(url_for("product.get_all", **query_params))

    to_group: m.Group = db.session.get(m.Group, form.to_group_id.data)
    if not to_group:
        log(
            log.ERROR,
            "From to not found: [%s]",
            form.to_group_id.data,
        )
        flash("Cannot save product data", "danger")
        return redirect(url_for("product.get_all", **query_params))

    request_share: m.RequestShare = m.RequestShare(
        product_id=warehouse_product.product.id,
        group_id=form.to_group_id.data,
        desire_quantity=form.desire_quantity.data,
        status="pending",
        from_group_id=warehouse_product.group.id,
        user_id=current_user.id,
    )
    log(log.INFO, "Form submitted. Share Request: [%s]", request_share)

    report_request_share = m.ReportRequestShare(
        user=current_user,
        type=s.ReportRequestShareActionType.CREATED.value,
        request_share=request_share,
    )

    db.session.add(request_share)
    db.session.add(report_request_share)

    users = db.session.scalars(
        sa.select(m.User)
        .join(m.UserGroup)
        .where(m.UserGroup.right_id == form.from_group_id.data)
    ).all()

    for user in users:
        request_share_user = m.RequestShareUser(
            user_id=user.id,
            request_share=request_share,
        )
        db.session.add(request_share_user)

    db.session.commit()

    redirect_url = url_for("auth.login", _external=True)

    notify_users_new_request_share.delay(
        request_share.id, app.config["ENV"], redirect_url
    )
    flash("Share request created!", "success")
    return redirect(url_for("product.get_all", **query_params))


@product_blueprint.route("/adjust", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def adjust():
    form: f.AdjustProductForm = f.AdjustProductForm()

    query_params = get_query_params_from_headers()
    if not form.validate_on_submit():
        log(log.ERROR, "Adjust product errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all", **query_params))
    adjust_item: m.Adjust = m.Adjust(
        product_id=form.product_id.data,
        note=form.note.data,
        user_id=current_user.id,
    )
    db.session.add(adjust_item)
    is_adjust_products = False

    try:
        warehouses_groups_qty = s.ProductWarehouseAdapter.validate_json(
            form.warehouses_groups_quantity.data
        )
    except ValidationError as e:
        log(log.ERROR, "Adjust model_root validate errors: [%s]", e)
        flash("Data is not valid", "danger")
        return redirect(url_for("product.get_all", **query_params))

    product = db.session.get(m.Product, form.product_id.data)

    if not product or product.is_deleted:
        flash("Cannot save product data", "danger")
        log(log.ERROR, "Not found product by id : [%s]", form.product_id.data)
        return redirect(url_for("product.get_all", **query_params))

    report_inventory_list = m.ReportInventoryList(
        type="Products Adjusted",
        user_id=current_user.id,
    )
    report_inventory_list.save(False)

    for warehouse_group_qty in warehouses_groups_qty:
        product_warehouse = db.session.get(
            m.WarehouseProduct, warehouse_group_qty.warehouse_product_id
        )

        if not product_warehouse:
            log(log.ERROR, "Not found warehouse product: [%s]", warehouse_group_qty)
            flash("Cannot save product data", "danger")
            return redirect(url_for("product.get_all", **query_params))

        if product_warehouse.group.master_group.name == s.Events.name.value:
            log(log.ERROR, "Can't adjust product in events warehouse")
            continue

        if product_warehouse.product_quantity == warehouse_group_qty.product_quantity:
            continue

        adjust_gr_qty: m.AdjustGroupQty = m.AdjustGroupQty(
            adjust_id=adjust_item.id,
            quantity_before=product_warehouse.product_quantity,
            quantity_after=warehouse_group_qty.product_quantity,
            group_id=product_warehouse.group.id,
            warehouse_id=product_warehouse.warehouse.id,
            product_id=form.product_id.data,
        )
        db.session.add(adjust_gr_qty)

        m.ReportInventory(
            report_inventory_list=report_inventory_list,
            qty_before=product_warehouse.product_quantity,
            qty_after=warehouse_group_qty.product_quantity,
            product_id=product_warehouse.product_id,
            warehouse_product=product_warehouse,
        ).save(False)

        m.ReportSKU(
            product_id=product_warehouse.product_id,
            adjustment=adjust_gr_qty,
            type=s.ReportSKUType.adjustment.value,
            status="Adjusted quantity",
            qty_after=warehouse_group_qty.product_quantity,
            qty_before=product_warehouse.product_quantity,
            warehouse_product=product_warehouse,
        ).save(False)

        product_warehouse.product_quantity = warehouse_group_qty.product_quantity

        is_adjust_products = True

    if not is_adjust_products:
        db.session.delete(adjust_item)
        log(log.INFO, "Nothing to adjust: [%s]", form.product_id.data)
        flash("Nothing to adjust", "danger")
        return redirect(url_for("product.get_all", **query_params))

    db.session.commit()

    log(
        log.INFO,
        "Adjust product: [%s]",
        form.product_id.data,
    )
    flash(f"Product {product.name} was adjusted", "success")
    return redirect(url_for("product.get_all", **query_params))


@product_blueprint.route("/upload", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def upload():
    form: f.UploadProductForm = f.UploadProductForm()
    query_params = get_query_params_from_headers()
    if not form.validate_on_submit():
        log(log.ERROR, "Product creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all", **query_params))

    # NOTE Use large number if no group selected. Impossible to reach that number in prod.
    # Used to avoid wrong validation in backend wtform when pass 0 and get None
    if form.target_group_upload.data == 999999999:
        form.target_group_upload.data = 0

    language_master_group = db.session.scalar(
        sa.select(m.MasterGroupProduct).where(m.MasterGroupProduct.name == "Language")
    )
    brand_master_group = db.session.scalar(
        sa.select(m.MasterGroupProduct).where(m.MasterGroupProduct.name == "Brand")
    )
    categories_master_group = db.session.scalar(
        sa.select(m.MasterGroupProduct).where(m.MasterGroupProduct.name == "Categories")
    )

    if not language_master_group:
        log(
            log.ERROR,
            "Not found product master group Language while upload CSV with products",
        )
        flash("No Language product master group", "danger")
        return url_for("product.get_all", **query_params)

    if not brand_master_group:
        log(
            log.ERROR,
            "Not found product master group Brand while upload CSV with products",
        )
        flash("No Brand product master group", "danger")
        return url_for("product.get_all", **query_params)

    if not categories_master_group:
        log(
            log.ERROR,
            "Not found product master group Categories while upload CSV with products",
        )
        flash("No Categories product master group", "danger")
        return url_for("product.get_all", **query_params)

    csv_file = request.files["upload_csv"]

    # default_image = db.session.scalar(
    #     sa.select(m.Image).where(m.Image.name == "no_picture_default.png")
    # )

    stream = codecs.iterdecode(csv_file.stream, "utf-8")
    csv_reader = csv.reader(stream)
    next(csv_reader)
    error_message = ""

    for i, row in enumerate(csv_reader):
        print(row)
        try:
            product_item_data = s.ProductCSVItem(*row)
        except ValidationError:
            log(log.ERROR, "SCV product upload validation error: %s", row)
            error_message += f"Invalid product item: {i + 1}\n"
            continue

        product = db.session.scalar(
            sa.select(m.Product).where(
                m.Product.SKU == product_item_data.sku,
            )
        )

        log(log.INFO, "Product: [%s]", product)

        language_product_group = db.session.scalar(
            sa.select(m.GroupProduct).where(
                m.GroupProduct.master_groups_for_product.has(
                    m.MasterGroupProduct.name == language_master_group.name
                ),
                m.GroupProduct.name == product_item_data.language,
            )
        )
        brand_product_group = db.session.scalar(
            sa.select(m.GroupProduct).where(
                m.GroupProduct.master_groups_for_product.has(
                    m.MasterGroupProduct.name == brand_master_group.name
                ),
                m.GroupProduct.name == product_item_data.brand,
            )
        )
        category_product_group = db.session.scalar(
            sa.select(m.GroupProduct).where(
                m.GroupProduct.master_groups_for_product.has(
                    m.MasterGroupProduct.name == categories_master_group.name
                ),
                m.GroupProduct.name == product_item_data.categories,
            )
        )

        # TODO: Add logic for creating product with group Events
        if product_item_data.categories == "Events":
            error_message += f"Cannot upload product with group Events, product SKU: {product_item_data.sku}\n"
            log(log.ERROR, "Cannot upload product with group Events")
            continue

        if not language_product_group and product_item_data.language != "":
            language_product_group = db.session.scalar(
                sa.select(m.GroupProduct).where(
                    m.GroupProduct.name == product_item_data.language,
                )
            )
            if not language_product_group:
                language_product_group = m.GroupProduct(
                    name=product_item_data.language,
                    master_groups_for_product=language_master_group,
                )
                db.session.add(language_product_group)
            log(
                log.INFO,
                "Added Language product group: [%s]",
                product_item_data.language,
            )

        if not brand_product_group and product_item_data.brand != "":
            brand_product_group = db.session.scalar(
                sa.select(m.GroupProduct).where(
                    m.GroupProduct.name == product_item_data.brand,
                )
            )
            if not brand_product_group:
                brand_product_group = m.GroupProduct(
                    name=product_item_data.brand,
                    master_groups_for_product=brand_master_group,
                )
                db.session.add(brand_product_group)
            log(log.INFO, "Added Brand product group: [%s]", product_item_data.brand)

        if not category_product_group and product_item_data.categories != "":
            category_product_group = db.session.scalar(
                sa.select(m.GroupProduct).where(
                    m.GroupProduct.name == product_item_data.categories,
                )
            )
            if not category_product_group:
                category_product_group = m.GroupProduct(
                    name=product_item_data.categories,
                    master_groups_for_product=categories_master_group,
                )
                db.session.add(category_product_group)
            log(
                log.INFO,
                "Added Category product group: [%s]",
                product_item_data.categories,
            )

        if not product:
            log(log.INFO, "Product not found")

            product = m.Product(
                SKU=product_item_data.sku,
                name=product_item_data.name,
                description=product_item_data.description,
                regular_price=product_item_data.regular_price,
                retail_price=product_item_data.retail_price,
                image="",
            )
            db.session.add(product)
            log(log.INFO, "Added product: [%s]", product_item_data.sku)

        product_with_group_language = None
        try:
            product_with_group_language = db.session.scalar(
                sa.select(m.Product.id).where(
                    m.Product.SKU == product_item_data.sku,
                    m.Product.groups.any(
                        sa.and_(
                            m.GroupProduct.name == product_item_data.language,
                            m.GroupProduct.master_groups_for_product.has(
                                m.MasterGroupProduct.name == language_master_group.name,
                            ),
                        ),
                    ),
                )
            )
        except Exception as e:
            log(log.ERROR, "Error: [%s]", e)
            return redirect(url_for("product.get_all", **query_params))

        log(log.INFO, "Product with group language: [%s]", product_with_group_language)
        if not product_with_group_language:
            log(log.INFO, "Product with group not found")
            print(product.groups)
            if language_product_group:
                product.groups.append(language_product_group)
                log(
                    log.INFO,
                    "Language product group added: [%s]",
                    language_product_group,
                )

        product_with_group_brand = None
        try:
            product_with_group_brand = db.session.scalar(
                sa.select(m.Product.id).where(
                    m.Product.SKU == product_item_data.sku,
                    m.Product.groups.any(
                        sa.and_(
                            m.GroupProduct.name == product_item_data.brand,
                            m.GroupProduct.master_groups_for_product.has(
                                m.MasterGroupProduct.name == brand_master_group.name
                            ),
                        )
                    ),
                )
            )
        except Exception as e:
            log(log.ERROR, "Error: [%s]", e)
            return redirect(url_for("product.get_all", **query_params))

        if not product_with_group_brand:
            log(log.INFO, "Product with group not found")
            if brand_product_group:
                product.groups.append(brand_product_group)
                log(log.INFO, "Brand product group added: [%s]", brand_product_group)

        product_with_group_category = None
        try:
            product_with_group_category = db.session.scalar(
                sa.select(m.Product.id).where(
                    m.Product.SKU == product_item_data.sku,
                    m.Product.groups.any(
                        sa.and_(
                            m.GroupProduct.name == product_item_data.categories,
                            m.GroupProduct.master_groups_for_product.has(
                                m.MasterGroupProduct.name
                                == categories_master_group.name
                            ),
                        ),
                    ),
                )
            )
        except Exception as e:
            log(log.ERROR, "Error: [%s]", e)
            return redirect(url_for("product.get_all", **query_params))

        if not product_with_group_category:
            log(
                log.INFO,
                "Category product group not found: [%s]",
                category_product_group,
            )
            if category_product_group:
                product.groups.append(category_product_group)
                log(
                    log.INFO,
                    "Category product group added: [%s]",
                    category_product_group,
                )

        if language_product_group and language_product_group not in product.groups:
            product.groups.append(language_product_group)
            log(
                log.INFO,
                "Language product group added to product.groups: [%s]",
                language_product_group,
            )

        if brand_product_group and brand_product_group not in product.groups:
            product.groups.append(brand_product_group)
            log(
                log.INFO,
                "Brand product group added to product.groups: [%s]",
                brand_product_group,
            )

        if category_product_group and category_product_group not in product.groups:
            product.groups.append(category_product_group)
            log(
                log.INFO,
                "Category product group added to product.groups: [%s]",
                category_product_group,
            )

        if product_item_data.name != product.name:
            log(log.INFO, "Product name: [%s]", product.name)
            log(log.INFO, "Product item data name: [%s]", product_item_data.name)
            log(log.INFO, "Product: [%s]", product.SKU)
        else:
            log(log.INFO, "Product name not changed: [%s]", product.name)
            log(log.INFO, "Product item data name: [%s]", product_item_data.name)
            log(log.INFO, "Product: [%s]", product.SKU)
        if not product.image_obj:
            log(log.INFO, "Product image not found")
            img = db.session.scalar(
                sa.select(m.Image).where(m.Image.name == product.name)
            )
            if not img:
                image_url = find_image("product", product.name)
                kind = filetype.guess(image_url)
                if not image_url or not kind:
                    log(log.INFO, "Image not found set default image")
                    product.image = ""
                    product.image_id = DEFUALT_IMAGE_ID
                else:
                    log(log.INFO, "Image found: [%s]", image_url)

                    new_img = m.Image(
                        name=product.name,
                        path=image_url,
                        extension=kind.extension,
                    )
                    product.image_obj = new_img
                    product.image = new_img.get_base64().decode()
            else:
                product.image_obj = img
                product.image = img.get_base64().decode()
        # updating just 'we ignore everything except qty and give the qty to this SKU to the target group selected. '
        # product.name = product_item_data.name
        # product.description = product_item_data.description
        # product.regular_price = product_item_data.regular_price
        # product.retail_price = product_item_data.retail_price

        # product.save(False)

        if form.target_group_upload.data:
            log(log.INFO, "Target group: [%s]", form.target_group_upload.data)
            group = db.session.scalar(
                sa.select(m.Group).where(m.Group.id == form.target_group_upload.data)
            )

            warehouse_product = (
                db.session.query(m.WarehouseProduct)
                .filter(m.WarehouseProduct.product == product)
                .filter(m.WarehouseProduct.group == group)
                .first()
            )

            if warehouse_product and group and product_item_data.available_quantity:
                log(
                    log.INFO,
                    "Warehouse product found: [%s]",
                    warehouse_product,
                )
                # we set new qty to the existing qty
                warehouse_product.product_quantity = (
                    product_item_data.available_quantity
                )

            if not warehouse_product and group and product_item_data.available_quantity:
                default_warehouse = db.session.scalar(sa.select(m.Warehouse))
                log(log.INFO, "Warehouse product not found. Default warehouse: [%s]")
                if not default_warehouse:
                    log(log.ERROR, "Default warehouse not found")
                    flash("Cannot save product data warehouse not found", "danger")
                    return redirect(url_for("product.get_all", **query_params))

                warehouse_product = m.WarehouseProduct(
                    warehouse=default_warehouse,
                    product=product,
                    group=group,
                    product_quantity=product_item_data.available_quantity,
                )
                db.session.add(warehouse_product)
                log(log.INFO, "Warehouse_product added: [%s]", warehouse_product)
        log(log.INFO, "Product added; name: [%s]", product.name)

    try:
        db.session.commit()
        log(log.INFO, "CSV file uploaded")
        if not error_message:
            flash("Products added!", "success")
        else:
            flash(f"Products added, but not all. \n {error_message}", "success")
    except Exception as e:
        log(log.ERROR, "CSV file uploaded error: [%s]", e)
        flash("Cannot save product data", "danger")

    return redirect(url_for("product.get_all", **query_params))


@product_blueprint.route("/full_image/<int:id>", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.MANAGER.value,
        s.UserRole.DELIVERY_AGENT.value,
    ]
)
def full_image(id: int):
    log(log.INFO, "Get full image [%s]", id)
    product: m.Product = db.session.execute(
        m.Product.select().where(m.Product.id == id, m.Product.is_deleted.is_(False))
    ).scalar()

    if not product.image_obj:
        log(log.ERROR, "Can't find product image object")
        abort(404, HTTPStatus.NOT_FOUND)

    image_path: str = DEFUALT_IMAGE_PATH
    if product.image_obj.id != DEFUALT_IMAGE_ID:
        image_path = product.image_obj.path

    if not image_path.startswith(str(BASE_IMAGE_PATH)):
        image_path = str(BASE_IMAGE_PATH / Path(product.image_obj.path))

    log(log.INFO, "Image path [%s]", image_path)

    try:
        with open(
            image_path,
            "rb",
        ) as original_image:

            img_bytes = base64.b64encode(original_image.read()).decode()

    except FileNotFoundError as e:
        log(log.ERROR, "Image file not found [%s]", e)
        abort(404, HTTPStatus.NOT_FOUND)

    return s.ProductFullImage(
        name=product.name,
        image=img_bytes,
        imageType=product.image_obj.extension.lower(),
    ).model_dump_json()


@product_blueprint.route("/get_additional_info/<int:product_id>", methods=["GET"])
@login_required
def get_additional_info(product_id):
    current_user_groups_rows = db.session.scalars(
        m.UserGroup.select().where(m.UserGroup.left_id == current_user.id)
    ).all()
    current_user_groups = {
        grps.parent.master_group.name: [
            g.parent.name
            for g in current_user_groups_rows
            if grps.parent.master_group.name == g.parent.master_group.name
        ]
        for grps in current_user_groups_rows
    }

    current_user_groups = []
    # TODO: refactor
    for group in current_user_groups_rows:
        current_user_groups.append(
            {
                "master_group_name": group.parent.master_group.name,
                "groups": [
                    {"group_name": g.parent.name}
                    for g in current_user_groups_rows
                    if group.parent.master_group.name == g.parent.master_group.name
                ],
            }
        )

    all_warehouses = [
        {
            "id": w.id,
            "name": w.name,
        }
        for w in db.session.scalars(m.Warehouse.select())
    ]

    master_group_product = db.session.scalars(m.MasterGroupProduct.select()).all()
    master_groups_groups = [
        {
            "master_group": mg.name,
            "groups": [
                {"group_name": group.name, "group_id": group.id}
                for group in mg.groups_for_product
            ],
        }
        for mg in master_group_product
    ]
    prod = db.session.get(m.Product, product_id)

    if not prod:
        log(log.ERROR, "Product not found by id: [%s]", product_id)
        return s.ProductAdditionalInfo(
            current_user_groups=current_user_groups,
            all_warehouses=all_warehouses,
            master_groups_groups=master_groups_groups,
            current_master_product_groups=[],
            current_user_role=current_user.role_obj.role_name,
        ).model_dump_json(by_alias=True)

    current_product_master_groups = db.session.scalars(
        m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.groups_for_product.any(
                m.GroupProduct.product_groups.any(
                    m.ProductGroup.product_id == product_id,
                )
            )
        )
    ).all()
    current_master_product_groups = [
        {
            "master_group": mg.name,
            "groups": [
                {"group_name": group.name, "group_id": group.id}
                for group in mg.groups_for_product
                if group.id in [g.group_id for g in prod.product_groups]
            ],
        }
        for mg in current_product_master_groups
    ]

    return s.ProductAdditionalInfo(
        current_user_groups=current_user_groups,
        all_warehouses=all_warehouses,
        master_groups_groups=master_groups_groups,
        current_master_product_groups=current_master_product_groups,
        current_user_role=current_user.role_obj.role_name,
    ).model_dump_json(by_alias=True)
