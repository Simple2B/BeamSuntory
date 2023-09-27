from datetime import datetime
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


report_adjustment_blueprint = Blueprint(
    "report_adjustment", __name__, url_prefix="/report_adjustment"
)


def get_adjustment_report():
    filter_adjustments = s.FilterReportAdjustments.model_validate(dict(request.args))
    query = m.Adjust.select().order_by(m.Adjust.id)

    count_query = sa.select(sa.func.count()).select_from(m.Adjust)

    if filter_adjustments.q:
        query = query.where(
            m.Adjust.product.has(m.Product.name.ilike(f"%{filter_adjustments.q}%"))
            | m.Adjust.product.has(m.Product.SKU.ilike(f"%{filter_adjustments.q}%"))
            | m.Adjust.user.has(m.User.username.ilike(f"%{filter_adjustments.q}%"))
        )

        count_query = count_query.where(
            m.ReportEvent.ship_request.has(
                m.ShipRequest.carts.any(
                    m.Cart.event.has(
                        m.Event.product.has(
                            m.Product.name.ilike(f"%{filter_adjustments.q}%")
                        )
                    )
                )
            )
        )

    if filter_adjustments.created_from:
        query = query.where(
            m.Adjust.created_at
            >= datetime.strptime(filter_adjustments.created_from, "%m/%d/%Y")
        )

    if filter_adjustments.created_to:
        query = query.where(
            m.Adjust.created_at
            <= datetime.strptime(filter_adjustments.created_to, "%m/%d/%Y")
        )

    if filter_adjustments.username:
        query = query.where(
            m.Adjust.user.has(m.User.username == filter_adjustments.username)
        )

    if filter_adjustments.master_group:
        query = query.where(
            m.Adjust.adjust_group_qty.any(
                m.AdjustGroupQty.group.has(
                    m.Group.master_group.has(
                        m.MasterGroup.name.ilike(f"%{filter_adjustments.master_group}%")
                    )
                )
            )
        )

    if filter_adjustments.group:
        query = query.where(
            m.Adjust.adjust_group_qty.any(
                m.AdjustGroupQty.group.has(
                    m.Group.name.ilike(f"%{filter_adjustments.group}%")
                )
            )
        )

    master_groups = [
        filter_adjustments.group_brand,
        filter_adjustments.group_language,
        filter_adjustments.group_category,
        filter_adjustments.group_premises,
        filter_adjustments.group_event,
    ]

    if master_groups.count(None) != len(master_groups):
        for group in master_groups:
            if group:
                query = query.where(
                    m.Adjust.adjust_group_qty.any(
                        m.AdjustGroupQty.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
                    )
                )
                count_query = count_query.where(
                    m.Adjust.adjust_group_qty.any(
                        m.AdjustGroupQty.product.has(
                            m.Product.product_groups.any(
                                m.ProductGroup.parent.has(m.GroupProduct.name == group)
                            )
                        )
                    )
                )

    pagination = create_pagination(total=db.session.scalar(count_query))

    reports = db.session.scalars(
        query.offset((pagination.page - 1) * pagination.per_page).limit(
            pagination.per_page
        )
    )
    return pagination, reports


@report_adjustment_blueprint.route("/adjustment/api", methods=["GET"])
@login_required
def get_adjustments_json():
    pagination, reports = get_adjustment_report()
    report_list_schema = s.AdjustList.model_validate(reports)

    return s.AdjustResponse(
        pagination=pagination, adjusts=report_list_schema.root
    ).model_dump_json(by_alias=True)


@report_adjustment_blueprint.route("/adjustment", methods=["GET"])
@login_required
def adjustments():
    users = db.session.scalars(sa.select(m.User))
    product_master_groups = db.session.scalars(
        m.MasterGroupProduct.select().where(
            m.MasterGroupProduct.name.in_(
                ["Brand", "Language", "Category", "Premises", "Events"]
            )
        )
    )
    master_groups = db.session.scalars(m.MasterGroup.select())
    groups = db.session.scalars(m.Group.select())

    return render_template(
        "report/adjustment/adjustments.html",
        users=users,
        product_master_groups=product_master_groups,
        master_groups=master_groups,
        groups=groups,
    )


@report_adjustment_blueprint.route("adjustment/search")
@login_required
def search_report_adjustments():
    pagination, reports = get_adjustment_report()

    return render_template(
        "report/adjustment/reports_table.html", page=pagination, reports=reports
    )
