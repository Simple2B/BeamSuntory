from flask.testing import FlaskClient
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
            type="User",
            parent_role="Manager",
            activated=True,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Role added!" in response.text
    division_rows_objs = db.session.execute(
        m.Division.select().where(m.Division.role_name == "Sales_Rep")
    ).all()
    assert len(division_rows_objs) > 0


def test_delete_division(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.delete("/division/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    divisions_rows_objs = db.session.execute(m.Division.select()).all()
    assert len(divisions_rows_objs) == 0


def test_edit_division(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/division/save",
        data=dict(
            division_id=1,
            role_name="Warehouse_Manager",
            parent_role="Manager",
            activated=False,
            type="Master",
        ),
    )
    assert response.status_code == 302
    assert "division" in response.text
    divisions_rows_objs = db.session.execute(
        m.Division.select().where(m.Division.role_name == "Warehouse_Manager")
    ).all()
    assert len(divisions_rows_objs) > 0

    # response = mg_g_populate.post(
    #     "/division/save",
    #     data=dict(
    #         division_id=1,
    #         role_name="Warehouse_Manager",
    #         type="Master",
    #         parent_role="Warehouse_Manager",
    #         activated=False,
    #     ),
    #     follow_redirects=True,
    # )
    # assert response.status_code == 304
    # assert "Role Sales_Rep can not belong to parent role Sales_Rep" in response.text
