from flask.testing import FlaskClient
from app import models as m, db
from app import schema as s
from tests.utils import login, register, logout


def test_outgoing_stocks_pages(client):
    logout(client)
    response = client.get("/outgoing_stock/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/outgoing_stock/")
    assert response.status_code == 200


def test_cancel_outgoing_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_cancel: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()

    assert order_to_cancel
    assert order_to_cancel.status == s.ShipRequestStatus.assigned

    mg_g_populate.get(f"/outgoing_stock/cancel/{order_to_cancel.id}")

    order_to_cancel: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Assigned-to-pickup"
        )
    ).scalar()
    assert order_to_cancel
    assert order_to_cancel.status == s.ShipRequestStatus.cancelled


def test_sort_outgoing_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/outgoing_stock/sort",
        data=dict(sort_by=s.ShipRequestStatus.in_transit.value),
    )
    assert ("Order-12345-In-transit" in response.text) is True
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/outgoing_stock/sort",
        data=dict(sort_by=s.ShipRequestStatus.waiting_for_warehouse.value),
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/outgoing_stock/sort",
        data=dict(sort_by=""),
        follow_redirects=True,
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.get(
        "/outgoing_stock/sort",
        follow_redirects=True,
    )
    assert ("Order-12345-Waiting-for-warehouse-manager" in response.text) is True
    assert ("Order-12345-In-transit" in response.text) is True
    assert response.status_code == 200


def test_edit_outgoing_stock(mg_g_populate: FlaskClient):
    register("samg", "samg@test.com")
    login(mg_g_populate, "samg")

    order_to_dispatch: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Waiting-for-warehouse-manager"
        )
    ).scalar()

    carts: list[m.Cart] = db.session.scalars(
        m.Cart.select().where(
            m.Cart.user_id == 1,
            m.Cart.status == "submitted",
            m.Cart.ship_request_id == order_to_dispatch.id,
        )
    )

    assert order_to_dispatch
    assert order_to_dispatch.status == s.ShipRequestStatus.waiting_for_warehouse
    assert carts

    response = mg_g_populate.post(
        "/outgoing_stock/edit",
        data=dict(
            ship_request_id=order_to_dispatch.id,
            status=s.ShipRequestStatus.assigned.value,
            store_category=1,
            order_type="test type",
            store=1,
            quantity=1,
            products='[{"product_id": "1", "group_name": "Canada", "quantity": "100", "warehouse_id": "1"}]',
        ),
    )
    assert response.status_code == 302
    assert "outgoing_stock" in response.text

    order_to_dispatch: m.ShipRequest = db.session.execute(
        m.ShipRequest.select().where(
            m.ShipRequest.order_numb == "Order-12345-Waiting-for-warehouse-manager"
        )
    ).scalar()

    carts: list[m.Cart] = db.session.scalars(
        m.Cart.select().where(
            m.Cart.user_id == 1,
            m.Cart.status == "completed",
            m.Cart.ship_request_id == order_to_dispatch.id,
        )
    ).all()

    assert order_to_dispatch
    assert order_to_dispatch.status == s.ShipRequestStatus.assigned
    assert carts
    assert order_to_dispatch.report_inventory_list is not None
    assert len(order_to_dispatch.report_inventory_list.report_inventories) > 0
    assert len(order_to_dispatch.report_inventory_list.report_inventories) == len(carts)
