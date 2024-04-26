from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_groups_pages(client):
    logout(client)
    response = client.get("/stock_target_group/")
    assert response.status_code == 302
    response = client.get("/master_group/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/stock_target_group/")
    assert response.status_code == 200
    response = client.get("/master_group/")
    assert response.status_code == 200
    response = client.get("/stock_target_group/create")
    assert response.status_code == 405
    response = client.get("/master_group/create")
    assert response.status_code == 405


def test_create_group(client):
    register("samg", "samg@test.com")
    login(client, "samg")

    response = client.post("/master_group/create", data=dict(name="Country"))
    assert response.status_code == 302
    assert "master_group" in response.text
    master_groups_rows_objs = db.session.execute(m.MasterGroup.select()).all()
    assert len(master_groups_rows_objs) > 0

    response = client.post(
        "/stock_target_group/create", data=dict(name="Maywood", master_group="1")
    )
    assert response.status_code == 302
    assert "group" in response.text
    groups_rows_objs = db.session.execute(m.Group.select()).all()
    assert len(groups_rows_objs) > 0


def test_delete_group(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    before_delete_master_groups_rows_objs = db.session.execute(
        m.MasterGroup.select()
    ).all()

    response = mg_g_populate.delete("/master_group/delete/1")
    assert response.status_code == 202
    assert "can not delete master group" in response.text
    master_groups_rows_objs = db.session.execute(m.MasterGroup.select()).all()
    assert len(master_groups_rows_objs) == len(before_delete_master_groups_rows_objs)

    response = mg_g_populate.delete("/stock_target_group/delete/1")
    assert response.status_code == 409

    response = mg_g_populate.delete("/master_group/delete/1")
    assert response.status_code == 202


def test_edit_group(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/master_group/edit", data=dict(master_group_id=1, name="Premise")
    )
    assert response.status_code == 302
    assert "master_group" in response.text
    master_groups_rows_objs = db.session.execute(m.MasterGroup.select()).all()
    assert len(master_groups_rows_objs) > 0
    assert master_groups_rows_objs[0][0].name == "Premise"

    response = mg_g_populate.post(
        "/stock_target_group/edit", data=dict(group_id=1, name="BJ", master_group="1")
    )
    assert response.status_code == 302
    assert "group" in response.text
    groups_rows_objs = db.session.execute(m.Group.select()).all()
    assert len(groups_rows_objs) > 0
