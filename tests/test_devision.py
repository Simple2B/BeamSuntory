import sqlalchemy as sa
from flask.testing import FlaskClient
from app import schema as s
from app import models as m, db
from tests.utils import login, register, logout


def test_divisions_pages(client):
    logout(client)
    response = client.get("/division/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/division/")
    assert response.status_code == 200
    response = client.get("/division/create")
    assert response.status_code == 405


def test_create_division(client):
    login(client, "bob")

    response = client.post(
        "/division/create",
        data=dict(
            role_name="Sales_Rep",
            activated=True,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Role added!" in response.text
    division_rows_objs = db.session.execute(
        m.Division.select().where(m.Division.role_name == s.UserRole.SALES_REP.value)
    ).all()
    assert len(division_rows_objs) > 0


def test_delete_division(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    role = m.Division(role_name="default_manager")
    role.save()
    divisions_count = db.session.scalar(sa.func.count(m.Division.id))
    response = mg_g_populate.delete(f"/division/delete/{role.id}")
    assert response.status_code == 200
    assert "ok" in response.text
    assert divisions_count - 1 == db.session.scalar(sa.func.count(m.Division.id))


def test_edit_division(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/division/save",
        data=dict(
            division_id=1,
            role_name=s.UserRole.WAREHOUSE_MANAGER.value,
            activated=False,
        ),
    )
    assert response.status_code == 302
    assert "division" in response.text
    divisions_rows_objs = db.session.execute(
        m.Division.select().where(
            m.Division.role_name == s.UserRole.WAREHOUSE_MANAGER.value
        )
    ).all()
    assert len(divisions_rows_objs) > 0
