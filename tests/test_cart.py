from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_carts_pages(client):
    logout(client)
    response = client.get("/cart/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/cart/")
    assert response.status_code == 200
    response = client.get("/cart/create")
    assert response.status_code == 405


def test_create_cart(client):
    login(client, "bob")

    response = client.post(
        "/cart/create",
        data=dict(
            product_id=1,
            quantity=11,
            user_id=1,
            group="JB",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Item added!" in response.text
    carts_rows_objs = db.session.execute(
        m.Cart.select().where(
            m.Cart.group == "JB",
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 11,
        )
    ).all()
    assert len(carts_rows_objs) > 0


def test_delete_cart(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    carts_rows_objs = db.session.execute(m.Cart.select()).all()
    assert len(carts_rows_objs) == 2
    response = mg_g_populate.delete("/cart/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    carts_rows_objs = db.session.execute(m.Cart.select()).all()
    assert len(carts_rows_objs) == 1


def test_edit_cart(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    carts_rows_objs = db.session.execute(
        m.Cart.select().where(
            m.Cart.group == "JB",
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 11,
        )
    ).first()
    assert len(carts_rows_objs) == 1

    response = mg_g_populate.post(
        "/cart/edit",
        data=dict(
            cart_id=1,
            product_id=1,
            quantity=211,
            user_id=1,
            group="Canada",
        ),
    )
    assert response.status_code == 302
    assert "cart" in response.text
    carts_rows_objs = db.session.execute(
        m.Cart.select().where(
            m.Cart.group == "Canada",
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 211,
        )
    ).all()
    assert len(carts_rows_objs) == 0
    carts_rows_objs = db.session.execute(
        m.Cart.select().where(
            m.Cart.group == "JB",
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 211,
        )
    ).all()
    assert len(carts_rows_objs) == 1
