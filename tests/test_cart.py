from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_carts_pages(mg_g_populate: FlaskClient):
    logout(mg_g_populate)
    response = mg_g_populate.get("/cart/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(mg_g_populate, "samg")
    assert b"Login successful." in response.data

    response = mg_g_populate.get("/cart/")
    assert response.status_code == 200
    response = mg_g_populate.get("/cart/create")
    assert response.status_code == 405


def test_create_cart(mg_g_populate: FlaskClient):
    login(mg_g_populate, "bob")

    group_jb: m.Group = db.session.scalar(m.Group.select().where(m.Group.name == "JB"))

    response = mg_g_populate.post(
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
            m.Cart.group_id == group_jb.id,
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 11,
        )
    ).all()
    assert len(carts_rows_objs) > 0


def test_delete_cart(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    carts_rows_objs = db.session.execute(m.Cart.select()).all()
    assert len(carts_rows_objs) == 7
    response = mg_g_populate.delete("/cart/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    carts_rows_objs = db.session.execute(m.Cart.select()).all()
    assert len(carts_rows_objs) == 6


def test_edit_cart(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    group_canada: m.Group = db.session.scalar(
        m.Group.select().where(m.Group.name == "Canada")
    )
    group_jb: m.Group = db.session.scalar(m.Group.select().where(m.Group.name == "JB"))

    carts_rows_objs = db.session.execute(
        m.Cart.select().where(
            m.Cart.group_id == group_jb.id,
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 11,
        )
    ).first()
    assert len(carts_rows_objs) == 1

    cart_canada: m.Cart = db.session.scalar(
        m.Cart.select().where(m.Cart.group_id == group_canada.id)
    )

    response = mg_g_populate.post(
        "/cart/edit",
        data=dict(
            cart_id=cart_canada.id,
            quantity=211,
        ),
    )
    assert response.status_code == 302
    assert "cart" in response.text
    carts_rows_objs = db.session.execute(
        m.Cart.select().where(
            m.Cart.group == group_canada,
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 211,
        )
    ).all()
    assert len(carts_rows_objs) == 1
    carts_rows_objs = db.session.execute(
        m.Cart.select().where(
            m.Cart.group == group_jb,
            m.Cart.user_id == 1,
            m.Cart.product_id == 1,
            m.Cart.quantity == 211,
        )
    ).all()
    assert len(carts_rows_objs) == 0
