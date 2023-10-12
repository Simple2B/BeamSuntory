from io import BytesIO
import base64
import json
from datetime import datetime
from pathlib import Path
from PIL import Image
import pandas
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
from sqlalchemy.dialects.postgresql import insert
import sqlalchemy as sa
from app.controllers import create_pagination, save_image, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


product_blueprint = Blueprint("product", __name__, url_prefix="/product")


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

    master_groups = request.args.get("master_groups", type=str, default="")
    master_groups_list = master_groups.split(",")

    q = request.args.get("q", type=str, default="")

    reverse_event_filter = ~m.Product.warehouse_products.any(
        m.WarehouseProduct.group.has(
            m.Group.master_group.has(
                m.MasterGroup.name == s.MasterGroupMandatory.events.value
            )
        )
    )

    if query is None or count_query is None:
        query = m.Product.select().order_by(m.Product.id)

        count_query = sa.select(sa.func.count()).select_from(m.Product)

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
                m.Group.master_group.has(
                    m.MasterGroup.name == s.MasterGroupMandatory.events.value
                )
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

    if is_stocks_own_by_me:
        curr_user_groups_ids = [
            i.right_id
            for i in db.session.execute(
                m.UserGroup.select().where(
                    m.UserGroup.left_id == current_user.id,
                )
            ).scalars()
        ]
        curr_user_products_ids = [
            i.product_id
            for i in db.session.execute(
                m.WarehouseProduct.select().where(
                    m.WarehouseProduct.group_id.in_(curr_user_groups_ids),
                )
            ).scalars()
        ]

        query = query.where(
            m.Product.id.in_(curr_user_products_ids), reverse_event_filter
        )
        count_query = count_query.where(
            m.Product.id.in_(curr_user_products_ids), reverse_event_filter
        )

    if is_events_stocks_own_by_me:
        event_filter = m.Product.warehouse_products.any(
            m.WarehouseProduct.group.has(
                m.Group.master_group.has(
                    m.MasterGroup.name == s.MasterGroupMandatory.events.value
                )
            )
        )
        curr_user_groups_ids = [
            i.right_id
            for i in db.session.execute(
                m.UserGroup.select().where(
                    m.UserGroup.left_id == current_user.id,
                    m.UserGroup.parent.has(
                        m.Group.master_group.has(
                            m.MasterGroup.name == s.MasterGroupMandatory.events.value
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
        query = query.where(m.Product.name.ilike(f"%{q}%"))
        count_query = count_query.where(m.Product.name.ilike(f"%{q}%"))

    log(
        log.DEBUG,
        "Product get_all filters finished in [%s]",
        datetime.now() - get_all_start,
    )
    get_all_filters_time = datetime.now()

    groups_for_products_obj = db.session.scalars(m.GroupProduct.select()).all()

    pagination = create_pagination(total=db.session.scalar(count_query))

    master_groups = db.session.scalars(m.MasterGroup.select()).all()

    log(
        log.DEBUG,
        "Product get_all groups query and pagination finished in [%s]",
        datetime.now() - get_all_filters_time,
    )
    get_all_groups_time = datetime.now()

    mastr_for_prods_groups_for_prods = {}
    mstr_prod_grps_prod_grps_names = {}
    for group in groups_for_products_obj:
        if group.master_groups_for_product.name not in mastr_for_prods_groups_for_prods:
            mastr_for_prods_groups_for_prods[group.master_groups_for_product.name] = [
                group
            ]
            mstr_prod_grps_prod_grps_names[group.master_groups_for_product.name] = [
                {"group_name": group.name, "group_id": group.id}
            ]
        else:
            mastr_for_prods_groups_for_prods[
                group.master_groups_for_product.name
            ].append(group)
            mstr_prod_grps_prod_grps_names[group.master_groups_for_product.name].append(
                {"group_name": group.name, "group_id": group.id}
            )

    log(
        log.DEBUG,
        "Product get_all mastr_for_prods_groups_for_prods finished in [%s]",
        datetime.now() - get_all_groups_time,
    )
    get_all_mastr_grps_names = datetime.now()

    # get all product_groups to list and compare in view.html
    product_groups: list[m.ProductGroup] = db.session.scalars(
        m.ProductGroup.select()
    ).all()

    # TODO: consider using a join instead of two queries <- Copilot
    # get all groups ids for current user to compare with product groups ids in view.html
    current_user_groups_rows = db.session.scalars(
        m.UserGroup.select().where(m.UserGroup.left_id == current_user.id)
    ).all()

    master_groups_search = {}
    for group in groups_for_products_obj:
        if group.master_groups_for_product.name not in master_groups_search:
            master_groups_search[group.master_groups_for_product.name] = [group.name]
        else:
            master_groups_search[group.master_groups_for_product.name].append(
                group.name
            )

    log(
        log.DEBUG,
        "Product get_all master_groups_search finished in [%s]",
        datetime.now() - get_all_mastr_grps_names,
    )
    get_all_master_groups_search = datetime.now()

    master_group_product_name = [
        mgp.name for mgp in db.session.scalars(m.MasterGroupProduct.select())
    ]

    suppliers = db.session.scalars(m.Supplier.select()).all()

    warehouse_product_query: list[m.WarehouseProduct] = db.session.scalars(
        m.WarehouseProduct.select().order_by(m.WarehouseProduct.id)
    ).all()

    warehouse_product_qty = dict()

    warehouse_products = {wpq.product_id for wpq in warehouse_product_query}

    for ware_prod in warehouse_products:
        for wpq in warehouse_product_query:
            if wpq.product_id != ware_prod:
                continue
            if my_stocks:
                if wpq.group_id not in my_stocks:
                    continue
            if wpq.product.name in warehouse_product_qty:
                warehouse_product_qty[wpq.product.name] = str(
                    int(warehouse_product_qty[wpq.product.name])
                    + int(wpq.product_quantity)
                )
            else:
                warehouse_product_qty[wpq.product.name] = str(wpq.product_quantity)

    log(
        log.DEBUG,
        "Product get_all warehouse_products finished in [%s]",
        datetime.now() - get_all_master_groups_search,
    )

    target_groups = db.session.scalars(m.Group.select())

    return {
        "query": query,
        "pagination": pagination,
        "is_events": is_events,
        "master_groups": master_groups,
        "product_groups": product_groups,
        "current_user_groups_rows": current_user_groups_rows,
        "mastr_for_prods_groups_for_prods": mastr_for_prods_groups_for_prods,
        "master_groups_list": master_groups_list,
        "q": q,
        "is_events_stocks_own_by_me": is_events_stocks_own_by_me,
        "is_stocks_own_by_me": is_stocks_own_by_me,
        "is_all_stocks_in_inventory": is_all_stocks_in_inventory,
        "master_groups_search": master_groups_search,
        "master_product_groups_name": master_group_product_name,
        "suppliers": [s for s in suppliers],
        "all_product_groups": {
            i.name: i for i in db.session.execute(m.Group.select()).scalars()
        },
        "current_user_groups_names": [i.parent.name for i in current_user_groups_rows],
        "mstr_prod_grps_prod_grps_names": json.dumps(mstr_prod_grps_prod_grps_names),
        "warehouse_product_qty": warehouse_product_qty,
        "target_groups": target_groups,
        # TODO remove when testing is done
        "datetime": datetime,
    }


@product_blueprint.route("/", methods=["GET"])
@login_required
def get_all():
    products_object = get_all_products(request)
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
        master_groups_list=products_object["master_groups_list"],
        is_all_stocks_in_inventory=products_object["is_all_stocks_in_inventory"],
        is_stocks_own_by_me=products_object["is_stocks_own_by_me"],
        is_events_stocks_own_by_me=products_object["is_events_stocks_own_by_me"],
        is_events=products_object["is_events"],
        main_master_groups=products_object["master_groups"],
        product_groups=products_object["product_groups"],
        all_product_groups=products_object["all_product_groups"],
        current_user_groups=products_object["current_user_groups_rows"],
        current_user_groups_names=products_object["current_user_groups_names"],
        master_groups_groups_available=products_object[
            "mastr_for_prods_groups_for_prods"
        ],
        master_groups_search=products_object["master_groups_search"],
        master_group_product_name=products_object["master_product_groups_name"],
        suppliers=products_object["suppliers"],
        mstr_prod_grps_prod_grps_names=products_object[
            "mstr_prod_grps_prod_grps_names"
        ],
        warehouse_product_qty=products_object["warehouse_product_qty"],
        target_groups=products_object["target_groups"],
        datetime=products_object["datetime"],
        form_create=form_create,
        form_edit=form_edit,
    )


@product_blueprint.route("/create", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def create():
    form: f.NewProductForm = f.NewProductForm()
    if form.validate_on_submit():
        query = m.Product.select().where(m.Product.name == form.name.data)
        gr: m.Product | None = db.session.scalar(query)
        if gr:
            flash("This product name is already taken.", "danger")
            return redirect(url_for("product.get_all"))

        supplier: m.Supplier = db.session.scalar(m.Supplier.select())

        low_image = request.files["low_image"]
        low_image_string = base64.b64encode(low_image.read()).decode()
        product: m.Product = m.Product(
            name=str(form.name.data).strip(" "),
            supplier_id=form.supplier.data if form.supplier.data else supplier.id,
            currency=form.currency.data if form.currency.data else "CAD",
            regular_price=form.regular_price.data if form.regular_price.data else 0,
            retail_price=form.retail_price.data if form.retail_price.data else 0,
            image=low_image_string,
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
        product.save(False)

        if "image" in request.files["high_image"].mimetype:
            file_image = save_image(
                request.files["high_image"], f"product/{form.SKU.data}"
            )
            if isinstance(file_image, str):
                if "Cannot guess file type!" in file_image:
                    flash("Product added! Cannot guess image file type!", "danger")
                elif "Unsupported file type!" in file_image:
                    flash("Product added! Unsupported image file type!", "danger")
            else:
                flash("Product added!", "success")
                file_image.save(False)
                product.image_obj = file_image
        db.session.commit()

        product_master_groups_ids = json.loads(form.product_groups.data)

        for group_id in product_master_groups_ids:
            product_group = m.ProductGroup(product_id=product.id, group_id=group_id)
            product_group.save(False)
        db.session.commit()

        return redirect(url_for("product.get_all"))
    else:
        log(log.ERROR, "Product creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


@product_blueprint.route("/edit", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def save():
    form: f.ProductForm = f.ProductForm()
    if form.validate_on_submit():
        query = m.Product.select().where(m.Product.id == int(form.product_id.data))
        u: m.Product = db.session.scalar(query)
        if not u:
            log(log.ERROR, "Not found product by id : [%s]", form.product_id.data)
            flash("Cannot save product data", "danger")

        supplier: m.Supplier = db.session.scalar(m.Supplier.select())

        image = request.files["low_image"]
        image_string = base64.b64encode(image.read()).decode()
        u.name = str(form.name.data).strip(" ")
        u.supplier_id = form.supplier.data if form.supplier.data else supplier.id
        u.currency = form.currency.data if form.currency.data else "CAD"
        u.regular_price = form.regular_price.data if form.regular_price.data else 0
        u.retail_price = form.retail_price.data if form.retail_price.data else 0

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
        u.notes_location = form.notes_location.data if form.notes_location.data else ""
        # shipping
        u.weight = form.weight.data if form.weight.data else 0
        u.length = form.length.data if form.length.data else 0
        u.width = form.width.data if form.width.data else 0
        u.height = form.height.data if form.height.data else 0

        if "image" in request.files["high_image"].mimetype:
            if u.image_obj:
                image_path, image_extension = save_image(
                    request.files["high_image"], f"product/{form.SKU.data}", u.image_obj
                )
                u.image_obj.path = image_path
                u.image_obj.extension = image_extension
            else:
                file_image = save_image(
                    request.files["high_image"], f"product/{form.SKU.data}"
                )
                if isinstance(file_image, str):
                    if "Cannot guess file type!" in file_image:
                        flash("Product edited! Cannot guess image file type!", "danger")
                    elif "Unsupported file type!" in file_image:
                        flash("Product edited! Unsupported image file type!", "danger")
                else:
                    flash("Product edited successfully", "success")
                    db.session.execute(
                        m.Image.delete().where(m.Image.name == file_image.name)
                    )
                    file_image.save(False)
                    u.image_obj = file_image
        u.save(False)
        db.session.commit()

        product_master_groups_ids = json.loads(form.product_groups.data)

        product_groups_obj = db.session.scalars(
            m.ProductGroup.select().where(
                m.ProductGroup.product_id == int(form.product_id.data)
            )
        ).all()
        product_groups_ids = [group_row.group_id for group_row in product_groups_obj]

        for group_row in product_groups_obj:
            if group_row.group_id in product_master_groups_ids:
                continue
            else:
                delete_gp = db.session.execute(
                    m.ProductGroup.select().where(
                        m.ProductGroup.product_id == int(form.product_id.data),
                        m.ProductGroup.group_id == group_row.group_id,
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

        if form.next_url.data:
            return redirect(form.next_url.data)
        return redirect(url_for("product.get_all"))

    else:
        log(log.ERROR, "product save errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


# TODO brainstorm
@product_blueprint.route("/delete/<int:id>", methods=["DELETE"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def delete(id: int):
    product: m.Product = db.session.get(m.Product, id)
    if not product:
        log(log.INFO, "There is no product with id: [%s]", id)
        flash("There is no such product", "danger")
        return "no product", 404
    db.session.execute(
        m.WarehouseProduct.delete().where(m.WarehouseProduct.product == product)
    )
    db.session.execute(m.Cart.delete().where(m.Cart.product == product))
    db.session.execute(
        m.ProductGroup.delete().where(m.ProductGroup.product_id == product.id)
    )
    db.session.execute(
        m.ProductQuantityGroup.delete().where(
            m.ProductAllocated.product_quantity_groups.any(
                m.ProductAllocated.product == product
            )
        )
    )
    db.session.execute(
        m.ProductAllocated.delete().where(m.ProductAllocated.product == product)
    )
    db.session.commit()
    db.session.delete(product)
    db.session.commit()
    log(log.INFO, "Product deleted. Product: [%s]", product)
    flash("Product deleted!", "success")
    return "ok", 200


@product_blueprint.route("/assign", methods=["POST"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.MANAGER.value,
    ]
)
def assign():
    form: f.AssignProductForm = f.AssignProductForm()
    if form.validate_on_submit():
        query = m.Product.select().where(m.Product.name == form.name.data)
        p: m.Product | None = db.session.scalar(query)
        if not p:
            log(log.ERROR, "Not found product by name : [%s]", form.name.data)
            flash("Cannot save product data", "danger")

        product_from_group: m.Group = db.session.scalar(
            m.Group.select().where(
                m.Group.name == form.from_group.data,
            )
        )
        product_to_group: m.Group = db.session.get(m.Group, int(form.group.data))

        if product_from_group.id == product_to_group.id:
            log(log.ERROR, "Cannot assign to same group", form.errors)
            flash(
                f"Cannot assign from {product_from_group.name} to {product_to_group.name}",
                "danger",
            )
            return redirect(url_for("product.get_all"))

        report_inventory_list = m.ReportInventoryList(
            type="Product Assigned",
            user_id=current_user.id,
        )
        report_inventory_list.save(False)

        # TODO sort also by warehouse_id
        product_warehouse: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == p.id,
                m.WarehouseProduct.group_id == product_from_group.id,
            )
        ).scalar()
        # NOTE create report for inventory
        report_inventory = m.ReportInventory(
            qty_before=product_warehouse.product_quantity,
            qty_after=product_warehouse.product_quantity - form.quantity.data,
            report_inventory_list_id=report_inventory_list.id,
            product_id=product_warehouse.product_id,
            warehouse_product=product_warehouse,
        )
        report_inventory.save(False)
        product_warehouse.product_quantity -= form.quantity.data
        product_warehouse.save(False)

        new_product_warehouse: m.WarehouseProduct = db.session.execute(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id == p.id,
                m.WarehouseProduct.group_id == int(form.group.data),
            )
        ).scalar()
        if new_product_warehouse:
            qty_before = new_product_warehouse.product_quantity
            new_product_warehouse.product_quantity += form.quantity.data
            new_product_warehouse.save(False)
        else:
            qty_before = 0
            new_product_warehouse = m.WarehouseProduct(
                product_id=p.id,
                group_id=int(form.group.data),
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
            product_id=p.id,
            group_id=int(form.group.data),
            quantity=form.quantity.data,
            from_group_id=form.from_group_id.data,
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
        warehouse_product = db.session.scalar(
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
            return redirect(url_for("product.get_all"))

        to_group: m.Group = db.session.get(m.Group, form.to_group_id.data)
        if not to_group:
            log(
                log.ERROR,
                "From to not found: [%s]",
                form.to_group_id.data,
            )
            flash("Cannot save product data", "danger")
            return redirect(url_for("product.get_all"))

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

        users: list[m.UserGroup] = db.session.scalars(
            m.UserGroup.select().where(m.UserGroup.right_id == to_group.id)
        ).all()

        if len(users) != 0:
            for u in users:
                # TODO: ask client about users notification without approval permission
                if not u.child.approval_permission:
                    continue
                msg = Message(
                    subject="New request share",
                    sender=app.config["MAIL_DEFAULT_SENDER"],
                    recipients=[u.child.email],
                )
                url = (
                    url_for(
                        "request_share.get_all",
                        _external=True,
                    )
                    + f"?q={request_share.order_numb}"
                )

                msg.html = render_template(
                    "email/request_share.html",
                    user=u.child,
                    request_share=request_share,
                    url=url,
                    action="created",
                )
                request_share_user = m.RequestShareUser(
                    user_id=u.child.id,
                    request_share=request_share,
                )
                db.session.add(request_share_user)
                # TODO uncomment when ready to notify
                # mail.send(msg)

        db.session.commit()

        flash("Share request created!", "success")
        return redirect(url_for("product.get_all"))

    else:
        log(log.ERROR, "product assign errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


@product_blueprint.route("/adjust", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value, s.UserRole.WAREHOUSE_MANAGER.value])
def adjust():
    form: f.AdjustProductForm = f.AdjustProductForm()

    if form.validate_on_submit():
        adjust_item: m.Adjust = m.Adjust(
            product_id=form.product_id.data,
            note=form.note.data,
            user_id=current_user.id,
        )
        db.session.add(adjust_item)
        is_adjust_products = False
        groups = json.loads(form.groups_quantity.data)
        product = db.session.get(m.Product, form.product_id.data)
        warehouse_event: m.Warehouse = db.session.scalar(
            m.Warehouse.select().where(
                m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value
            )
        )
        if not product:
            flash("Cannot save product data", "danger")
            log(log.ERROR, "Not found product by id : [%s]", form.product_id.data)
            return redirect(url_for("product.get_all"))

        report_inventory_list = m.ReportInventoryList(
            type="Products Adjusted",
            user_id=current_user.id,
        )
        report_inventory_list.save(False)

        for group_name, warehouses in groups.items():
            group_id = db.session.execute(
                m.Group.select()
                .where(m.Group.name == group_name)
                .with_only_columns(m.Group.id)
            ).scalar()
            for warehouse_id, quantity in warehouses.items():
                product_warehouse: m.WarehouseProduct = db.session.scalar(
                    m.WarehouseProduct.select().where(
                        m.WarehouseProduct.product_id == form.product_id.data,
                        m.WarehouseProduct.group_id == group_id,
                        m.WarehouseProduct.warehouse_id == warehouse_id,
                    )
                )
                if product_warehouse:
                    if (
                        group_name == s.MasterGroupMandatory.events.value
                        and warehouse_event.id != int(warehouse_id)
                    ):
                        continue
                    if product_warehouse.product_quantity != quantity:
                        adjust_gr_qty: m.AdjustGroupQty = m.AdjustGroupQty(
                            adjust_id=adjust_item.id,
                            quantity_after=quantity,
                            quantity_before=product_warehouse.product_quantity,
                            group_id=group_id,
                            warehouse_id=warehouse_id,
                            product_id=form.product_id.data,
                        )
                        db.session.add(adjust_gr_qty)

                        m.ReportInventory(
                            qty_before=product_warehouse.product_quantity,
                            qty_after=quantity,
                            report_inventory_list_id=report_inventory_list.id,
                            product_id=product_warehouse.product_id,
                            warehouse_product=product_warehouse,
                        ).save(False)

                        m.ReportSKU(
                            product_id=product_warehouse.product_id,
                            adjustment=adjust_gr_qty,
                            type=s.ReportSKUType.adjustment.value,
                            status="Adjusted quantity",
                            qty_after=quantity,
                            qty_before=product_warehouse.product_quantity,
                            warehouse_product=product_warehouse,
                        ).save(False)

                        is_adjust_products = True

                    product_warehouse.product_quantity = quantity
                    db.session.add(product_warehouse)
                else:
                    product_warehouse = m.WarehouseProduct(
                        product_id=form.product_id.data,
                        group_id=group_id,
                        product_quantity=quantity,
                        warehouse_id=warehouse_id,
                    )
                    db.session.add(product_warehouse)

                    m.ReportInventory(
                        qty_before=0,
                        qty_after=product_warehouse.product_quantity,
                        report_inventory_list_id=report_inventory_list.id,
                        product_id=product_warehouse.product_id,
                        warehouse_product=product_warehouse,
                    ).save(False)

                    adjust_gr_qty: m.AdjustGroupQty = m.AdjustGroupQty(
                        adjust_id=adjust_item.id,
                        quantity_after=quantity,
                        quantity_before=0,
                        group_id=group_id,
                        warehouse_id=warehouse_id,
                        product_id=form.product_id.data,
                    )
                    db.session.add(adjust_gr_qty)

                    m.ReportSKU(
                        product_id=product_warehouse.product_id,
                        adjustment=adjust_gr_qty,
                        type=s.ReportSKUType.adjustment.value,
                        status="Adjusted quantity",
                        qty_after=quantity,
                        qty_before=0,
                        warehouse_product=product_warehouse,
                    ).save(False)

        if not is_adjust_products:
            db.session.delete(adjust_item)
            log(log.INFO, "Nothing to adjust: [%s]", form.product_id.data)
            flash("Nothing to adjust", "danger")
            return redirect(url_for("product.get_all"))

        db.session.commit()

        log(
            log.INFO,
            "Adjust products: [%s][%s",
            form.product_id.data,
            form.groups_quantity.data,
        )
        flash(f"Product {product.name} was adjusted", "success")
        return redirect(url_for("product.get_all"))

    log(log.ERROR, "Adjust item save errors: [%s]", form.errors)
    flash(f"{form.errors}", "danger")
    return redirect(url_for("outgoing_stock.get_all"))


@product_blueprint.route("/upload", methods=["POST"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def upload():
    form: f.UploadProductForm = f.UploadProductForm()
    if form.validate_on_submit():
        master_product_groups = ["Language", "Categories", "Brand"]
        csv_file = request.files["upload_csv"]
        file_io = BytesIO(csv_file.read())

        conn = db.get_engine()

        df_img = pandas.read_csv(
            Path("app") / "static" / "img" / "item_image.csv",
            usecols=[
                "SKU",
                "Image",
            ],
        )

        new_groups = []

        # NOTE write master groups and stock groups to DB
        for table_name in master_product_groups:
            master_group_obj = db.session.execute(
                m.MasterGroupProduct.select().where(
                    m.MasterGroupProduct.name == table_name
                )
            ).scalar()

            if not master_group_obj:
                master_group_obj = m.MasterGroupProduct(name=table_name)
                master_group_obj.save()

            df = pandas.read_csv(file_io, usecols=[table_name])
            file_io.seek(0)
            df = df.drop_duplicates().dropna()
            df["master_group_id"] = master_group_obj.id
            df["created_at"] = datetime.now()

            new_groups.extend(df[table_name].to_list())

            do_nothing_conflict_name = DoNothingConflict(["name"])

            df.rename(
                columns=dict(zip(df.columns, ["name", "master_group_id", "created_at"]))
            ).to_sql(
                "groups_for_product",
                con=conn,
                if_exists="append",
                index=False,
                method=do_nothing_conflict_name.insert_do_nothing_on_conflicts,
            )

        # NOTE write products to DB
        columns_to_use = [
            "Name",
            "Description",
            "SKU",
            "Regular Price",
            "Retail Price",
        ]

        if form.target_group_upload.data:
            columns_to_use.append("Available Quantity")

        renamed_columns_to_use = [
            i.lower().replace(" ", "_") for i in columns_to_use if i != "SKU"
        ]

        df = pandas.read_csv(
            file_io,
            usecols=columns_to_use,
        )
        file_io.seek(0)
        df = df.drop_duplicates()
        df["Description"] = df["Description"].fillna("")
        df["SKU"] = df["SKU"].fillna("")
        df["Regular Price"] = df["Regular Price"].fillna(0)
        df["Retail Price"] = df["Retail Price"].fillna(0)

        df = pandas.merge(df, df_img, on="SKU", how="inner")
        df["Image"] = df["Image"].fillna("logo-mini.png")
        logo_mini = db.session.scalar(
            m.Image.select().where(m.Image.name == "logo-mini")
        )
        img_name_img_obj = {"logo-mini.png": logo_mini}
        for image_name in df["Image"]:
            try:
                if not isinstance(image_name, str):
                    raise FileNotFoundError
                original_image = Image.open(
                    Path("app") / "static" / "img" / "product" / image_name
                ).resize((200, 200))
            except FileNotFoundError:
                original_image = Image.open(
                    Path("app") / "static" / "img" / "logo-mini.png"
                ).resize((200, 200))
            with BytesIO() as png_bytes:
                if original_image.mode in ["CMYK"]:
                    continue
                original_image.save(png_bytes, format="PNG")
                png_bytes.seek(0)
                img_bytes = base64.b64encode(png_bytes.read()).decode()
                image_exists = db.session.scalar(
                    m.Image.select().where(m.Image.name == image_name.split(".")[0])
                )
                if not image_exists:
                    img_obj = m.Image(
                        name=image_name.split(".")[0],
                        path=f"product/{image_name}",
                        extension=image_name.split(".")[-1],
                    )
                    img_obj.save(False)
                    img_name_img_obj[image_name] = img_obj

            df["Image"] = df["Image"].replace(image_name, img_bytes)

        db.session.commit()

        df[columns_to_use].rename(
            columns=dict(
                zip(
                    df.columns,
                    [
                        "name",
                        "description",
                        "SKU",
                        "regular_price",
                        "retail_price",
                        "image",
                    ],
                )
            )
        ).to_sql(
            "products",
            con=conn,
            if_exists="append",
            index=False,
            method=do_nothing_conflict_name.insert_do_nothing_on_conflicts,
        )

        # NOTE write product-groups relations to DB
        new_products_obj: list[m.Product] = db.session.scalars(
            m.Product.select().where(m.Product.name.in_(df["Name"].to_list()))
        ).all()

        new_groups_obj: list[m.GroupProduct] = db.session.scalars(
            m.GroupProduct.select().where(m.GroupProduct.name.in_(new_groups))
        ).all()

        warehouse_products: list[m.WarehouseProduct] = db.session.scalars(
            m.WarehouseProduct.select().where(
                m.WarehouseProduct.product_id.in_(
                    [prod.id for prod in new_products_obj]
                )
            )
        )
        # NOTE until we do not select warehouse in form,
        # warehouse_product could rewrite each other if product_id is the same
        product_warehouse_product = {
            warehouse_product.product.SKU: warehouse_product
            for warehouse_product in warehouse_products
        }
        # TODO consider which warehouse to use as default
        default_warehouse: m.Warehouse = db.session.scalar(m.Warehouse.select())

        product_group_df = pandas.read_csv(
            file_io,
            usecols=[
                "Name",
                "Language",
                "Brand",
                "Categories",
            ],
        )

        df_img["Image"] = df_img["Image"].fillna("logo-mini.png")
        for product in new_products_obj:
            product_group_df.loc[
                product_group_df["Name"] == product.name, "Name"
            ] = product.id
            try:
                product.image_id = img_name_img_obj[
                    df_img.loc[df_img["SKU"] == product.SKU, "Image"].values[0]
                ].id
                product.save(False)
            except KeyError:
                log(
                    log.ERROR,
                    "Image [%s] not found for product: [%s]",
                    df_img.loc[df_img["SKU"] == product.SKU, "Image"].values[0],
                    product.name,
                )

            if form.target_group_upload.data:
                available_quantity = (
                    int(
                        df.loc[df["SKU"] == product.SKU, "Available Quantity"].values[0]
                    )
                    if str(
                        df.loc[df["SKU"] == product.SKU, "Available Quantity"].values[0]
                    ).isdigit()
                    else 0
                )
                if product.SKU in product_warehouse_product:
                    warehouse_product = product_warehouse_product[product.SKU]
                    warehouse_product.product_quantity += available_quantity
                    warehouse_product.save(False)
                else:
                    m.WarehouseProduct(
                        product_id=product.id,
                        group_id=form.target_group_upload.data,
                        product_quantity=available_quantity,
                        warehouse_id=default_warehouse.id,
                    ).save(False)

        db.session.commit()

        for mastr_grp in master_product_groups:
            for group in new_groups_obj:
                product_group_df.loc[
                    product_group_df[mastr_grp] == group.name, mastr_grp
                ] = group.id

        for table_name in master_product_groups:
            write_df = product_group_df[["Name", table_name]]
            file_io.seek(0)
            write_df = write_df.dropna()

            write_df[
                pandas.to_numeric(write_df["Name"], errors="coerce").notnull()
            ].rename(
                columns=dict(zip(write_df.columns, ["product_id", "group_id"]))
            ).to_sql(
                "product_group",
                con=conn,
                if_exists="append",
                index=False,
                method=DoNothingConflict(None).insert_do_nothing_on_conflicts,
            )

        flash("Product added!", "success")
        return redirect(url_for("product.get_all"))
    else:
        log(log.ERROR, "Product creation errors: [%s]", form.errors)
        flash(f"{form.errors}", "danger")
        return redirect(url_for("product.get_all"))


class DoNothingConflict:
    def __init__(self, unique_constraint: list[str]):
        self.unique_constraint = unique_constraint

    def insert_do_nothing_on_conflicts(self, sqltable, conn, keys, data_iter):
        """
        Execute SQL statement inserting data

        Parameters
        ----------
        sqltable : pandas.io.sql.SQLTable
        conn : sqlalchemy.engine.Engine or sqlalchemy.engine.Connection
        keys : list of str
            Column names
        data_iter : Iterable that iterates the values to be inserted
        """
        columns = []
        for c in keys:
            columns.append(sa.column(c))

        if sqltable.schema:
            table_name = "{}.{}".format(sqltable.schema, sqltable.name)
        else:
            table_name = sqltable.name

        mytable = sa.table(table_name, *columns)

        insert_stmt = insert(mytable).values(list(data_iter))
        # NOTE index_elements=["unique_code"] --- meaning unique constraint
        do_nothing_stmt = insert_stmt.on_conflict_do_nothing(
            index_elements=self.unique_constraint
        )

        conn.execute(do_nothing_stmt)


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
    product: m.Product = db.session.execute(
        m.Product.select().where(m.Product.id == id)
    ).scalar()

    original_image = Image.open(
        Path("app")
        / "static"
        / "img"
        / "product"
        / f"{product.image_obj.name}.{product.image_obj.extension}"
    )
    with BytesIO() as png_bytes:
        original_image.save(png_bytes, format="PNG")
        png_bytes.seek(0)
        img_bytes = base64.b64encode(png_bytes.read()).decode()

    data = {
        "name": product.name,
        "image": img_bytes,
    }
    return jsonify(data)


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
    ).model_dump_json()
