from flask.testing import FlaskClient
from app import schema as s
from app import models as m, db
from tests.utils import login, register, logout


def test_pickup_orders_pages(client):
    logout(client)
    response = client.get("/pickup_order/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/pickup_order/")
    assert response.status_code == 200


def test_pickup_pickup_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()

    assert order_to_pickup
    assert order_to_pickup.status == s.ShipRequestStatus.assigned

    mg_g_populate.get(f"/pickup_order/pickup/{order_to_pickup.id}")

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()
    assert order_to_pickup
    assert order_to_pickup.status == s.ShipRequestStatus.in_transit


def test_deliver_pickup_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-In-transit"
        )
    ).scalar()

    assert order_to_pickup
    assert order_to_pickup.status == s.ShipRequestStatus.in_transit

    mg_g_populate.get(f"/pickup_order/deliver/{order_to_pickup.id}")

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-In-transit"
        )
    ).scalar()
    assert order_to_pickup
    assert order_to_pickup.status == s.ShipRequestStatus.delivered


def test_sort_pickup_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/pickup_order/sort",
        data=dict(sort_by=s.ShipRequestStatus.in_transit.value),
    )
    assert ("Order-12345-In-transit" in response.text) is True
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/pickup_order/sort",
        data=dict(sort_by=s.ShipRequestStatus.waiting_for_warehouse.value),
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/pickup_order/sort",
        data=dict(sort_by=""),
        follow_redirects=True,
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.get(
        "/pickup_order/sort",
        follow_redirects=True,
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is True
    assert response.status_code == 200
