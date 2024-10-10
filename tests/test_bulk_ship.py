# flake8: noqa W291
import filetype
from flask.testing import FlaskClient
from app import models as m, db
from app import schema as s
import sqlalchemy as sa
from tests.utils import login, register, logout


def get_test_data(
    mg_g_populate: FlaskClient, bulk_ship_access=True
) -> tuple[m.User, m.BulkShip]:
    login(mg_g_populate)
    user = db.session.scalar(sa.select(m.User).where(m.User.username == "bob"))
    bulk_ship = db.session.scalar(sa.select(m.BulkShip))
    user.has_access_bulk_ship = bulk_ship_access
    db.session.commit()
    return user, bulk_ship


def test_get_all(mg_g_populate: FlaskClient):
    get_test_data(mg_g_populate)
    bulk_ship = db.session.scalar(sa.select(m.BulkShip))
    assert bulk_ship

    res = mg_g_populate.get("/bulk-ship", follow_redirects=True)
    assert res.status_code == 200
    assert bulk_ship.uuid in res.text


def test_download_template(mg_g_populate: FlaskClient):
    user, _ = get_test_data(mg_g_populate, bulk_ship_access=False)
    assert user
    assert not user.has_access_bulk_ship

    res = mg_g_populate.get("/bulk-ship/download-template")
    assert res.status_code == 403

    user.has_access_bulk_ship = True
    db.session.commit()

    res = mg_g_populate.get("/bulk-ship/download-template")
    assert res.status_code == 200


def test_get_create_modal(mg_g_populate: FlaskClient, mocker):
    _, _ = get_test_data(mg_g_populate)
    res = mg_g_populate.get("/bulk-ship/create")
    assert res.status_code == 200
    assert b"Add" in res.data


def test_create(mg_g_populate: FlaskClient, mocker):
    kind = filetype.guess("tests/data/test.xlsx")
    mocker.patch.object(filetype, "guess", return_value=kind)
    user, _ = get_test_data(mg_g_populate)
    with open("tests/data/test.xlsx", "rb") as f:
        res = mg_g_populate.post(
            "/bulk-ship/create",
            data=dict(
                name="test2",
                exel_file=(f, "test.xlsx"),
                headers={
                    "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                },
            ),
        )
        assert res.status_code == 200

    bulk_ship = db.session.scalar(
        sa.select(m.BulkShip).where(m.BulkShip.name == "test2")
    )
    assert bulk_ship
    assert bulk_ship.user_id == user.id
    assert bulk_ship.name == "test2"


def test_bulk_ship_template_download(mg_g_populate: FlaskClient):
    _, bulk_ship = get_test_data(mg_g_populate)
    res = mg_g_populate.get(f"/bulk-ship/{bulk_ship.uuid}/download-template")
    assert res.status_code == 200


def test_view(mg_g_populate: FlaskClient):
    _, bulk_ship = get_test_data(mg_g_populate)
    res = mg_g_populate.get(f"/bulk-ship/{bulk_ship.uuid}/view")
    assert res.status_code == 200
    assert "View" in res.text


def test_delete(mg_g_populate: FlaskClient):
    _, bulk_ship = get_test_data(mg_g_populate)

    res = mg_g_populate.delete(f"/bulk-ship/{bulk_ship.uuid}/delete")
    assert res.status_code == 204
    assert bulk_ship.is_deleted

    res = mg_g_populate.get("/bulk-ship", follow_redirects=True)
    assert res.status_code == 200
    assert bulk_ship.uuid not in res.text
