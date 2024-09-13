from flask import (
    Blueprint,
    Response,
    request,
    render_template,
    jsonify,
)
from flask_login import login_required
import sqlalchemy as sa
from app.controllers import role_required

from app import schema as s
from app import models as m, db
from app import controllers as c

report_blueprint = Blueprint(
    "report",
    __name__,
    url_prefix="/report",
)


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


@report_blueprint.route("/download_htmx", methods=["GET"])
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
def download_htmx():
    """
    When the user clicks the download button, the browser will send a GET request to /report/download_htmx.
    We can't use htmx to download a file directly,
    so we need to redirect the user to /report/download with the query string parameters.
    """
    response = Response()
    query_string = "&".join(
        [f"{key}={value}" for key, value in request.args.to_dict().items()]
    )
    download_url = "/report/download?" + query_string
    response.headers["HX-Redirect"] = download_url
    return response


@report_blueprint.route("/download", methods=["GET"])
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
def download():
    return c.get_reports(download=True)


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
