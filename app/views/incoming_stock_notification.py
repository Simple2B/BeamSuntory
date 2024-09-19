import json
from datetime import datetime

from flask import (
    Blueprint,
    render_template,
    request,
    flash,
    redirect,
    url_for,
)

from flask_login import login_required, current_user
import sqlalchemy as sa
from sqlalchemy import desc
from pydantic import ValidationError

from app.controllers import create_pagination, role_required

from app import models as m, db
from app import schema as s
from app import forms as f
from app.logger import log


incoming_stock_notifications_bp = Blueprint(
    "incoming_stock_notifications", __name__, url_prefix="/incoming_stock_notifications"
)


@incoming_stock_notifications_bp.route("/", methods=["GET"])
@login_required
# @role_required(
# )
def get_all():

    pagination = create_pagination(total=0)

    return render_template(
        "incoming_stock_notification/incoming_stock_notifications.html", page=pagination
    )
