from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_outgoing_stocks_pages(client):
    logout(client)
    response = client.get("/outgoing_stock/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/outgoing_stock/")
    assert response.status_code == 200


def test_dispatch_outgoing_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_dispatch: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Waiting-for-warehouse-manager"
        )
    ).scalar()

    assert order_to_dispatch
    assert order_to_dispatch.status == "Waiting for warehouse manager"

    mg_g_populate.get(f"/outgoing_stock/dispatch/{order_to_dispatch.id}")

    order_to_dispatch: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Waiting-for-warehouse-manager"
        )
    ).scalar()
    assert order_to_dispatch
    assert order_to_dispatch.status == "Assigned to pickup"


def test_cancel_outgoing_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_cancel: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()

    assert order_to_cancel
    assert order_to_cancel.status == "Assigned to pickup"

    mg_g_populate.get(f"/outgoing_stock/cancel/{order_to_cancel.id}")

    order_to_cancel: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()
    assert order_to_cancel
    assert order_to_cancel.status == "Cancelled"


def test_sort_outgoing_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/outgoing_stock/sort",
        data=dict(sort_by="In transit"),
    )
    assert ("Order-12345-In-transit" in response.text) is True
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/outgoing_stock/sort",
        data=dict(sort_by="Waiting for warehouse manager"),
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/outgoing_stock/sort",
        data=dict(sort_by=""),
        follow_redirects=True,
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.get(
        "/outgoing_stock/sort",
        follow_redirects=True,
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is True
    assert response.status_code == 200
