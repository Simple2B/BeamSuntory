from sqlalchemy import select
from datetime import datetime
from flask import current_app as app
import sqlalchemy as sa
from flask.testing import FlaskClient, FlaskCliRunner
from click.testing import Result
from app import models as m, db
from tests.utils import login, register


def test_list(populate: FlaskClient):
    login(populate)
    DEFAULT_PAGE_SIZE = 8
    response = populate.get("/user/")
    assert response
    assert response.status_code == 200
    html = response.data.decode()
    users = db.session.scalars(m.User.select().order_by(m.User.id).limit(11)).all()
    assert len(users) == 11
    for user in users[:DEFAULT_PAGE_SIZE]:
        assert user.username in html
    assert users[10].username not in html

    populate.application.config["PAGE_LINKS_NUMBER"] = 6
    response = populate.get("/user/?page=6")
    assert response
    assert response.status_code == 200
    html = response.data.decode()
    assert "/user/?page=6" not in html
    assert "/user/?page=3" in html
    assert "/user/?page=2" in html


def test_create_admin(runner: FlaskCliRunner):
    res: Result = runner.invoke(args=["create-admin"])
    assert "admin created" in res.output
    query = m.User.select().where(m.User.username == app.config["ADMIN_USERNAME"])
    assert db.session.scalar(query)


def test_create_user(client):
    register("test", "tes@gmail.com")
    login(client, "test")

    response = client.post(
        "/user/create",
        data=dict(
            username="test_name",
            email="test_mail@gmail.com",
            role="ADMIN",
            password="test_password",
            activated=True,
            country="test_country",
            region="test_region",
            city="test_city",
            zip_code="test_zip_code",
            street_address="test_street_address",
            approval_permission=True,
            sales_rep=True,
        ),
    )
    assert response.status_code == 302
    assert "/user/" in response.text
    user_rows_objs = db.session.execute(m.User.select()).all()
    assert len(user_rows_objs) > 1
    query = m.User.select().where(m.User.username == "test_name")
    user = db.session.scalar(query)
    user = db.session.execute(
        m.User.select().where(m.User.username == "test_name")
    ).first()
    assert user[0].username == "test_name"


def test_populate_db(runner: FlaskCliRunner):
    TEST_COUNT = 16
    count_before = db.session.query(m.User).count()
    res: Result = runner.invoke(args=["db-populate", "--count", f"{TEST_COUNT}"])
    assert f"populated by {TEST_COUNT}" in res.stdout
    assert (db.session.query(m.User).count() - count_before) == TEST_COUNT


def test_delete_user(populate_one_user: FlaskClient):
    login(populate_one_user)
    response = populate_one_user.delete("/user/delete/2")
    assert response.status_code == 200
    assert "ok" in response.text
    user = db.session.execute(
        m.User.select().where(m.User.username == "test_name")
    ).first()
    assert not user


def test_edit_user(populate_one_user: FlaskClient):
    login(populate_one_user)

    new_street_address = "new_street_address"
    user: m.User = db.session.execute(
        select(m.User).where(m.User.username == "user")
    ).first()[0]

    response = populate_one_user.post(
        "/user/save",
        data=dict(
            user_id=user.id,
            username=user.username,
            email=user.email,
            password=user.password,
            role=user.role,
            activated=user.activated,
            approval_permission=user.approval_permission,
            street_address=new_street_address,
            country=user.country,
            region=user.region,
            city=user.city,
            zip_code=user.zip_code,
            sales_rep=user.sales_rep,
            password_confirmation=user.password,
            submit=True,
            group="Without group",
        ),
    )
    assert response.status_code == 302
    assert "/user/" in response.text
    users = db.session.execute(m.User.select()).all()
    assert len(users) > 0
    assert users[1][0].street_address == new_street_address


def test_ship_request_notifications(mg_g_populate: FlaskClient):
    login(mg_g_populate, "user1")
    notifications = db.session.scalars(
        sa.select(m.ShipRequestNotification).where(
            m.ShipRequestNotification.reviewed_datetime == datetime.max
        )
    ).all()
    assert notifications
    response = mg_g_populate.get("/user/ship-request-notifications")
    assert response.status_code == 200
    assert "notification-list-conteiner" in response.text
    notifications = db.session.scalars(
        sa.select(m.ShipRequestNotification).where(
            m.ShipRequestNotification.reviewed_datetime == datetime.max
        )
    ).all()
    assert not notifications


def test_request_shere_notifications(mg_g_populate: FlaskClient):
    login(mg_g_populate, "meng2")
    notifications = db.session.scalars(
        sa.select(m.RequestShareUser).where(
            m.RequestShareUser.reviewed_datetime == datetime.max
        )
    ).all()
    assert notifications
    response = mg_g_populate.get("/user/request-share-notifications")
    assert response.status_code == 200
    assert "notification-list-conteiner" in response.text
    notifications = db.session.scalars(
        sa.select(m.RequestShareUser).where(
            m.RequestShareUser.reviewed_datetime == datetime.max
        )
    ).all()
    assert not notifications
