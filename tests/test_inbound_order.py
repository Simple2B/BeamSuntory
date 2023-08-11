from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_inbound_orders_pages(client):
    logout(client)
    response = client.get("/inbound_order/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/inbound_order/")
    assert response.status_code == 200
    response = client.get("/inbound_order/create")
    assert response.status_code == 405


def test_create_inbound_order(mg_g_populate: FlaskClient):
    login(mg_g_populate, "bob")

    response = mg_g_populate.post(
        "/inbound_order/create",
        data=dict(
            inbound_order_id="IO-0001",
            active_date="07/19/2023",
            active_time="12:00 AM",
            order_title="Inbound Order 1",
            quantity=5,
            delivery_date="07/19/2023",
            status="Draft",
            supplier_id=1,
            delivery_agent_id=1,
            warehouse_id=1,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Inbound order added!" in response.text
    inbound_orders_rows_objs = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_title == "Inbound Order 1")
    ).all()
    assert len(inbound_orders_rows_objs) > 0


def test_delete_inbound_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    inbound_orders_rows_objs = db.session.execute(m.InboundOrder.select()).all()
    assert len(inbound_orders_rows_objs) == 3
    response = mg_g_populate.delete("/inbound_order/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    inbound_orders_rows_objs = db.session.execute(m.InboundOrder.select()).all()
    assert len(inbound_orders_rows_objs) == 2


def test_edit_inbound_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/inbound_order/save",
        data=dict(
            inbound_order_id=1,
            active_date="07/24/2023",
            active_time="12:00 AM",
            order_title="Inbound Order 111",
            quantity=5,
            delivery_date="07/22/2023",
            status="Delivered",
            supplier_id=1,
            delivery_agent_id=1,
            warehouse_id=1,
            product_id=1,
            products='[{"product_id": 1, "quantity": 5, "group_id": 1, "shelf_life_start": "07/22/2023", "shelf_life_end": "07/24/2023"}]',
        ),
    )
    assert response.status_code == 302
    assert "inbound_order" in response.text
    inbound_orders_rows_objs = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_title == "Inbound Order 111")
    ).all()
    assert len(inbound_orders_rows_objs) > 0
