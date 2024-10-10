from flask.testing import FlaskClient
from http import HTTPStatus

from app.database import db
from app import models as m

from tests.utils import login


def test_adjustment_create(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    adjusts_rows_objs = db.session.scalars(m.Adjust.select()).all()
    assert len(adjusts_rows_objs) == 0

    adjust_group_qty_rows_objs = db.session.scalars(m.AdjustGroupQty.select()).all()
    assert len(adjust_group_qty_rows_objs) == 0
    wh_data = '[{"warehouse_product_id":"1","product_quantity":"105"}]'
    response = mg_g_populate.post(
        "product/adjust",
        data=dict(
            product_id=1,
            note="adjust first note",
            warehouses_groups_quantity=wh_data,
        ),
        follow_redirects=True,
    )

    assert response.status_code == HTTPStatus.OK
    adjusts_rows_objs = db.session.scalars(m.Adjust.select()).all()
    assert len(adjusts_rows_objs) > 0

    adjust_group_qty_rows_objs = db.session.scalars(m.AdjustGroupQty.select()).all()
    assert len(adjust_group_qty_rows_objs) > 0
