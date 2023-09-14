# from datetime import datetime, timedelta
# from flask.testing import FlaskClient
# from app import models as m, db
from tests.utils import login, register, logout


def test_event_pages(client):
    logout(client)
    response = client.get("/event/")
    assert response.status_code == 302

    register("samg", "samg@test.com")
    response = login(client, "samg")
    assert b"Login successful." in response.data

    response = client.get("/event/")
    assert response.status_code == 200


# def test_create_event(mg_g_populate: FlaskClient):
#     login(mg_g_populate)
#     start_date = (datetime.now() + timedelta(days=6)).strftime("%m/%d/%Y")
#     end_date = (datetime.now() + timedelta(days=11)).strftime("%m/%d/%Y")

#     response = mg_g_populate.post(
#         "/event/create",
#         data=dict(
#             date_from=start_date,
#             date_to=end_date,
#             quantity=200,
#             product_id=1,
#             comment="event for product 1",
#         ),
#         follow_redirects=True,
#     )
#     assert response.status_code == 200
#     assert "Event added!" in response.text
#     event_rows_objs = db.session.scalars(m.Event.select()).all()
#     assert len(event_rows_objs) > 0

#     start_date = (datetime.now() + timedelta(days=1)).strftime("%m/%d/%Y")

#     response = mg_g_populate.post(
#         "/event/create",
#         data=dict(
#             date_from=start_date,
#             date_to=end_date,
#             quantity=200,
#             product_id=1,
#             comment="event for product 1",
#         ),
#         follow_redirects=True,
#     )
#     assert response.status_code == 200
#     assert "The event must be created more than 5 days in advance" in response.text
#     event_rows_objs = db.session.scalars(m.Event.select()).all()
#     assert len(event_rows_objs) == 1
