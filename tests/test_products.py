import io
from pathlib import Path

import filetype
from flask.testing import FlaskClient
import sqlalchemy as sa

from app import models as m, db
from tests.utils import login, register, logout


def test_products_pages(mg_g_populate: FlaskClient):
    logout(mg_g_populate)
    response = mg_g_populate.get("/product/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(mg_g_populate, "samg")
    assert b"Login successful." in response.data

    response = mg_g_populate.get("/product/")
    assert response.status_code == 200
    response = mg_g_populate.get("/product/create")
    assert response.status_code == 405


def test_create_product(client: FlaskClient, mocker):
    kind = filetype.guess("tests/data/no_picture_default.png")
    mocker.patch.object(filetype, "guess", return_value=kind)
    mocker.patch.object(filetype, "is_image", return_value=True)
    register("samg", "samg@test.com")
    login(client, "samg")
    data = dict(
        name="test_product",
        supplier=1,
        currency="CAD",
        regular_price=9,
        retail_price=11,
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
        product_groups="[1,2,3]",
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


# TODO
# def test_delete_product(mg_g_populate: FlaskClient):
#     login(mg_g_populate)

#     before_delete_products_rows_objs = db.session.scalars(sa.select(m.Product)).all()

#     response = mg_g_populate.delete(
#         f"/product/delete/{before_delete_products_rows_objs[1].id}"
#     )
#     assert response.status_code == 200
#     products_rows_objs = db.session.scalars(sa.select(m.Product)).all()
#     assert len(products_rows_objs) < len(before_delete_products_rows_objs)

#     response = mg_g_populate.delete("/product/delete/100")
#     assert response.status_code == 404


def test_edit_product(mg_g_populate: FlaskClient, mocker):
    kind = filetype.guess("tests/data/no_picture_default.png")
    mocker.patch.object(filetype, "guess", return_value=kind)
    mocker.patch.object(filetype, "is_image", return_value=True)
    login(mg_g_populate)
    data = dict(
        product_id=1,
        name="test_product_edited",
        supplier=1,
        currency="USD",
        regular_price=9,
        retail_price=11,
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
        product_groups="[1,2,3]",
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

    brand = "JB"
    response = mg_g_populate.get(
        f"""/product?master_groups={brand}""",
        follow_redirects=True,
    )

    assert ("populate_test_product" in response.text) is False
    assert ("populate_test_prod2" in response.text) is True
    assert response.status_code == 200

    brand = "Canada"
    response = mg_g_populate.get(
        f"""/product?master_groups={brand}""",
        follow_redirects=True,
    )

    assert ("populate_test_product" in response.text) is True
    assert ("populate_test_prod2" in response.text) is False
    assert response.status_code == 200


def test_assign_product(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    group_name = "Canada"
    to_group = "JB"
    prod_SKU = "322ewd3333rs3"

    db.session.query(m.Cart).filter(m.Cart.id != 1, m.Cart != 2).delete()
    db.session.commit()

    data = dict(
        product_SKU=prod_SKU,
        master_group=2,
        group=to_group,
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

    assign_objs: m.Assign = db.session.scalars(
        m.Assign.select().where(
            m.Assign.group_id == 2,
            m.Assign.product.has(m.Product.SKU == prod_SKU),
        )
    ).all()
    report_assign_objs: m.ReportInventoryList = db.session.scalars(
        m.ReportInventoryList.select().where(
            m.ReportInventoryList.type == "Product Assigned",
        )
    ).all()

    assert len(assign_objs) == 1
    assert len(report_assign_objs) == 1

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

    assign_objs: m.Assign = db.session.scalars(
        m.Assign.select().where(
            m.Assign.group_id == 2,
            m.Assign.product.has(m.Product.SKU == prod_SKU),
        )
    ).all()
    report_assign_objs: m.ReportInventoryList = db.session.scalars(
        m.ReportInventoryList.select().where(
            m.ReportInventoryList.type == "Product Assigned",
        )
    ).all()

    assert len(assign_objs) == 2
    assert len(report_assign_objs) == 2


def test_upload_product(mg_g_populate: FlaskClient, mocker):
    kind = filetype.guess("tests/data/no_picture_default.png")
    mocker.patch.object(filetype, "guess", return_value=kind)
    mocker.patch.object(filetype, "is_image", return_value=True)
    login(mg_g_populate)

    # CSV_NAME = "All Products part 5.csv"
    CSV_NAME = "Book.csv"
    CSV_PATH = Path("tests") / "data" / CSV_NAME

    with open(CSV_PATH, "rb") as f:
        file_csv = (io.BytesIO(f.read()), CSV_NAME)

    response_no_group = mg_g_populate.post(
        "/product/upload",
        data=dict(
            upload_csv=file_csv,
            target_group_upload=0,
        ),
    )

    assert response_no_group.status_code == 302

    all_products = db.session.scalar(sa.select(sa.func.count()).select_from(m.Product))
    all_warehouse_products = db.session.scalar(
        sa.select(sa.func.count()).select_from(m.WarehouseProduct)
    )

    assert all_products > 8
    assert all_warehouse_products < 9

    group_upload_to: m.Group = db.session.scalar(m.Group.select())

    assert group_upload_to

    with open(CSV_PATH, "rb") as f:
        file_csv = (io.BytesIO(f.read()), CSV_NAME)

    response_with_group = mg_g_populate.post(
        "/product/upload",
        data=dict(
            upload_csv=file_csv,
            target_group_upload=group_upload_to.id,
        ),
    )

    assert response_with_group.status_code == 302

    all_products_with_groups = db.session.scalar(
        sa.select(sa.func.count()).select_from(m.Product)
    )
    all_warehouse_products_with_groups = db.session.scalar(
        sa.select(sa.func.count()).select_from(m.WarehouseProduct)
    )

    assert all_products_with_groups == all_products
    assert all_warehouse_products_with_groups > all_warehouse_products
    assert all_warehouse_products_with_groups > 9
