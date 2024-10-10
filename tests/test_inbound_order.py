# flake8: noqa W291
from flask.testing import FlaskClient
from app import models as m, db
from app import schema as s
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
            active_date="2999-08-19",
            active_time="12:00 AM",
            order_title="Inbound Order 1",
            quantity=5,
            delivery_date="2999-07-19",
            status=s.InboundOrderStatus.draft.value,
            supplier_id=1,
            warehouse_id=1,
            products="""[{"id": 1, "quantity": 5, "shelf_life_start": "07/22/2023", "shelf_life_end": "07/24/2023"}]""",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Inbound order added!" in response.text
    inbound_orders_rows_objs = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.title == "Inbound Order 1")
    ).all()
    assert len(inbound_orders_rows_objs) > 0


def test_get_view(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    response = mg_g_populate.get("/inbound_order/200/view")
    assert response.status_code == 200
    assert "Inbound order not found" in response.text

    ib_order = db.session.get(m.InboundOrder, 1)
    response = mg_g_populate.get(f"/inbound_order/{ib_order.id}/view")
    assert response.status_code == 200
    assert ib_order.title in response.text


def test_delete_inbound_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    inbound_orders_rows_objs = db.session.execute(m.InboundOrder.select()).all()
    assert len(inbound_orders_rows_objs) == 7
    response = mg_g_populate.delete("/inbound_order/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    inbound_orders_rows_objs = db.session.execute(m.InboundOrder.select()).all()
    assert len(inbound_orders_rows_objs) == 6


# TODO rewrite incoming order
def test_edit_inbound_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    inbound_order = db.session.scalar(m.InboundOrder.select())

    response = mg_g_populate.post(
        "/inbound_order/save",
        data=dict(
            inbound_order_uuid=inbound_order.uuid,
            active_date="2998-07-24",
            active_time="12:00 AM",
            order_title="Inbound Order 111",
            quantity=5,
            delivery_date="2998-07-22",
            status=s.InboundOrderStatus.draft.value,
            supplier_id=1,
            warehouse_id=1,
            product_id=1,
            product_groups="""[{"productAllocatedId":1, "productAllocatedQuantity": 40, 
            "productAllocatedGroups":[{"groupId":1, "quantity":11}]}]""",
        ),
    )
    assert response.status_code == 302
    assert "inbound_order" in response.text
    inbound_orders_rows_objs = db.session.scalar(
        m.InboundOrder.select().where(m.InboundOrder.title == "Inbound Order 111")
    )
    assert inbound_orders_rows_objs
