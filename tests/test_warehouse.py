from flask.testing import FlaskClient
from app import schema as s
from app import models as m, db
from tests.utils import login, register, logout


def test_warehouses_pages(mg_g_populate: FlaskClient):
    logout(mg_g_populate)
    response = mg_g_populate.get("/warehouse/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(mg_g_populate, "samg")
    assert b"Login successful." in response.data

    response = mg_g_populate.get("/warehouse/")
    assert response.status_code == 200
    response = mg_g_populate.get("/warehouse/create")
    assert response.status_code == 405


def test_create_warehouse(mg_g_populate: FlaskClient):
    register("samg", "samg@test.com")
    login(mg_g_populate, "samg")

    response = mg_g_populate.post(
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
    logout(mg_g_populate)

    register("samm", "samm@test.com", role_name=s.UserRole.MANAGER.value)
    login(mg_g_populate, "samm")

    response = mg_g_populate.post(
        "/warehouse/create",
        data=dict(
            name="Manager warehouse",
            phone_number="380362470229",
            city="Bagmam",
            zip="unzip",
            address="sserdda",
            manager_id=4,
        ),
        follow_redirects=True,
    )
    assert "This user is not a warehouse manager" in response.text


def test_delete_warehouse(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    warehouses_rows_objs = db.session.execute(m.Warehouse.select()).all()
    assert len(warehouses_rows_objs) == 2
    response = mg_g_populate.delete("/warehouse/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    warehouses_rows_objs = db.session.execute(m.Warehouse.select()).all()
    assert len(warehouses_rows_objs) == 1


def test_edit_warehouse(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    role_sales = db.session.scalar(
        m.Division.select().where(m.Division.role_name == s.UserRole.SALES_REP.value)
    )
    register("samm", "samm@test.com", role_name=s.UserRole.SALES_REP.value)
    cur_user = db.session.scalar(m.User.select().where(m.User.role_obj == role_sales))
    response = mg_g_populate.post(
        "/warehouse/edit",
        data=dict(
            warehouse_id=1,
            name="Julywood warehouse",
            phone_number="380362470223",
            city="Baggranddad",
            zip="unzip",
            address="sserdda",
            manager_id=cur_user.id,
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
            manager_id=2,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "ok" in response.text
    warehouses_rows_objs = db.session.execute(
        m.Warehouse.select().where(m.Warehouse.name == "Julywood warehouse")
    ).all()
    assert len(warehouses_rows_objs) > 0
