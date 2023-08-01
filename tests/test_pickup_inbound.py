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


def test_pickup_inbound_package_info(client):
    login(client, "bob")

    package_info: m.PackageInfo = db.session.execute(m.PackageInfo.select()).scalars()

    assert len([i for i in package_info]) == 0

    response = client.post(
        "/pickup_inbound/package_info",
        data=dict(
            inbound_order_id=1,
            quantity_carton_master=11,
            quantity_per_wrap=12,
            quantity_wrap_carton=13,
            recieved_products=14,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Package info updated!" in response.text
    package_info = db.session.execute(m.PackageInfo.select()).scalars()

    assert len([i for i in package_info]) == 1

    response = client.post(
        "/pickup_inbound/package_info",
        data=dict(
            inbound_order_id=1,
            quantity_carton_master=110,
            quantity_per_wrap=12,
            quantity_wrap_carton=13,
            recieved_products=14,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Package info updated!" in response.text
    package_info: m.PackageInfo = db.session.execute(
        m.PackageInfo.select().where(m.PackageInfo.inbound_order_id == 1)
    ).scalar()

    assert package_info.quantity_carton_master == 110
