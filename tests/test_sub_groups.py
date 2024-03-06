from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_groups_pages(client):
    logout(client)
    response = client.get("/sub_stock_target_group/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/sub_stock_target_group/")
    assert response.status_code == 200
    response = client.get("/sub_stock_target_group/create")
    assert response.status_code == 405


def test_create_sub_group(mg_g_populate: FlaskClient):
    register("samg", "samg@test.com")
    login(mg_g_populate, "samg")
    parent_group = db.session.get(m.Group, 1)
    sub_group = db.session.get(m.Group, 2)

    response = mg_g_populate.post(
        "/sub_stock_target_group/create",
        data=dict(group_id=parent_group.id, sub_group_id=sub_group.id),
    )
    assert response.status_code == 302
    assert "group" in response.text
    sub_groups_rows_objs = db.session.execute(
        m.Group.select().where(m.Group.parent_group_id.is_not(None))
    ).all()
    assert len(sub_groups_rows_objs) > 1


def test_delete_sub_group(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    sub_groups = db.session.scalars(
        m.Group.select().where(m.Group.parent_group_id.isnot(None))
    ).all()

    response = mg_g_populate.delete("/sub_stock_target_group/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    after_delete_sub_groups = db.session.scalars(
        m.Group.select().where(m.Group.parent_group_id.isnot(None))
    ).all()
    assert len(after_delete_sub_groups) < len(sub_groups)


def test_edit_sub_group(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    sub_group: m.Group = db.session.scalars(
        m.Group.select().where(m.Group.parent_group_id.isnot(None))
    ).first()

    parent_group: m.Group = db.session.scalar(
        m.Group.select().where(m.Group.id != sub_group.parent_group_id)
    )

    new_sub_group: m.Group = db.session.scalar(
        m.Group.select().where(
            m.Group.id != sub_group.id, m.Group.id != parent_group.id
        )
    )

    response = mg_g_populate.post(
        "/sub_stock_target_group/edit",
        data=dict(
            group_id=sub_group.id,
            new_sub_group_id=new_sub_group.id,
            parent_group_id=parent_group.id,
        ),
    )
    assert response.status_code == 302
    assert "group" in response.text
    after_edit_sub_group: m.Group = db.session.scalar(
        m.Group.select().where(m.Group.id == sub_group.id)
    )
    after_edit_new_sub_group: m.Group = db.session.scalar(
        m.Group.select().where(m.Group.id == new_sub_group.id)
    )
    assert after_edit_sub_group.parent_group_id is None
    assert after_edit_new_sub_group.parent_group_id == parent_group.id
