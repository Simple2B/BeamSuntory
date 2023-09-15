# flake8: noqa
import json
import pytest
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

    quantity_received = 90

    response = mg_g_populate.post(
        "/incoming_stock/accept",
        data=dict(
            inbound_order_id=inbound_order.id,
            quantity_per_wrap=12,
            quantity_wrap_carton=11,
            quantity_carton_master=13,
            received_products=json.dumps(
                [
                    {
                        "product_id": inbound_order.products_allocated[0].product_id,
                        "quantity_received": quantity_received,
                        "group_id": inbound_order.products_allocated[0]
                        .product_quantity_groups[0]
                        .group_id,
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
    assert order_to_accept.status == s.InboundOrderStatus.delivered

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
    assert order_to_accept.status == s.InboundOrderStatus.in_transit

    mg_g_populate.get(f"/incoming_stock/cancel/{order_to_accept.id}")

    order_to_accept: m.InboundOrder = db.session.execute(
        m.InboundOrder.select().where(m.InboundOrder.order_id == "IO-BEAM-I-t")
    ).scalar()
    assert order_to_accept
    assert order_to_accept.status == s.InboundOrderStatus.cancelled


def test_sort_incoming_stock(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by="Assigned to pickup"),
    )
    # NOTE: use "><" because we have data about all inbound orders in data-target json, so we avoid false positives
    assert (">IO-BEAM-A-t-p<" in response.text) is True
    assert (">IO-BEAM-I-t<" in response.text) is False
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/incoming_stock/sort",
        data=dict(sort_by="In transit"),
    )
    assert (">IO-BEAM-I-t<" in response.text) is True
    assert (">IO-BEAM-A-t-p<" in response.text) is False
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


# received_one_product_one_group = '[{"allocatedProductId": %s,"packages":[{"productQuantityGroupId": %s,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
# received_one_product_two_groups = '[{"allocatedProductId": %s,"packages":[{"productQuantityGroupId": %s,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
# received_two_products_one_group = '[{"allocatedProductId": %s,"packages":[{"productQuantityGroupId": %s,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
# received_two_products_two_groups = '[{"allocatedProductId": %s,"packages":[{"productQuantityGroupId": %s,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
received_one_product_one_group = '[{"allocatedProductId": 2,"packages":[{"productQuantityGroupId": 2,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
received_one_product_two_groups = '[{"allocatedProductId": 2,"packages":[{"productQuantityGroupId": 2,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
received_two_products_one_group = '[{"allocatedProductId": 2,"packages":[{"productQuantityGroupId": 2,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'
received_two_products_two_groups = '[{"allocatedProductId": 2,"packages":[{"productQuantityGroupId": 2,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'


# @pytest.fixture(
#     params=[
#         received_one_product_one_group,
#         received_one_product_two_groups,
#         received_two_products_one_group,
#         received_two_products_two_groups,
#     ]
# )
# def received_product(mg_g_populate: FlaskClient, request):
#     yield {"mg_g": mg_g_populate, "received_product": request.param}


@pytest.fixture(
    params=[
        received_one_product_one_group,
        received_one_product_two_groups,
        received_two_products_one_group,
        received_two_products_two_groups,
    ]
)
def received_product(request):
    yield request.param


# @pytest.mark.parametrize(
#     "mg_g_populate, received_product",
#     [
#         (received_one_product_one_group, ""),
#         (received_one_product_two_groups, ""),
#         (received_two_products_one_group, ""),
#         (received_two_products_two_groups, ""),
#     ],
#     indirect=["mg_g_populate"],
# )


def test_incoming_stock_accept(mg_g_populate: FlaskClient, received_product):
    # received_products = {
    #     "received_one_product_one_group": '[{"allocatedProductId": 1,"packages":[{"productQuantityGroupId": 1,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]',
    #     "received_one_product_two_groups": '[{"allocatedProductId": 1,"packages":[{"productQuantityGroupId": 1,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]',
    #     "received_two_products_one_group": '[{"allocatedProductId": 1,"packages":[{"productQuantityGroupId": 1,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]',
    #     "received_two_products_two_groups": '[{"allocatedProductId": 1,"packages":[{"productQuantityGroupId": 1,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]',
    # }
    login(mg_g_populate)
    # received_product = '[{"allocatedProductId": 2,"packages":[{"productQuantityGroupId": 2,"quantityPerWrap":1,"quantityWrapCarton":1,"quantityCartonMaster":1,"quantityReceived":200}]}]'

    inbound_order_test: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(
            m.InboundOrder.title == "Inbound Order In transit"
        )
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
            received_products=received_product
            # received_products=received_products[received_product].format(
            #     inbound_order_test.products_allocated[0].id,
            #     inbound_order_test.products_allocated[0]
            #     .product_quantity_groups[0]
            #     .id,
            # ),
        ),
        follow_redirects=True,
    )

    inbound_order_test: m.InboundOrder = db.session.scalar(
        m.InboundOrder.select().where(
            m.InboundOrder.title == "Inbound Order In transit"
        )
    )
    inbound_order_test_package_info: m.PackageInfo = db.session.scalar(
        m.PackageInfo.select().where(
            m.PackageInfo.product_quantity_group_id
            == inbound_order_test.products_allocated[0].product_quantity_groups[0].id
        )
    )

    assert response.status_code == 200
    assert "Inbound Order In transit" in response.text
    assert inbound_order_test.status == s.InboundOrderStatus.delivered
    assert inbound_order_test_package_info is not None
