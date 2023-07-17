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
            manager_id=2,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Warehouse added!" in response.text
    warehouses_rows_objs = db.session.execute(m.Warehouse.select()).all()
    assert len(warehouses_rows_objs) > 0
    logout(client)

    register("samm", "samm@test.com", role="MANAGER")
    login(client, "samm")

    response = client.post(
        "/warehouse/create",
        data=dict(
            name="Manager warehouse",
            phone_number="380362470229",
            city="Bagmam",
            zip="unzip",
            address="sserdda",
            manager_id=3,
        ),
        follow_redirects=True,
    )
    assert "This user is not a warehouse manager" in response.text


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
            warehouse_id=1,
            name="Julywood warehouse",
            phone_number="380362470223",
            city="Baggranddad",
            zip="unzip",
            address="sserdda",
            manager_id=2,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "This user is not a warehouse manager." in response.text
    warehouses_rows_objs = db.session.execute(
        m.Warehouse.select().where(m.Warehouse.name == "Julywood warehouse")
    ).all()

    assert len(warehouses_rows_objs) == 0

    response = mg_g_populate.post(
        "/warehouse/edit",
        data=dict(
            warehouse_id=1,
            name="Julywood warehouse",
            phone_number="380362470223",
            city="Baggranddad",
            zip="unzip",
            address="sserdda",
            manager_id=1,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "ok" in response.text
    warehouses_rows_objs = db.session.execute(
        m.Warehouse.select().where(m.Warehouse.name == "Julywood warehouse")
    ).all()
    assert len(warehouses_rows_objs) > 0
