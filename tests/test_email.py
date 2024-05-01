from flask.testing import FlaskClient

from app.database import db
from app import models as m

from app.celery import (
    notify_users_accept_inbount,
    notify_users_assign,
    notify_users_new_request_share,
)


def test_upload_product(mg_g_populate: FlaskClient):

    db.session.add(m.Group(name="Admin", master_group_id=1))
    db.session.commit()

    notify_users_accept_inbount(1, "testing", "http://localhost:5000")
    notify_users_assign(1, "testing", "http://localhost:5000")
    notify_users_new_request_share(1, "testing", "http://localhost:5000")
    assert True
