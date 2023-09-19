# flake8: noqa
import os
import pytest
from flask.testing import FlaskClient
from app import schema as s
from app import models as m, db
from tests.utils import login, register, logout

accept_cases = [
    "received_one_product_one_group",
    "received_one_product_two_groups",
    "received_two_products_one_group",
    "received_two_products_two_groups",
    "received_one_product_one_group",
]

# received_one_product_one_group = '[{"allocatedProductId": 3,"packages":[{"productQuantityGroupId": 3,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
received_one_product_two_groups = [
    {
        "allocatedProductId": 4,
        "packages": [
            {
                "productQuantityGroupId": 4,
                "quantityPerWrap": 1,
                "quantityWrapCarton": 1,
                "quantityCartonMaster": 1,
                "quantityReceived": 200,
            }
        ],
    },
    {
        "allocatedProductId": 5,
        "packages": [
            {
                "productQuantityGroupId": 5,
                "quantityPerWrap": 1,
                "quantityWrapCarton": 1,
                "quantityCartonMaster": 1,
                "quantityReceived": 200,
            }
        ],
    },
]

# received_two_products_one_group = '[{"allocatedProductId": 6,"packages":[{"productQuantityGroupId": 6,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}, {"allocatedProductId": 7,"packages":[{"productQuantityGroupId": 7,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
# received_two_products_two_groups = '[{"allocatedProductId": 8,"packages":[{"productQuantityGroupId": 8,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}, {"allocatedProductId": 9,"packages":[{"productQuantityGroupId": 9,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
# one_pr_one_gr_no_qty_master = '[{"allocatedProductId": 3,"packages":[{"productQuantityGroupId": 3,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityReceived":200}]}]'

received_product_json = open(
    "/home/linp/simple2b/beam_suntory/tests/data/dict_received_products.json", "r"
).read()
received_product_cases = s.IncomingStocksLists.model_validate_json(
    received_product_json
)
received_product_dict = {
    i.name: i.incoming_stock_product for i in received_product_cases.root
}
",".join(
    [
        i.model_dump_json(by_alias=True)
        for i in received_product_dict["received_one_product_two_groups"]
    ]
)


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


# @pytest.fixture(
#     params=[
#         ("received_one_product_one_group", received_one_product_one_group),
#         ("received_one_product_two_groups", received_one_product_two_groups),
#         ("received_two_products_one_group", received_two_products_one_group),
#         ("received_two_products_two_groups", received_two_products_two_groups),
#         ("received_one_product_one_group", one_pr_one_gr_no_qty_master),
#     ]
# )
# def received_product(request):
#     yield request.param


@pytest.fixture(
    params=[
        (
            ap,
            "["
            + ",".join(
                [i.model_dump_json(by_alias=True) for i in received_product_dict[ap]]
            )
            + "]",
        )
        for ap in accept_cases
    ]
)
def received_product(request):
    yield request.param


def test_incoming_stock_accept(mg_g_populate: FlaskClient, received_product):
    login(mg_g_populate)
    order_name = received_product[0]
    order_received_json = received_product[1]

    inbound_order_test: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(m.InboundOrder.title == order_name)
    )

    inbound_order_test_package_info: m.PackageInfo = db.session.scalar(
        m.PackageInfo.select().where(
            m.PackageInfo.product_quantity_group_id
            == inbound_order_test.products_allocated[0].product_quantity_groups[0].id
        )
    )

    assert inbound_order_test.status == s.InboundOrderStatus.in_transit
    assert inbound_order_test_package_info is None

    response = mg_g_populate.post(
        "/incoming_stock/accept",
        data=dict(
            inbound_order_id=inbound_order_test.id,
            received_products=order_received_json,
        ),
        follow_redirects=True,
    )

    inbound_order_test: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(m.InboundOrder.title == order_name)
    )
    inbound_order_test_package_info: m.PackageInfo = db.session.scalar(
        m.PackageInfo.select().where(
            m.PackageInfo.product_quantity_group_id
            == inbound_order_test.products_allocated[0].product_quantity_groups[0].id
        )
    )

    assert response.status_code == 200
    assert order_name in response.text
    assert inbound_order_test.status == s.InboundOrderStatus.delivered
    assert inbound_order_test_package_info is not None
