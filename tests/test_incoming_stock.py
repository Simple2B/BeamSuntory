import json
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
    ordered_products: m.ProductQuantityGroup = db.session.execute(
        m.ProductQuantityGroup.select().where(
            m.ProductQuantityGroup.inbound_order_id == order_to_accept.id
        )
    ).scalar()

    assert order_to_accept
    assert order_to_accept.status == "In transit"

    quantity_received = 90

    response = mg_g_populate.post(
        "/incoming_stock/accept",
        data=dict(
            inbound_order_id=order_to_accept.id,
            quantity_per_wrap=12,
            quantity_wrap_carton=11,
            quantity_carton_master=13,
            received_products=json.dumps(
                [
                    {
                        "product_id": ordered_products.product_id,
                        "quantity_received": quantity_received,
                        "group_id": ordered_products.group_id,
                    }
                ]
            ),
        ),
        follow_redirects=True,
    )

    assert response.status_code == 200
    assert "accepted" in response.text
    assert "!=" in response.text
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
    assert warehouse_product.product_quantity != 100 + products_quantity_group.quantity
    assert warehouse_product.product_quantity != 100 + products_quantity_group.quantity

    package_info = db.session.execute(
        m.PackageInfo.select().where(
            m.PackageInfo.inbound_order_id == order_to_accept.id
        )
    ).scalars()

    assert package_info


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


def test_sort_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by="Assigned to pickup"),
    )
    assert ("IO-BEAM-A-t-p" in response.text) is True
    assert ("IO-BEAM-I-t" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by="In transit"),
    )
    assert ("IO-BEAM-I-t" in response.text) is True
    assert ("IO-BEAM-A-t-p" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by=""),
        follow_redirects=True,
    )
    assert ("IO-BEAM-I-t" in response.text) is True
    assert ("IO-BEAM-A-t-p" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.get(
        "/incoming_stock/sort",
        follow_redirects=True,
    )
    assert ("IO-BEAM-I-t" in response.text) is True
    assert ("IO-BEAM-A-t-p" in response.text) is True
    assert response.status_code == 200
