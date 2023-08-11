import io
from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login, register, logout


def test_products_pages(client):
    logout(client)
    response = client.get("/product/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/product/")
    assert response.status_code == 200
    response = client.get("/product/create")
    assert response.status_code == 405


def test_create_product(client):
    register("samg", "samg@test.com")
    login(client, "samg")
    data = dict(
        name="test_product",
        product_type="SIMPLE_PRODUCT",
        supplier=1,
        currency="CAD",
        regular_price=11,
        retail_price=111,
        description="desc",
        SKU="322ewd3333rf",
        low_stock_level=11,
        program_year=2023,
        premises="ON_PREMISE",
        package_qty=12,
        numb_of_items_per_case=22,
        numb_of_cases_per_outer_case=22,
        comments="comments",
        weight=11.0,
        length=11.0,
        width=11.0,
        height=11.0,
    )
    data["image"] = (io.BytesIO(b"abcdef"), "test.png")
    response = client.post(
        "/product/create",
        data=data,
    )
    assert response.status_code == 302
    assert "product" in response.text
    products_rows_objs = db.session.execute(m.Product.select()).all()
    assert len(products_rows_objs) > 0


def test_delete_product(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    before_delete_products_rows_objs = db.session.execute(m.Product.select()).all()

    response = mg_g_populate.delete("/product/delete/1")
    assert response.status_code == 200
    assert "ok" in response.text
    products_rows_objs = db.session.execute(m.Product.select()).all()
    assert len(products_rows_objs) < len(before_delete_products_rows_objs)


def test_edit_product(mg_g_populate: FlaskClient):
    login(mg_g_populate)
    data = dict(
        product_id=1,
        name="test_product_edited",
        product_type="SIMPLE_PRODUCT",
        supplier=1,
        currency="USD",
        regular_price=12,
        retail_price=112,
        image="imgpngbase64str",
        description="desc",
        SKU="322ewd3333rf",
        low_stock_level=11,
        program_year=2023,
        package_qty=12,
        numb_of_items_per_case=22,
        numb_of_cases_per_outer_case=22,
        comments="comments",
        weight=11.0,
        length=11.0,
        width=11.0,
        height=11.0,
    )
    data["image"] = (io.BytesIO(b"abcdef"), "test.png")

    response = mg_g_populate.post(
        "/product/edit",
        data=data,
    )
    assert response.status_code == 302
    assert "product" in response.text
    products_rows_objs = db.session.execute(m.Product.select()).all()
    assert len(products_rows_objs) > 0


def test_sort_product(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/product/sort",
        data=dict(sort_by='{"Country": "Canada", "Brand": "JB"}'),
    )
    assert ("populate_test_product" in response.text) is True
    assert ("populate_test_prod2" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/product/sort",
        data=dict(sort_by='{"Brand": "JB"}'),
    )
    # TODO: fix test
    # assert ("populate_test_product" in response.text) is False
    assert ("populate_test_prod2" in response.text) is True
    assert response.status_code == 200

    response = mg_g_populate.post(
        "/product/sort",
        data=dict(sort_by={"Brand": "JB"}),
        follow_redirects=True,
    )
    assert ("populate_test_product" in response.text) is True
    assert ("populate_test_prod2" in response.text) is True
    assert ("Wrong sort" in response.text) is True
    assert response.status_code == 200


def test_assign_product(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    group_name = "Canada"

    data = dict(
        name="populate_test_product",
        master_group=2,
        group=2,
        quantity=10,
        from_group=group_name,
    )

    response = mg_g_populate.post(
        "/product/assign",
        data=data,
    )
    assert response.status_code == 302
    assert "product" in response.text
    products_at_warehouse: m.WarehouseProduct = db.session.execute(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.group_id == 1,
            m.WarehouseProduct.product_quantity == 90,
        )
    ).scalar()
    assert products_at_warehouse.product_quantity

    response = mg_g_populate.post(
        "/product/assign",
        data=data,
    )
    assert response.status_code == 302
    assert "product" in response.text
    products_at_warehouse: m.WarehouseProduct = db.session.execute(
        m.WarehouseProduct.select().where(
            m.WarehouseProduct.group_id == 1, m.WarehouseProduct.product_quantity == 80
        )
    ).scalar()
    assert products_at_warehouse.product_quantity
