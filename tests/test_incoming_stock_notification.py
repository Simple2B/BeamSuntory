import sqlalchemy as sa
from flask.testing import FlaskClient

from app import schema as s
from app import models as m, db
from tests.utils import login


def test_incoming_stocks_pages(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    notify = db.session.scalars(sa.select(m.IncomingStockNotification)).first()
    assert notify
    res = mg_g_populate.get("/incoming-stock-notifications/")
    assert res.status_code == 200
    assert notify.user.username in res.data.decode()
    assert notify.uuid in res.data.decode()


def test_create_incoming_stock_notify(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    res = mg_g_populate.get("/incoming-stock-notifications/create")
    assert res.status_code == 200

    res = mg_g_populate.get("/incoming-stock-notifications/create")
    assert res.status_code == 200
    assert b"Add" in res.data

    product = db.session.scalar(sa.select(m.Product))
    assert product

    test_data = {
        "products_data": s.AdapterIncomingStockProducts.dump_json(
            [
                s.IncomingStockNotifyProduct(productInfo=product.SKU, quantity=10),
                s.IncomingStockNotifyProduct(productInfo="adada", quantity=10),
            ]  # type: ignore
        ),
        "approx_arrival_date": "2022-01-01",
        "description": "test description",
    }

    res = mg_g_populate.post(
        "/incoming-stock-notifications/create", data=test_data, follow_redirects=True
    )
    assert res.status_code == 200
    assert b"Add" in res.data

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
    login(mg_g_populate)
    notify = db.session.scalars(sa.select(m.IncomingStockNotification)).first()
    assert notify
    res = mg_g_populate.get(f"/incoming-stock-notifications/{notify.uuid}/view")
    assert res.status_code == 200
    for product in notify.products:
        assert product.product_info in res.data.decode()
        assert str(product.quantity) in res.data.decode()
    assert notify.user.username in res.data.decode()

    res = mg_g_populate.get("/incoming-stock-notifications/sadasfasfka/view")
    assert res.status_code == 200
    assert b"Not found" in res.data


def test_view_and_received(mg_g_populate: FlaskClient):
    login(mg_g_populate, username="meng@mail.com", password="password")
    notify = db.session.scalars(sa.select(m.IncomingStockNotification)).first()
    assert notify

    res = mg_g_populate.get(f"/incoming-stock-notifications/{notify.uuid}/view")
    assert res.status_code == 200
    assert "View " in res.data.decode()

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
    assert b"Notification not found" in res.data
