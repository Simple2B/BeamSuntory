import sqlalchemy as sa
from flask.testing import FlaskClient

from app import schema as s
from app import models as m, db


test_data = {
    "products_data": s.AdapterIncomingStockProducts.dump_json(
        [{"productId": 1, "quantity": 10}]
    ),
    "approx_arrival_date": "2022-01-01",
    "description": "test description",
}


def test_incoming_stocks_pages(mg_g_populate: FlaskClient):
    notify = db.session.scalars(sa.select(m.IncomingStockNotification)).first()
    assert notify
    res = mg_g_populate.get("/incoming-stock-notifications")
    assert res.status_code == 200
    assert notify.user.username in res.data.decode()
    assert notify.uuid in res.data.decode()


def test_create_incoming_stock_notify(mg_g_populate: FlaskClient):
    res = mg_g_populate.get("/incoming-stock-notifications/create")
    assert res.status_code == 200

    res = mg_g_populate.post(
        "/incoming-stock-notifications/create", data=test_data, follow_redirects=True
    )
    assert res.status_code == 200
    assert b"Created" in res.data

    res = mg_g_populate.post(
        "/incoming-stock-notifications/create",
        data={**test_data, "products_data": "dsadad"},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert b"Invalid data" in res.data

    res = mg_g_populate.post(
        "/incoming-stock-notifications/create",
        data={**test_data, "approx_arrival_date": "dsadad"},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert b"Invalid data" in res.data


def test_view_incoming_stock_notify(mg_g_populate: FlaskClient):
    notify = db.session.scalars(sa.select(m.IncomingStockNotification)).first()
    assert notify
    res = mg_g_populate.get(f"/incoming-stock-notifications/{notify.uuid}/view")
    assert res.status_code == 200
    for product in notify.products:
        assert product.product.name in res.data.decode()
        assert str(product.quantity) in res.data.decode()
    assert notify.user.username in res.data.decode()

    res = mg_g_populate.get("/incoming-stock-notifications/sadasfasfka/view")
    assert res.status_code == 200
    assert b"Not found" in res.data


def test_view_received(mg_g_populate: FlaskClient):
    notify = db.session.scalars(sa.select(m.IncomingStockNotification)).first()
    assert notify
    assert not notify.recived_date
    res = mg_g_populate.post(
        "/incoming-stock-notifications/received",
        data={"notify_uuid": notify.uuid},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert b"Received" in res.data
    assert notify.recived_date
    assert notify.status == s.IncomingStockNotificationStatus.RECEIVED.value

    res = mg_g_populate.post(
        "/incoming-stock-notifications/received",
        data={"notify_uuid": "dsadad"},
        follow_redirects=True,
    )
    assert res.status_code == 200
    assert b"Not found" in res.data
