from flask import current_app as app
from flask.testing import FlaskClient, FlaskCliRunner
from click.testing import Result
from app import models as m, db
from tests.utils import login, register


def test_list(populate: FlaskClient):
    login(populate)
    DEFAULT_PAGE_SIZE = app.config["DEFAULT_PAGE_SIZE"]
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
            email="test_mail",
            role="test_role",
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
    user_rows_objs = db.session.execute(m.User.select()).all()
    assert len(user_rows_objs) > 1


def test_populate_db(runner: FlaskCliRunner):
    TEST_COUNT = 16
    count_before = db.session.query(m.User).count()
    res: Result = runner.invoke(args=["db-populate", "--count", f"{TEST_COUNT}"])
    assert f"populated by {TEST_COUNT}" in res.stdout
    assert (db.session.query(m.User).count() - count_before) == TEST_COUNT


def test_delete_user(populate: FlaskClient):
    login(populate)
    uc = db.session.query(m.User).count()
    response = populate.delete("/user/delete/1")
    assert db.session.query(m.User).count() < uc
    assert response.status_code == 200
