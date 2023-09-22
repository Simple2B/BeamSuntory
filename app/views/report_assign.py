from flask import (
    Blueprint,
    request,
    render_template,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import create_pagination

from app import schema as s
from app import models as m, db


report_assign_blueprint = Blueprint(
    "report_assign", __name__, url_prefix="/report_assign"
)


def get_assigns_report():
    filter_assign = s.FilterReportAssign.model_validate(dict(request.args))

    query = m.Assign.select().order_by(m.Assign.id)
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

    if filter_assign.username:
        query = query.where(
            m.Assign.user.has(m.User.username == filter_assign.username)
        )

    if filter_assign.master_group:
        query = query.where(
            m.Assign.product.has(
                m.Product.product_groups.any(
                    m.ProductGroup.parent.has(
                        m.GroupProduct.name.ilike(f"%{filter_assign.master_group}%")
                    )
                )
            )
        )

    if filter_assign.start_date:
        print(filter_assign.start_date)
        query = query.where(m.Assign.created_at >= filter_assign.start_date)

    if filter_assign.end_date:
        query = query.where(m.Assign.created_at <= filter_assign.end_date)

    print(query)

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_assign_blueprint.route("/assign")
@login_required
def assigns():
    users = db.session.scalars(sa.select(m.User))

    product_master_groups = db.session.scalars(
        sa.select(m.MasterGroupProduct).order_by(m.MasterGroupProduct.id)
    ).all()

    return render_template(
        "report/assign/assigns.html",
        users=users,
        product_master_groups=product_master_groups,
    )


@report_assign_blueprint.route("assign/search")
@login_required
def search_report_assigns():
    pagination, reports = get_assigns_report()

    return render_template(
        "report/assign/reports_assign_table.html", page=pagination, reports=reports
    )
