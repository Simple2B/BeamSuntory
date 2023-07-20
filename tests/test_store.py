from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_stores_pages(client):
    logout(client)
    response = client.get("/store/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/store/")
    assert response.status_code == 200
    response = client.get("/store/create")
    assert response.status_code == 405


def test_create_store(client):
    login(client, "bob")

    response = client.post(
        "/store/create",
        data=dict(
            store_category="bar",
            store_name="JBbar",
            contact_person="John",
            email="store@email.com",
            phone_numb="380362470223",
            country="Can",
            region="Alba",
            city="Kan",
            address="st.1",
            zip="45778",
            active=True,
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Store added!" in response.text
    stores_rows_objs = db.session.execute(
        m.Store.select().where(m.Store.store_name == "JBbar")
    ).all()
    assert len(stores_rows_objs) > 0


def test_delete_store(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    stores_rows_objs = db.session.execute(m.Store.select()).all()
    assert len(stores_rows_objs) == 1
    response = mg_g_populate.delete("/store/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    stores_rows_objs = db.session.execute(m.Store.select()).all()
    assert len(stores_rows_objs) == 0


def test_edit_store(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    stores_rows_objs = db.session.execute(
        m.Store.select().where(m.Store.store_name == "JB-restaurant")
    ).first()
    assert len(stores_rows_objs) == 1

    response = mg_g_populate.post(
        "/store/save",
        data=dict(
            store_id=1,
            store_category="bar",
            store_name="JBbar",
            contact_person="John",
            email="store@email.com",
            phone_numb="380362470223",
            country="Can",
            region="Alba",
            city="Kan",
            address="st.1",
            zip="45778",
            active=True,
        ),
    )
    assert response.status_code == 302
    assert "store" in response.text
    stores_rows_objs = db.session.execute(
        m.Store.select().where(m.Store.store_name == "JBbar")
    ).first()
    assert len(stores_rows_objs) == 1
