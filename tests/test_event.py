import json
from datetime import datetime, timedelta
from http import HTTPStatus
from flask.testing import FlaskClient
from app import db, models as m


from tests.utils import login, register, logout


def test_event_pages(client):
    logout(client)
    response = client.get("/event/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/event/")
    assert response.status_code == 200


def test_get_available_quantity_event(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    product: m.Product = db.session.scalar(
        m.Product.select().where(m.Product.name == "event_test_product")
    )
    month_from = datetime.now().month
    year_from = datetime.now().year
    product_id = product.id
    group_name = "Events"

    response = mg_g_populate.get(
        f"""/event/get_available_quantity?month_from={month_from}&year_from={year_from}&product_id={
            product_id}&group_name={group_name}""",
        follow_redirects=True,
    )
    quantity_in_warehouse = 200
    reserve_date = (datetime.now() - timedelta(days=5)).strftime("%Y-%m-%d")
    today = datetime.now().strftime("%Y-%m-%d")
    free_date = (datetime.now() + timedelta(days=60)).strftime("%Y-%m-%d")
    one_reserve_date = (datetime.now() + timedelta(days=20)).strftime("%Y-%m-%d")
    dates_available_quantity = json.loads(response.data)

    for date_quantity in dates_available_quantity:
        if date_quantity["date"] == today:
            assert date_quantity["quantity"] == 160
        if date_quantity["date"] == reserve_date:
            assert date_quantity["quantity"] == 160
        if date_quantity["date"] == one_reserve_date:
            assert date_quantity["quantity"] == 190
        if date_quantity["date"] == free_date:
            assert date_quantity["quantity"] == quantity_in_warehouse


def test_get_available_quantity_by_date_event(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    product: m.Product = db.session.scalar(
        m.Product.select().where(m.Product.name == "event_test_product")
    )
    date_from = datetime.now().strftime("%Y_%m_%d")
    date_to = (datetime.now() + timedelta(days=5)).strftime("%Y_%m_%d")
    quantity_desired = 100
    product_id = product.id
    group_name = "Events"
    product = db.session.get(m.Product, product_id)
    available_quantity = 160

    response = mg_g_populate.get(
        f"""/event/get_available_quantity_by_date?date_from={date_from}&date_to={date_to}&product_id={
            product_id}&group_name={group_name}&quantity={quantity_desired}""",
        follow_redirects=True,
    )

    assert response.status_code == HTTPStatus.OK

    quantity_desired = 200
    response = mg_g_populate.get(
        f"""/event/get_available_quantity_by_date?date_from={date_from}&date_to={date_to}&product_id={
            product_id}&group_name={group_name}&quantity={quantity_desired}""",
        follow_redirects=True,
    )

    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert (
        f"Product: {product.name}, available quantity: {available_quantity}"
        in response.text
    )
