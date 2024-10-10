from flask.testing import FlaskClient
from app import schema as s
from app import models as m, db
from tests.utils import login, register, logout


def test_pickup_inbounds_pages(client):
    logout(client)
    response = client.get("/pickup_inbound/")
    assert response.status_code == 302

    register("samg", "samg@test.com", role_name=s.UserRole.WAREHOUSE_MANAGER.value)
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/pickup_inbound/")
    assert response.status_code == 200


def test_pickup_pickup_inbound(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_pickup: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(
            m.InboundOrder.status == s.InboundOrderStatus.assigned
        )
    )
    assert order_to_pickup

    mg_g_populate.get(f"/pickup_inbound/pickup/{order_to_pickup.id}")

    order_to_pickup: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(
            m.InboundOrder.status == s.InboundOrderStatus.in_transit
        )
    )
    assert order_to_pickup
