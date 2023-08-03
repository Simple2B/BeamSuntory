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


def test_incoming_stock_package_info(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    package_info: m.PackageInfo = db.session.execute(m.PackageInfo.select()).scalars()

    assert len([i for i in package_info]) == 0

    response = mg_g_populate.post(
        "/incoming_stock/package_info",
        data=dict(
            inbound_order_id=1,
            quantity_carton_master=11,
            quantity_per_wrap=12,
            quantity_wrap_carton=13,
            received_products="14",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Package info updated!" in response.text
    package_info = db.session.execute(m.PackageInfo.select()).scalars()

    assert len([i for i in package_info]) == 1

    response = mg_g_populate.post(
        "/incoming_stock/package_info",
        data=dict(
            inbound_order_id=1,
            quantity_carton_master=110,
            quantity_per_wrap=12,
            quantity_wrap_carton=13,
            received_products="14",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Package info updated!" in response.text
    package_info: m.PackageInfo = db.session.execute(
        m.PackageInfo.select().where(m.PackageInfo.inbound_order_id == 1)
    ).scalar()

    assert package_info.quantity_carton_master == 110
