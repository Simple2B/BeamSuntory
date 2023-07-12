from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_warehouses_pages(client):
    logout(client)
    response = client.get("/warehouse/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/warehouse/")
    assert response.status_code == 200
    response = client.get("/warehouse/create")
    assert response.status_code == 405


def test_create_warehouse(client):
    register("samg", "samg@test.com")
    login(client, "samg")

    response = client.post(
        "/warehouse/create",
        data=dict(
            name="Maywood warehouse",
            phone_number="380362470225",
            city="Bagdad",
            zip="unzip",
            address="sserdda",
            manager_id=1,
        ),
    )
    assert response.status_code == 302
    assert "warehouse" in response.text
    warehouses_rows_objs = db.session.execute(m.Warehouse.select()).all()
    assert len(warehouses_rows_objs) > 0


def test_delete_warehouse(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.delete("/warehouse/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    warehouses_rows_objs = db.session.execute(m.Warehouse.select()).all()
    assert len(warehouses_rows_objs) == 0


def test_edit_warehouse(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/warehouse/edit",
        data=dict(
            name="Julywood warehouse",
            phone_number="380362470223",
            city="Baggranddad",
            zip="unzip",
            address="sserdda",
            manager_id=1,
        ),
    )
    assert response.status_code == 302
    assert "warehouse" in response.text
    warehouses_rows_objs = db.session.execute(m.Warehouse.select()).all()
    assert len(warehouses_rows_objs) > 0
