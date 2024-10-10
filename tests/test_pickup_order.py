from flask.testing import FlaskClient
from app import schema as s
from app import models as m, db
from tests.utils import login, register, logout


def test_pickup_orders_pages(client):
    logout(client)
    response = client.get("/pickup_order/")
    assert response.status_code == 302

    register("samg", "samg@test.com", role_name=s.UserRole.WAREHOUSE_MANAGER.value)
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/pickup_order/")
    assert response.status_code == 200


def test_deliver_pickup_order(mg_g_populate: FlaskClient):

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-In-transit"
        )
    ).scalar()

    assert order_to_pickup
    assert order_to_pickup.status == s.ShipRequestStatus.in_transit

    register("samg", "samg@test.com", role_name=s.UserRole.DELIVERY_AGENT.value)
    login(mg_g_populate, "samg")
    mg_g_populate.get(f"/pickup_order/deliver/{order_to_pickup.id}")

    order_to_pickup: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-In-transit"
        )
    ).scalar()
    assert order_to_pickup
    assert order_to_pickup.status == s.ShipRequestStatus.delivered


def test_sort_pickup_order(mg_g_populate: FlaskClient):

    register("samg", "samg@test.com", role_name=s.UserRole.DELIVERY_AGENT.value)
    login(mg_g_populate, "samg")
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


def test_edit_pickup_order(mg_g_populate: FlaskClient):
    register("samg", "samg@test.com", role_name=s.UserRole.WAREHOUSE_MANAGER.value)
    login(mg_g_populate, "samg")

    order_to_dispatch: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()

    assert order_to_dispatch
    assert order_to_dispatch.status == s.ShipRequestStatus.assigned

    response = mg_g_populate.post(
        "/pickup_order/edit",
        data=dict(
            ship_request_id=order_to_dispatch.id,
            status=s.ShipRequestStatus.in_transit.value,
            da_notes="da comment",
        ),
    )
    assert response.status_code == 302
    assert "pickup_order" in response.text

    order_to_dispatch: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()

    assert order_to_dispatch
    assert order_to_dispatch.status == s.ShipRequestStatus.in_transit
