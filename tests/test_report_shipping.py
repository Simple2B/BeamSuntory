import sqlalchemy as sa

from flask.testing import FlaskClient
from http import HTTPStatus

from app.database import db
from app import models as m

from tests.utils import login


def test_report_shipping(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    store = db.session.scalar(m.Store.select())
    assert store
    store_category = db.session.scalar(m.StoreCategory.select())
    assert store_category
    db.session.query(m.Cart).filter(m.Cart != 1, m.Cart != 2).delete()

    ship_request_before_count = db.session.scalar(sa.func.count(m.ShipRequest.id))

    response = mg_g_populate.post(
        "/ship_request/create",
        data=dict(
            store=store.id,
            store_category=store_category.id,
            order_type="store_delivery",
            comment="test_ship_request",
            event_comment="test_event_comment",
        ),
        follow_redirects=True,
    )

    ship_request_after_count = db.session.scalar(sa.func.count(m.ShipRequest.id))
    assert response.status_code == HTTPStatus.OK
    assert ship_request_after_count == ship_request_before_count + 1

    # Check for report created in db
    assert db.session.scalar(sa.func.count(m.ReportShipping.id)) == 1
