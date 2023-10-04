import sqlalchemy as sa

from flask.testing import FlaskClient
from http import HTTPStatus
from bs4 import BeautifulSoup

from app import db
from app import models as m
from app import schema as s

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
            from_group_id=warehouse_product.group.id,
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
    # Get dashboard

    response = mg_g_populate.get("/report_request_share", follow_redirects=True)
    assert response.status_code == HTTPStatus.OK
    # Get tables with pagination
    response = mg_g_populate.get("/report_request_share/search", follow_redirects=True)
    assert response.status_code == HTTPStatus.OK
    # parse html
    soup = BeautifulSoup(response.data, "html.parser")
    reports_tr = soup.find_all("tr", class_="table-event-item-tr")
    assert reports_tr
    assert db.session.scalar(sa.func.count(m.ReportRequestShare.id)) == len(reports_tr)

    # Created
    response = mg_g_populate.get(
        f"/report_request_share/search?report_type={s.ReportRequestShareActionType.CREATED.value}",
        follow_redirects=True,
    )

    soup = BeautifulSoup(response.data, "html.parser")
    reports_tr = soup.find_all("tr", class_="table-event-item-tr")
    assert reports_tr
    assert len(
        db.session.scalars(
            m.ReportRequestShare.select().where(
                m.ReportRequestShare.type
                == s.ReportRequestShareActionType.CREATED.value
            )
        ).all()
    ) == len(reports_tr)

    # API for csv
    response = mg_g_populate.get("/report_request_share/api", follow_redirects=True)
    assert response.status_code == HTTPStatus.OK
    report_data = s.ReportRequestShareResponse.model_validate_json(response.json)
    assert report_data.reports.root
    assert report_data.pagination.total == db.session.scalar(
        sa.func.count(m.ReportRequestShare.id)
    )
