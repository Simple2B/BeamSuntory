from flask.testing import FlaskClient
from app import schema as s
from app import models as m, db
from tests.utils import login, register, logout


def test_incoming_stocks_pages(mg_g_populate: FlaskClient):
    logout(mg_g_populate)
    response = mg_g_populate.get("/incoming_stock/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(mg_g_populate, "samg")
    assert b"Login successful." in response.data

    response = mg_g_populate.get("/incoming_stock/")
    assert response.status_code == 200

    login(mg_g_populate)

    inbound_order: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(
            m.InboundOrder.status == s.InboundOrderStatus.in_transit
        )
    )

    assert inbound_order


def test_view_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(
            m.InboundOrder.title == "Inbound Order In transit"
        )
    ).scalar()
    assert order_to_accept
    res = mg_g_populate.get(f"/incoming_stock/{order_to_accept.id}/view")
    assert res.status_code == 200
    assert order_to_accept.title in res.data.decode("utf-8")

    res = mg_g_populate.get(f"/incoming_stock/{1000}/view")
    assert res.status_code == 200
    assert "'t find inbound order" in res.data.decode("utf-8")


def test_view_accept_goods_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(
            m.InboundOrder.title == "Inbound Order In transit"
        )
    ).scalar()
    assert order_to_accept
    res = mg_g_populate.get(f"/incoming_stock/{order_to_accept.id}/view-accept-goods")
    assert res.status_code == 200
    assert order_to_accept.products_allocated[0].product.SKU in res.data.decode("utf-8")

    res = mg_g_populate.get(f"/incoming_stock/{1000}/view-accept-goods")
    assert res.status_code == 200
    assert "'t find inbound order" in res.data.decode("utf-8")


def test_cancel_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(
            m.InboundOrder.title == "Inbound Order In transit"
        )
    ).scalar()

    assert order_to_accept
    assert order_to_accept.status == s.InboundOrderStatus.in_transit

    mg_g_populate.get(f"/incoming_stock/cancel/{order_to_accept.id}")

    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(
            m.InboundOrder.title == "Inbound Order In transit"
        )
    ).scalar()
    assert order_to_accept
    assert order_to_accept.status == s.InboundOrderStatus.cancelled


def test_sort_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by="Assigned to pickup"),
    )
    assert ("Inbound Order Assigned to pickup" in response.text) is True
    assert ("Inbound Order In transit" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by="In transit"),
    )
    assert ("Inbound Order Assigned to pickup" in response.text) is False
    assert ("Inbound Order In transit" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by=""),
    )
    assert "/incoming_stock/" in response.text
    assert response.status_code == 302

    response = mg_g_populate.get(
        "/incoming_stock/sort",
    )
    assert "/incoming_stock/" in response.text
    assert response.status_code == 302


# TODO
# def test_incoming_stock_accept(
#     mg_g_populate: FlaskClient,
#     orders_t: tuple,
# ):
#     orders, order_name = orders_t
#     login(mg_g_populate)

#     inbound_order_test: m.InboundOrder = db.session.scalar(
#         m.InboundOrder.select().where(m.InboundOrder.title == order_name)
#     )

#     inbound_order_test_package_info: m.PackageInfo = db.session.scalar(
#         m.PackageInfo.select()
#     )

#     assert inbound_order_test.status == s.InboundOrderStatus.in_transit
#     assert inbound_order_test_package_info is None

#     response = mg_g_populate.post(
#         "/incoming_stock/accept",
#         data=dict(
#             inbound_order_id=inbound_order_test.id,
#             received_products=orders.model_dump_json(),
#         ),
#         follow_redirects=True,
#     )

#     inbound_order_test: m.InboundOrder = db.session.scalar(
#         m.InboundOrder.select().where(m.InboundOrder.title == order_name)
#     )
#     inbound_order_test_package_info: m.PackageInfo = db.session.scalar(
#         m.PackageInfo.select()
#     )

#     assert response.status_code == 200
#     assert order_name in response.text
#     assert inbound_order_test.status == s.InboundOrderStatus.delivered
#     assert inbound_order_test_package_info is not None

#     assert inbound_order_test.report_inventory_list is not None
#     assert len(inbound_order_test.report_inventory_list.report_inventories) > 0
#     assert len(inbound_order_test.report_inventory_list.report_inventories) == len(
#         inbound_order_test.products_allocated
#     )
