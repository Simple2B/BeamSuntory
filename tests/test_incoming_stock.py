from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_incoming_stocks_pages(client):
    logout(client)
    response = client.get("/incoming_stock/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/incoming_stock/")
    assert response.status_code == 200


def test_accept_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_id == "IO-BEAM-I-t")
    ).scalar()

    assert order_to_accept
    assert order_to_accept.status == "In transit"

    mg_g_populate.get(f"/incoming_stock/accept/{order_to_accept.id}")

    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_id == "IO-BEAM-I-t")
    ).scalar()
    assert order_to_accept
    assert order_to_accept.status == "Delivered"

    products_quantity_group: m.ProductQuantityGroup = db.session.execute(
        m.ProductQuantityGroup.select().where(
            m.ProductQuantityGroup.inbound_order_id == order_to_accept.id,
        )
    ).scalar()

    assert products_quantity_group

    warehouse_product: m.WarehouseProduct = db.session.execute(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id == products_quantity_group.product_id,
            m.WarehouseProduct.warehouse_id == products_quantity_group.warehouse_id,
            m.WarehouseProduct.group_id == products_quantity_group.group_id,
        )
    ).scalar()

    assert warehouse_product
    assert warehouse_product.product_quantity == 100 + products_quantity_group.quantity


def test_cancel_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_id == "IO-BEAM-I-t")
    ).scalar()

    assert order_to_accept
    assert order_to_accept.status == "In transit"

    mg_g_populate.get(f"/incoming_stock/cancel/{order_to_accept.id}")

    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_id == "IO-BEAM-I-t")
    ).scalar()
    assert order_to_accept
    assert order_to_accept.status == "Cancelled"
