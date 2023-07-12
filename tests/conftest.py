import datetime

import pytest
from flask import Flask
from flask.testing import FlaskClient

from app import create_app, db
from app import models as m
from tests.utils import register


@pytest.fixture()
def app():
    app = create_app("testing")
    app.config.update(
        {
            "TESTING": True,
        }
    )

    yield app


@pytest.fixture()
def client(app: Flask):
    with app.test_client() as client:
        app_ctx = app.app_context()
        app_ctx.push()

        db.drop_all()
        db.create_all()
        register()

        yield client
        db.session.close_all()
        db.drop_all()
        app_ctx.pop()


@pytest.fixture()
def runner(app, client):
    from app import commands

    commands.init(app)

    yield app.test_cli_runner()


@pytest.fixture
def populate(client: FlaskClient):
    NUM_TEST_USERS = 16
    for i in range(NUM_TEST_USERS):
        m.User(
            username=f"user{i+1}",
            email=f"user{i+1}@mail.com",
            password="password",
            role="MANAGER",
            activated=True,
            approval_permission=True,
            street_address="street",
            phone_number="123456789",
            country="UK",
            region="Lv",
            city="Dro",
            zip_code="82100",
            sales_rep=False,
        ).save(False)
    db.session.commit()
    yield client


@pytest.fixture
def populate_one_user(client: FlaskClient):
    m.User(
        username="user",
        email="user@mail.com",
        password="password",
        role="MANAGER",
        activated=True,
        approval_permission=True,
        street_address="street",
        phone_number="123456789",
        country="UK",
        region="Lv",
        city="Dro",
        zip_code="82100",
        sales_rep=False,
    ).save(False)
    db.session.commit()
    yield client


@pytest.fixture
def mg_g_populate(client: FlaskClient):
    master_groups = ["Country", "Brand"]
    groups = {"Canada": "1", "JB": "2", "Bombay": "2"}

    m.User(
        username="user1",
        email="user1@mail.com",
        password="password",
        role="MANAGER",
        activated=True,
        approval_permission=True,
        street_address="street",
        phone_number="123456789",
        country="UK",
        region="Lv",
        city="Dro",
        zip_code="82100",
        sales_rep=False,
    ).save(False)

    for mg in master_groups:
        m.MasterGroup(
            name=mg,
        ).save(False)
    for g in groups:
        m.Group(
            name=g,
            master_group_id=groups[g],
        ).save(False)
    for mg in master_groups:
        m.MasterGroupProduct(
            name=mg,
        ).save(False)
    for g in groups:
        m.GroupProduct(
            name=g,
            master_group_id=groups[g],
        ).save(False)

    m.Product(
        name="populate_test_product",
        product_type="SIMPLE_PRODUCT",
        supplier_id=1,
        currency="CAD",
        regular_price=11,
        retail_price=111,
        image="imgpngbase64str",
        description="desc",
        SKU="322ewd3333rf",
        low_stock_level=11,
        shelf_life_start=datetime.datetime.now(),
        shelf_life_end=datetime.datetime.now(),
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
    ).save(False)
    m.Product(
        name="populate_test_prod2",
        product_type="SIMPLE_PRODUCT",
        supplier_id=1,
        currency="USD",
        regular_price=11,
        retail_price=111,
        image="imgpngbase64str",
        description="desc",
        SKU="322ewd3333rf",
        low_stock_level=11,
        shelf_life_start=datetime.datetime.now(),
        shelf_life_end=datetime.datetime.now(),
        program_year=2023,
        premises="OFF_PREMISE",
        package_qty=12,
        numb_of_items_per_case=22,
        numb_of_cases_per_outer_case=22,
        comments="comments",
        weight=11.0,
        length=11.0,
        width=11.0,
        height=11.0,
    ).save(False)
    m.ProductGroup(product_id=1, group_id=1).save(False)
    m.ProductGroup(product_id=2, group_id=2).save(False)

    m.Warehouse(
        name="Junewood warehouse",
        phone_number="380362470221",
        city="Bagmom",
        zip="unzip",
        address="sserdda",
        manager_id=1,
    ).save(False)
    db.session.commit()
    yield client
