from flask.testing import FlaskClient
from app import models as m, db
from tests.utils import login


def test_create_event(mg_g_populate: FlaskClient):
    login(mg_g_populate)

    response = mg_g_populate.post(
        "/event/create",
        data=dict(
            date_from="09/10/2021",
            date_to="09/20/2021",
            quantity=200,
            product_id=1,
            comment="event for product 1",
        ),
        follow_redirects=True,
    )
    assert response.status_code == 200
    assert "Event added!" in response.text
    event_rows_objs = db.session.scalars(m.Event.select()).all()
    assert len(event_rows_objs) > 0
