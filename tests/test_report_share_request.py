from flask.testing import FlaskClient
from http import HTTPStatus

from app import db
from app import models as m

from tests.utils import login


def test_report_share_request_on_create(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    warehouse_product: m.WarehouseProduct = db.session.scalar(
        m.WarehouseProduct.select()
    )
    assert warehouse_product

    group: m.Group = db.session.scalar(
        m.Group.select().where(
            m.Group.id != warehouse_product.group.id,
        )
    )
    assert group

    response = mg_g_populate.post(
        "/product/request_share",
        data=dict(
            sku=warehouse_product.product.SKU,
            to_group_id=group.id,
            available_quantity=5,
            desire_quantity=3,
            from_group=warehouse_product.group.name,
        ),
        follow_redirects=True,
    )

    # Share request created check
    request_share: m.RequestShare = db.session.scalar(
        m.RequestShare.select().where(
            m.RequestShare.group_id == group.id,
            m.RequestShare.from_group_id == warehouse_product.group.id,
            m.RequestShare.product_id == warehouse_product.product_id,
        ),
    )
    assert request_share

    # Get report share request
    # HTML
    mg_g_populate.post("/report_request_share/event")
    # API for csv

    assert response.status_code == HTTPStatus.OK
