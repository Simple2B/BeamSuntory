from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_suppliers_pages(client):
    logout(client)
    response = client.get("/supplier/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/supplier/")
    assert response.status_code == 200
    response = client.get("/supplier/create")
    assert response.status_code == 405


def test_create_supplier(client):
    login(client, "bob")

    response = client.post(
        "/supplier/create",
        data=dict(
            name="sup1",
            email="sup1@email.com",
            contact_number="380362470223",
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
    assert "Supplier added!" in response.text
    suppliers_rows_objs = db.session.execute(
        m.Supplier.select().where(m.Supplier.name == "sup1")
    ).all()
    assert len(suppliers_rows_objs) > 0


def test_delete_supplier(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.delete("/supplier/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    suppliers_rows_objs = db.session.execute(m.Supplier.select()).all()
    assert len(suppliers_rows_objs) == 0


def test_edit_supplier(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/supplier/save",
        data=dict(
            supplier_id=1,
            name="sup22",
            email="sup22@email.com",
            contact_number="380362470221",
            country="Can",
            region="Alba",
            city="Kan",
            address="st.1",
            zip="45778",
            active=True,
        ),
    )
    assert response.status_code == 302
    assert "supplier" in response.text
    suppliers_rows_objs = db.session.execute(
        m.Supplier.select().where(m.Supplier.name == "sup22")
    ).all()
    assert len(suppliers_rows_objs) > 0
