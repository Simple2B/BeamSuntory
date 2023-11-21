from datetime import datetime
from flask import (
    Blueprint,
    request,
    render_template,
    jsonify,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db
from app import controllers as c

report_blueprint = Blueprint(
    "report",
    __name__,
    url_prefix="/report",
)


def get_request_share_report():
    # Clear args from empty values
    filter_args = {field: value for field, value in dict(request.args).items() if value}
    filter_events = s.FilterRequestShare.model_validate(filter_args)
    query = m.ReportRequestShare.select().order_by(m.ReportRequestShare.id)

    count_query = sa.select(sa.func.count()).select_from(m.ReportRequestShare)

    if filter_events.q:
        where_stmt = (
            m.ReportRequestShare.request_share.has(
                m.RequestShare.product.has(m.Product.name.ilike(f"%{filter_events.q}%"))
            )
            | m.ReportRequestShare.user.has(
                m.User.username.ilike(f"%{filter_events.q}%")
            )
            | m.ReportRequestShare.request_share.has(
                m.RequestShare.product.has(m.Product.SKU.ilike(f"%{filter_events.q}%"))
            )
        )

        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter_events.created_from:
        where_stmt = m.ReportRequestShare.created_at >= datetime.strptime(
            filter_events.created_from, "%m/%d/%Y"
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter_events.created_to:
        where_stmt = m.ReportRequestShare.created_at <= datetime.strptime(
            filter_events.created_to, "%m/%d/%Y"
        )
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    if filter_events.report_type:
        where_stmt = m.ReportRequestShare.type == filter_events.report_type.value
        query = query.where(where_stmt)
        count_query = count_query.where(where_stmt)

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_blueprint.route("/", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def index():
    brands = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Brand")
        .order_by(m.MasterGroupProduct.id)
    ).all()

    for brand in brands:
        brand.groups_for_product.sort(key=lambda x: x.name)

    categories = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Categories")
        .order_by(m.MasterGroupProduct.id)
    ).all()

    for category in categories:
        category.groups_for_product.sort(key=lambda x: x.name)

    premises = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Premises")
        .order_by(m.MasterGroupProduct.id)
    ).all()

    users = db.session.scalars(sa.select(m.User))
    divisions = db.session.scalars(m.Division.select())
    master_groups = db.session.scalars(
        m.MasterGroup.select().order_by(m.MasterGroup.name)
    )
    groups = db.session.scalars(m.Group.select().order_by(m.Group.name))
    product_master_groups = db.session.scalars(
        m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.name.in_(
                ["Brand", "Language", "Categories", "Premises", "Events"]
            )
        )
    )

    product_master_groups = list(product_master_groups)

    for master_group_product in product_master_groups:
        master_group_product.groups_for_product.sort(key=lambda x: x.name)

    return render_template(
        "report/index.html",
        report_types=s.ReportRequestShareActionType,
        master_groups_brand=brands,
        master_group_category=categories,
        product_premises=premises,
        users=users,
        master_groups=master_groups,
        groups=groups.all(),
        product_master_groups=product_master_groups,
        report_request_share_action_types=s.ReportRequestShareActionType,
        report_shipping_action_types=s.ReportShipRequestActionType,
        divisions=divisions,
    )


@report_blueprint.route("/api", methods=["GET"])
@login_required
@role_required([s.UserRole.ADMIN.value])
def report_json():
    return jsonify(c.get_reports())


@report_blueprint.route("search")
@login_required
@role_required([s.UserRole.ADMIN.value])
def search():
    return c.get_reports(render=True)
