from flask.testing import FlaskClient
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
    assert order_to_pickup.status == "Assigned to pickup"

    mg_g_populate.get(f"/pickup_order/pickup/{order_to_pickup.id}")

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()
    assert order_to_pickup
    assert order_to_pickup.status == "In transit"


def test_deliver_pickup_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-In-transit"
        )
    ).scalar()

    assert order_to_pickup
    assert order_to_pickup.status == "In transit"

    mg_g_populate.get(f"/pickup_order/deliver/{order_to_pickup.id}")

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-In-transit"
        )
    ).scalar()
    assert order_to_pickup
    assert order_to_pickup.status == "Delivered"
