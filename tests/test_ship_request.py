from datetime import datetime, timedelta
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
    # was 405 why?
    assert response.status_code == 200


def test_create_ship_request(mg_g_populate: FlaskClient):
    register("samg", "samg@test.com")
    login(mg_g_populate, "samg")
    start_date = (datetime.now() + timedelta(days=6)).strftime("%Y-%m-%d")
    end_date = (datetime.now() + timedelta(days=10)).strftime("%Y-%m-%d")

    response = mg_g_populate.post(
        "/ship_request/create",
        data=dict(
            status="In Progress",
            store_category=1,
            order_type="test type",
            store=1,
            quantity=1,
            event_date_range=f"{start_date} - {end_date}",
        ),
    )
    assert response.status_code == 302
    assert "ship_request" in response.text
    ship_request_rows_objs = db.session.execute(m.ShipRequest.select()).all()
    assert len(ship_request_rows_objs) > 8


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
