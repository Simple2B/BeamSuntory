from flask.testing import FlaskClient
from http import HTTPStatus

from app import db
from app import models as m
from app import schema as s

from tests.utils import login


def test_adjustment_create(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    event_product: m.Product = db.session.scalar(
        m.Product.select().where(m.Product.name == "event_test_product")
    )
    assert event_product

    event_warehouse: m.Warehouse = db.session.scalar(
        m.Warehouse.select().where(
            m.Warehouse.name == s.WarehouseMandatory.warehouse_events.value
        )
    )
    assert event_warehouse

    event_group: m.Group = db.session.scalar(
        m.Group.select().where(
            m.Group.name == s.ProductMasterGroupMandatory.events.value
        )
    )
    assert event_group

    adjusts_rows_objs = db.session.scalars(m.Adjust.select()).all()
    assert len(adjusts_rows_objs) == 0

    adjust_group_qty_rows_objs = db.session.scalars(m.AdjustGroupQty.select()).all()
    assert len(adjust_group_qty_rows_objs) == 0

    group_warehouse_quantity = """{"Events":{"2":300}}"""

    response = mg_g_populate.post(
        "product/adjust",
        data=dict(
            product_id=event_product.id,
            note="adjust first note",
            user_id=1,
            groups_quantity=group_warehouse_quantity,
        ),
        follow_redirects=True,
    )

    assert response.status_code == HTTPStatus.OK
    adjusts_rows_objs = db.session.scalars(m.Adjust.select()).all()
    assert len(adjusts_rows_objs) > 0

    adjust_group_qty_rows_objs = db.session.scalars(m.AdjustGroupQty.select()).all()
    assert len(adjust_group_qty_rows_objs) > 0
