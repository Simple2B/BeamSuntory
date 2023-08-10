from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_pickup_inbounds_pages(client):
    logout(client)
    response = client.get("/pickup_inbound/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/pickup_inbound/")
    assert response.status_code == 200


def test_pickup_pickup_inbound(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_pickup: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_id == "IO-BEAM-A-t-p")
    ).scalar()

    assert order_to_pickup
    assert order_to_pickup.status == "Assigned to pickup"

    mg_g_populate.get(f"/pickup_inbound/pickup/{order_to_pickup.id}")

    order_to_pickup: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_id == "IO-BEAM-A-t-p")
    ).scalar()
    assert order_to_pickup
    assert order_to_pickup.status == "In transit"


def test_sort_pickup_inbound(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/pickup_inbound/sort",
        data=dict(sort_by="Assigned to pickup"),
    )
    assert ("IO-BEAM-A-t-p" in response.text) is True
    assert ("IO-BEAM-I-t" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/pickup_inbound/sort",
        data=dict(sort_by="In transit"),
    )
    assert ("IO-BEAM-I-t" in response.text) is True
    assert ("IO-BEAM-A-t-p" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/pickup_inbound/sort",
        data=dict(sort_by=""),
        follow_redirects=True,
    )
    assert ("IO-BEAM-I-t" in response.text) is True
    assert ("IO-BEAM-A-t-p" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.get(
        "/pickup_inbound/sort",
        follow_redirects=True,
    )
    assert ("IO-BEAM-I-t" in response.text) is True
    assert ("IO-BEAM-A-t-p" in response.text) is True
    assert response.status_code == 200
