from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_ship_request_pages(client):
    logout(client)
    response = client.get("/ship_request/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/ship_request/")
    assert response.status_code == 200
    response = client.get("/ship_request/create")
    assert response.status_code == 405


def test_create_ship_request(mg_g_populate: FlaskClient):
    register("samg", "samg@test.com")
    login(mg_g_populate, "samg")

    response = mg_g_populate.post(
        "/ship_request/create",
        data=dict(
            status="In Progress",
            store_category="Drinks",
            order_type="test type",
            store=1,
            warehouse=1,
            quantity=1,
        ),
    )
    assert response.status_code == 302
    assert "ship_request" in response.text
    ship_request_rows_objs = db.session.execute(m.InboundOrder.select()).all()
    assert len(ship_request_rows_objs) > 0


def test_edit_ship_request(mg_g_populate: FlaskClient):
    register("samg", "samg@test.com")
    login(mg_g_populate, "samg")

    response = mg_g_populate.post(
        "/ship_request/edit",
        data=dict(
            ship_request_id=1,
            status="Edited",
            store_category="Drinks",
            order_type="test type",
            store=1,
            warehouse=1,
            quantity=1,
        ),
    )
    assert response.status_code == 302
    assert "ship_request" in response.text
    ship_request: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(m.ShipRequest.status == "Edited")
    ).scalar()
    assert ship_request


def test_delete_ship_request(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    before_delete_ship_request_rows_objs = db.session.execute(
        m.ShipRequest.select()
    ).all()

    response = mg_g_populate.delete("/ship_request/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    ship_request_rows_objs = db.session.execute(m.ShipRequest.select()).all()
    assert len(ship_request_rows_objs) < len(before_delete_ship_request_rows_objs)
