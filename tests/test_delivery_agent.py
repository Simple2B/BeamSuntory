from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_delivery_agents_pages(client):
    logout(client)
    response = client.get("/delivery_agent/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/delivery_agent/")
    assert response.status_code == 200
    response = client.get("/delivery_agent/create")
    assert response.status_code == 405


def test_create_delivery_agent(client):
    login(client, "bob")

    response = client.post(
        "/delivery_agent/create",
        data=dict(
            first_name="July",
            last_name="Wood",
            username="julywood",
            email="julywood@test.com",
            contact_number="380362470223",
            street_address="sserdda",
            active=True,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Delivery Agent added!" in response.text
    delivery_agents_rows_objs = db.session.execute(
        m.DeliveryAgent.select().where(m.DeliveryAgent.username == "julywood")
    ).all()
    assert len(delivery_agents_rows_objs) > 0


def test_delete_delivery_agent(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.delete("/delivery_agent/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    delivery_agents_rows_objs = db.session.execute(m.DeliveryAgent.select()).all()
    assert len(delivery_agents_rows_objs) == 0


def test_edit_delivery_agent(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/delivery_agent/save",
        data=dict(
            delivery_agent_id=1,
            first_name="July",
            last_name="Wood",
            username="julywood",
            email="julywood@test.com",
            contact_number="380362470223",
            street_address="sserdda",
            active=True,
        ),
    )
    assert response.status_code == 302
    assert "delivery_agent" in response.text
    delivery_agents_rows_objs = db.session.execute(
        m.DeliveryAgent.select().where(m.DeliveryAgent.username == "julywood")
    ).all()
    assert len(delivery_agents_rows_objs) > 0
