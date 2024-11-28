from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_groups_pages(client: FlaskClient):
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


def test_create_master_group(client: FlaskClient):
    register("samg", "samg@test.com", "Stolyar7*", "warehouse_manager")
    response = login(client, "samg", "Stolyar7*")
    assert b"Login successful." in response.data

    response = client.post("/master_billable_group/create", data=dict(name="Boxes"))
    assert response.status_code == 302
    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert len(master_groups_rows_objs) > 0

    response = client.post(
        "/billable_group/create",
        data=dict(name="Small Box", master_billable_group_id="1", rate="10"),
    )
    assert response.status_code == 302
    assert "group" in response.text
    billable_groups = db.session.execute(m.BillableGroup.select()).all()
    assert len(billable_groups) > 0


def test_delete_group(client: FlaskClient):
    register("samg", "samg@test.com", "Stolyar7*", "warehouse_manager")
    response = login(client, "samg", "Stolyar7*")
    assert b"Login successful." in response.data

    response = client.post("/master_billable_group/create", data=dict(name="Boxes"))
    assert response.status_code == 302
    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert len(master_groups_rows_objs) == 1

    # create and delete billable group

    response = client.post(
        "/billable_group/create",
        data=dict(name="Small Box", master_billable_group_id="1", rate="10"),
    )
    assert response.status_code == 302
    billable_groups = db.session.execute(m.BillableGroup.select()).all()
    assert len(billable_groups) == 1

    billable_group = billable_groups[0][0]
    response = client.delete(f"/billable_group/delete/{billable_group.id}")

    billable_groups = db.session.execute(m.BillableGroup.select()).all()
    assert len(billable_groups) == 0

    master_group = master_groups_rows_objs[0][0]
    response = client.delete(f"/master_billable_group/delete/{master_group.id}")

    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert len(master_groups_rows_objs) == 0


def test_edit_group(client: FlaskClient):
    register("samg", "samg@test.com", "Stolyar7*", "warehouse_manager")
    response = login(client, "samg", "Stolyar7*")
    assert b"Login successful." in response.data

    response = client.post("/master_billable_group/create", data=dict(name="Boxes"))
    assert response.status_code == 302
    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert len(master_groups_rows_objs) == 1

    master_billable_group = master_groups_rows_objs[0][0]

    response = client.post(
        "/master_billable_group/edit",
        data=dict(master_billable_group_id=master_billable_group.id, name="Boxes1"),
    )
    assert response.status_code == 302
    master_groups_rows_objs = db.session.execute(m.MasterBillableGroup.select()).all()
    assert master_groups_rows_objs[0][0].name == "Boxes1"

    response = client.post(
        "/billable_group/create",
        data=dict(name="Small Box", master_billable_group_id="1", rate="10"),
    )
    assert response.status_code == 302

    billable_groups = db.session.execute(m.BillableGroup.select()).all()
    assert len(billable_groups) == 1

    billable_group = billable_groups[0][0]

    response = client.post(
        "/billable_group/edit",
        data=dict(
            billable_group_id=billable_group.id,
            name="Small Box1",
            master_billable_group_id="1",
            rate="20",
        ),
    )

    assert response.status_code == 302
    billable_groups = db.session.execute(m.BillableGroup.select()).all()
    assert len(billable_groups) == 1
    assert billable_groups[0][0].name == "Small Box1"
    assert billable_groups[0][0].rate == 20
