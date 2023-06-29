from flask import render_template, Blueprint
from flask_login import login_required

from sqlalchemy import select

from app.models import MasterGroup
from app import db


main_blueprint = Blueprint("main", __name__)


@main_blueprint.route("/")
@login_required
def index():
    # TODO think out better way of giving master_groups_rows to sidebar.html
    master_groups_rows = db.session.execute(select(MasterGroup)).all()
    return render_template(
        "index.html", main_master_groups=[i[0] for i in master_groups_rows]
    )
