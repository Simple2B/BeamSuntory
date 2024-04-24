from flask import (
    Blueprint,
    request,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from sqlalchemy import desc

from app.controllers import create_pagination, role_required

from app import schema as s
from app import models as m, db


report_assign_blueprint = Blueprint(
    "report_assign", __name__, url_prefix="/report_assign"
)


def get_assigns_report():
    filter_assign = s.FilterReportAssign.model_validate(dict(request.args))

    query = m.Assign.select().order_by(desc(m.Assign.id))
    count_query = sa.select(sa.func.count()).select_from(m.Assign)

    if filter_assign.q:
        query = query.where(
            m.Assign.product.has(m.Product.name.ilike(f"%{filter_assign.q}%"))
            | m.Assign.product.has(m.Product.SKU.ilike(f"%{filter_assign.q}%"))
            | m.Assign.user.has(m.User.username.ilike(f"%{filter_assign.q}%"))
        )
        count_query = count_query.where(
            m.Assign.product.has(m.Product.name.ilike(f"%{filter_assign.q}%"))
            | m.Assign.product.has(m.Product.SKU.ilike(f"%{filter_assign.q}%"))
            | m.Assign.user.has(m.User.username.ilike(f"%{filter_assign.q}%"))
        )
        count_query = count_query.where(
            m.Assign.product.has(m.Product.name.ilike(f"%{filter_assign.q}%"))
            | m.Assign.product.has(m.Product.SKU.ilike(f"%{filter_assign.q}%"))
            | m.Assign.user.has(m.User.username.ilike(f"%{filter_assign.q}%"))
        )

    if filter_assign.username:
        query = query.where(
            m.Assign.user.has(m.User.username == filter_assign.username)
        )
        count_query = count_query.where(
            m.Assign.user.has(m.User.username == filter_assign.username)
        )

    master_groups = [
        filter_assign.brand,
        filter_assign.categories,
        filter_assign.language,
        filter_assign.premises,
    ]

    if master_groups.count(None) != len(master_groups):
        for group in master_groups:
            query = query.where(
                m.Assign.product.has(
                    m.Product.product_groups.any(
                        m.ProductGroup.parent.has(
                            m.GroupProduct.name.ilike(f"%{group}%")
                        )
                    )
                )
            )
            count_query = count_query.where(
                m.Assign.product.has(
                    m.Product.product_groups.any(
                        m.ProductGroup.parent.has(
                            m.GroupProduct.name.ilike(f"%{group}%")
                        )
                    )
                )
            )

    if filter_assign.start_date:
        query = query.where(m.Assign.created_at >= filter_assign.start_date)
        count_query = count_query.where(m.Assign.created_at >= filter_assign.start_date)

    if filter_assign.end_date:
        query = query.where(m.Assign.created_at <= filter_assign.end_date)
        count_query = count_query.where(m.Assign.created_at <= filter_assign.end_date)

    if filter_assign.from_group:
        query = query.where(
            m.Assign.from_group.has(m.Group.name == filter_assign.from_group)
        )

        count_query = count_query.where(
            m.Assign.from_group.has(m.Group.name == filter_assign.from_group)
        )

    if filter_assign.to_group:
        query = query.where(
            m.Assign.group.has(m.Group.name.ilike(f"%{filter_assign.to_group}%"))
        )
        count_query = count_query.where(
            m.Assign.group.has(m.Group.name.ilike(f"%{filter_assign.to_group}%"))
        )

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_assign_blueprint.route("/assign")
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
def assigns():
    users = db.session.scalars(sa.select(m.User))

    product_master_group_brand = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Brand")
        .order_by(m.MasterGroupProduct.name.asc())
    ).all()

    product_master_group_language = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Language")
        .order_by(m.MasterGroupProduct.name.asc())
    ).all()

    product_master_group_categories = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Categories")
        .order_by(m.MasterGroupProduct.name.asc())
    ).all()

    product_master_group_premises = db.session.scalars(
        sa.select(m.MasterGroupProduct)
        .where(m.MasterGroupProduct.name == "Premises")
        .order_by(m.MasterGroupProduct.name.asc())
    ).all()

    product_groups = db.session.scalars(
        sa.select(m.Group).order_by(m.Group.name.asc())
    ).all()

    return render_template(
        "report/assign/assigns.html",
        users=users,
        product_master_group_brand=product_master_group_brand,
        product_master_group_language=product_master_group_language,
        product_master_group_categories=product_master_group_categories,
        product_master_group_premises=product_master_group_premises,
        product_groups=product_groups,
    )
