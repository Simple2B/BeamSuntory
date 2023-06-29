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
    m.User(
        username="user1",
        email="user1@mail.com",
        password="password",
        role="MANAGER",
        activated=True,
        approval_permission=True,
        street_address="street",
        country="UK",
        region="Lv",
        city="Dro",
        zip_code="82100",
        sales_rep=False,
    ).save(False)
    m.MasterGroup(
        name="Country",
    ).save(False)
    m.Group(
        name="Maywood",
        master_group_id="1",
    ).save(False)
    db.session.commit()
    yield client
