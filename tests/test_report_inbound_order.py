import sqlalchemy as sa

from flask.testing import FlaskClient
from http import HTTPStatus

from app import db
from app import models as m
from app import schema as s

from tests.utils import login


def test_report_inbound_order(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    inbound_order = db.session.scalar(m.InboundOrder.select())
    assert inbound_order
    inbound_order_before_count = db.session.scalar(sa.func.count(m.InboundOrder.id))
    report_inbound_order_before_count = db.session.scalar(
        sa.func.count(m.ReportInboundOrder.id)
    )

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

    assert response.status_code == HTTPStatus.OK

    report_inbound_order_after_count = db.session.scalar(
        sa.func.count(m.ReportInboundOrder.id)
    )

    inbound_order_after_count = db.session.scalar(sa.func.count(m.InboundOrder.id))

    assert inbound_order_after_count == inbound_order_before_count + 1
    assert report_inbound_order_after_count == report_inbound_order_before_count + 1
