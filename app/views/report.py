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
def index():
    brands = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Brand")
        .order_by(m.MasterGroupProduct.name.asc())
    ).all()

    categories = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Categories")
        .order_by(m.MasterGroupProduct.name.asc())
    ).all()

    premises = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Premises")
        .order_by(m.MasterGroupProduct.name.asc())
    ).all()

    users = db.session.scalars(sa.select(m.User).order_by(m.User.username.asc()))
    divisions = db.session.scalars(
        sa.select(m.Division).order_by(
            m.Division.label_role_name.asc(), m.Division.role_name.asc()
        )
    )
    master_groups = db.session.scalars(
        sa.select(m.MasterGroup).order_by(m.MasterGroup.name.asc())
    )
    product_master_groups = db.session.scalars(
        m.MasterGroupProduct.select()
        .where(
            m.MasterGroupProduct.name.in_(
                ["Brand", "Language", "Categories", "Premises", "Events"]
            )
        )
        .order_by(m.MasterGroupProduct.name.asc())
    )

    product_master_groups = list(product_master_groups)

    groups = db.session.scalars(sa.select(m.Group).order_by(m.Group.name.asc())).all()

    return render_template(
        "report/index.html",
        report_types=s.ReportRequestShareActionType,
        master_groups_brand=brands,
        master_group_category=categories,
        product_premises=premises,
        users=users,
        master_groups=master_groups,
        groups=groups,
        product_master_groups=product_master_groups,
        report_request_share_action_types=s.ReportRequestShareActionType,
        report_shipping_action_types=s.ReportShipRequestActionType,
        divisions=divisions,
    )


@report_blueprint.route("/api", methods=["GET"])
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
def report_json():
    return jsonify(c.get_reports())


@report_blueprint.route("search")
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
def search():
    return c.get_reports(render=True)


@report_blueprint.route("group-oprions")
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
def group_oprions():
    master_group_name = request.args.get("master_group", default="")
    query = sa.select(m.Group).order_by(m.Group.name.asc())
    if master_group_name:
        query = query.where(
            m.Group.master_group.has(m.MasterGroup.name == master_group_name),
            m.Group.parent_group_id.is_(None),
        )

    groups = db.session.scalars(query).all()
    return render_template("report/group_options.html", groups=groups)
