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

    warehouse_product: m.WarehouseProduct = db.session.scalar(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.product_id == event_product.id
            and m.WarehouseProduct.warehouse_id == event_warehouse.id
        )
    )

    model_root = s.ProductWarehouseRoot.model_validate([warehouse_product])
    model_root.root[0].product_quantity += 100

    warehouses_groups_quantity_json = s.ProductWarehouses.model_dump_json(model_root)
    response = mg_g_populate.post(
        "product/adjust",
        data=dict(
            product_id=event_product.id,
            note="adjust first note",
            user_id=1,
            warehouses_groups_quantity=warehouses_groups_quantity_json,
        ),
        follow_redirects=True,
    )

    assert response.status_code == HTTPStatus.OK
    adjusts_rows_objs = db.session.scalars(m.Adjust.select()).all()
    assert len(adjusts_rows_objs) > 0

    adjust_group_qty_rows_objs = db.session.scalars(m.AdjustGroupQty.select()).all()
    assert len(adjust_group_qty_rows_objs) > 0
