from datetime import datetime
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


report_shipping_blueprint = Blueprint(
    "report_shipping",
    __name__,
    url_prefix="/report_shipping",
)


def get_shipping_report():
    # Clear args from empty values
    filter_args = {field: value for field, value in dict(request.args).items() if value}
    filter = s.FilterReportShipping.model_validate(filter_args)
    query = m.ReportShipping.select().order_by(m.ReportShipping.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportShipping)

    if filter.q:
        where_stmt = m.ReportShipping.ship_request.has(
            m.ShipRequest.store.has(m.Store.store_name.ilike(f"%{filter.q}%"))
        ) | m.ReportShipping.user.has(m.User.username.ilike(f"%{filter.q}%"))

        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter.division:
        where_stmt = m.ReportShipping.user.has(
            m.User.role == filter.division,
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter.created_from:
        where_stmt = m.ReportShipping.created_at >= datetime.strptime(
            filter.created_from, "%m/%d/%Y"
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter.created_to:
        where_stmt = m.ReportShipping.created_at <= datetime.strptime(
            filter.created_to, "%m/%d/%Y"
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter.report_type:
        where_stmt = m.ReportShipping.type == filter.report_type.value
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter.target_group:
        where_stmt = m.ReportShipping.ship_request.has(
            m.ShipRequest.carts.any(m.Cart.group == filter.target_group)
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    for group_id in (
        filter.brand,
        filter.language,
        filter.categories,
        filter.premise,
    ):
        if group_id:
            where_stmt = m.ReportShipping.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.product.has(
                        m.Product.product_groups.any(
                            m.ProductGroup.group_id == group_id
                        )
                    )
                )
            )
            query = query.where(where_stmt)
            count_query = count_query.where(where_stmt)

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_shipping_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def index():
    divisions = db.session.scalars(m.Division.select())
    target_groups = db.session.scalars(m.Group.select())

    languages = db.session.scalars(
        m.GroupProduct.select().where(
            m.GroupProduct.master_groups_for_product.has(
                m.MasterGroupProduct.name == "Language"
            )
        )
    )

    brands = db.session.scalars(
        m.GroupProduct.select().where(
            m.GroupProduct.master_groups_for_product.has(
                m.MasterGroupProduct.name == "Brand"
            )
        )
    )

    categories = db.session.scalars(
        m.GroupProduct.select().where(
            m.GroupProduct.master_groups_for_product.has(
                m.MasterGroupProduct.name == "Categories"
            )
        )
    )

    premises = db.session.scalars(
        m.GroupProduct.select().where(
            m.GroupProduct.master_groups_for_product.has(
                m.MasterGroupProduct.name == "Premises"
            )
        )
    )

    return render_template(
        "report/shipping/index.html",
        report_types=s.ReportShipRequestActionType,
        divisions=divisions,
        target_groups=target_groups,
        languages=languages,
        brands=brands,
        categories=categories,
        premises=premises,
    )
