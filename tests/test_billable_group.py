from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_groups_pages(client):
    logout(client)
    response = client.get("/billable_group/")
    assert response.status_code == 302
    response = client.get("/master_billable_group/")
    assert response.status_code == 302

    register("samg", "samg@test.com", "Stolyar7*", "warehouse_manager")
    response = login(client, "samg", "Stolyar7*")
    assert b"Login successful." in response.data

    response = client.get("/billable_group/")
    assert response.status_code == 200
    response = client.get("/master_billable_group/")
    assert response.status_code == 200


def test_create_master_group(client):
    register("samg", "samg@test.com", "Stolyar7*", "warehouse_manager")
    response = login(client, "samg", "Stolyar7*")
    assert b"Login successful." in response.data

    response = client.post("/master_billable_group/create", data=dict(name="Boxes"))
    assert response.status_code == 302
    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert len(master_groups_rows_objs) > 0

    # response = client.post(
    #     "/stock_target_group/create", data=dict(name="Maywood", master_group="1")
    # )
    # assert response.status_code == 302
    # assert "group" in response.text
    # groups_rows_objs = db.session.execute(m.Group.select()).all()
    # assert len(groups_rows_objs) > 0


def test_delete_group(client):
    register("samg", "samg@test.com", "Stolyar7*", "warehouse_manager")
    response = login(client, "samg", "Stolyar7*")
    assert b"Login successful." in response.data

    response = client.post("/master_billable_group/create", data=dict(name="Boxes"))
    assert response.status_code == 302
    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert len(master_groups_rows_objs) == 1

    master_group = master_groups_rows_objs[0][0]
    response = client.delete(f"/master_billable_group/delete/{master_group.id}")

    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert len(master_groups_rows_objs) == 0


# def test_edit_group(mg_g_populate: FlaskClient):
#     login(mg_g_populate)

#     response = mg_g_populate.post(
#         "/master_group/edit", data=dict(master_group_id=1, name="Premise")
#     )
#     assert response.status_code == 302
#     assert "master_group" in response.text
#     master_groups_rows_objs = db.session.execute(m.MasterGroup.select()).all()
#     assert len(master_groups_rows_objs) > 0
#     assert master_groups_rows_objs[0][0].name == "Premise"

#     response = mg_g_populate.post(
#         "/stock_target_group/edit", data=dict(group_id=1, name="BJ", master_group="1")
#     )
#     assert response.status_code == 302
#     assert "group" in response.text
#     groups_rows_objs = db.session.execute(m.Group.select()).all()
#     assert len(groups_rows_objs) > 0
