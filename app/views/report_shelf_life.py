from datetime import datetime, timedelta
from flask import (
    Blueprint,
    request,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db


report_shelf_life_blueprint = Blueprint(
    "report_shelf_life", __name__, url_prefix="/report_shelf_life"
)


def get_shelf_life_reports():
    filter_shelf_lifes = s.FilterReportInventories.model_validate(dict(request.args))
    query = m.ProductAllocated.select().order_by(m.ProductAllocated.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportSKU)

    if filter_shelf_lifes.q:
        query = query.where(
            m.ProductAllocated.shelf_life_start.ilike(f"%{filter_shelf_lifes.q}%")
            | m.ProductAllocated.shelf_life_end.ilike(f"%{filter_shelf_lifes.q}%")
            # | m.ProductAllocated.user.has(m.User.username.ilike(f"%{filter_shelf_lifes.q}%"))
            | m.ProductAllocated.product.has(
                m.Product.name.ilike(f"%{filter_shelf_lifes.q}%")
            )
            | m.ProductAllocated.product.has(
                m.Product.SKU.ilike(f"%{filter_shelf_lifes.q}%")
            )
        )

        count_query = count_query.where(
            m.ProductAllocated.shelf_life_start.ilike(f"%{filter_shelf_lifes.q}%")
            | m.ProductAllocated.shelf_life_end.ilike(f"%{filter_shelf_lifes.q}%")
            # | m.ProductAllocated.user.has(m.User.username.ilike(f"%{filter_shelf_lifes.q}%"))
            | m.ProductAllocated.product.has(
                m.Product.name.ilike(f"%{filter_shelf_lifes.q}%")
            )
            | m.ProductAllocated.product.has(
                m.Product.SKU.ilike(f"%{filter_shelf_lifes.q}%")
            )
        )

    if filter_shelf_lifes.created_from:
        query = query.where(
            m.ProductAllocated.shelf_life_start
            >= datetime.strptime(filter_shelf_lifes.created_from, "%m/%d/%Y")
        )

    if filter_shelf_lifes.created_to:
        query = query.where(
            m.ProductAllocated.shelf_life_end
            <= datetime.strptime(filter_shelf_lifes.created_to, "%m/%d/%Y")
        )

    if filter_shelf_lifes.expire_in:
        query = query.where(
            m.ProductAllocated.shelf_life_end
            <= datetime.now() + timedelta(days=int(filter_shelf_lifes.expire_in))
        )

    if filter_shelf_lifes.master_group:
        mg_product_ids = db.session.scalars(
            m.WarehouseProduct.select()
            .with_only_columns(m.WarehouseProduct.product_id)
            .where(
                m.WarehouseProduct.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name == filter_shelf_lifes.master_group
                    )
                )
            )
        ).all()

        query = query.where(m.ProductAllocated.product_id.in_(mg_product_ids))

    if filter_shelf_lifes.group:
        product_ids = db.session.scalars(
            m.WarehouseProduct.select()
            .with_only_columns(m.WarehouseProduct.product_id)
            .where(
                m.WarehouseProduct.group.has(m.Group.name == filter_shelf_lifes.group)
            )
        ).all()

        query = query.where(m.ProductAllocated.product_id.in_(product_ids))

    master_groups = [
        filter_shelf_lifes.group_brand,
        filter_shelf_lifes.group_language,
        filter_shelf_lifes.group_categories,
        filter_shelf_lifes.group_premises,
    ]

    if master_groups.count(None) != len(master_groups):
        for group in master_groups:
            if group:
                query = query.where(
                    m.ProductAllocated.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(m.GroupProduct.name == group)
                        )
                    )
                )
                count_query = count_query.where(
                    m.ProductAllocated.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.parent.has(m.GroupProduct.name == group)
                        )
                    )
                )

    pagination = create_pagination(total=db.session.scalar(count_query))

    shelf_life_reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, shelf_life_reports


@report_shelf_life_blueprint.route("/shelf_life/api", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def get_shelf_lifes_json():
    pagination, shelf_life_reports = get_shelf_life_reports()
    report_list_schema = s.ReportShelfLifeList.model_validate(shelf_life_reports)

    return s.ReportShelfLifeResponse(
        pagination=pagination, report_shelf_life_list=report_list_schema.root
    ).model_dump_json(by_alias=True)


@report_shelf_life_blueprint.route("/shelf_life", methods=["GET"])
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def shelf_lifes():
    users = db.session.scalars(sa.select(m.User))

    # TODO maybe move default master product groups to config
    product_master_groups = db.session.scalars(
        m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.name.in_(
                ["Brand", "Language", "Categories", "Premises"]
            )
        )
    )
    master_groups = db.session.scalars(m.MasterGroup.select())
    groups = db.session.scalars(m.Group.select())

    return render_template(
        "report/shelf_life/shelf_lifes.html",
        users=users,
        master_groups=master_groups,
        groups=groups,
        product_master_groups=product_master_groups,
        report_types_enum=s.ReportSKUType,
    )


@report_shelf_life_blueprint.route("shelf_life/search")
@login_required
@role_required(
    [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.DELIVERY_AGENT.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ],
    has_approval_permission=True,
)
def search_shelf_life_reports():
    pagination, shelf_life_reports = get_shelf_life_reports()

    return render_template(
        "report/shelf_life/reports_table.html",
        page=pagination,
        shelf_life_reports=shelf_life_reports,
    )
