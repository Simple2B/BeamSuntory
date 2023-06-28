from app.models import User

TEST_ADMIN_NAME = "bob"
TEST_ADMIN_EMAIL = "bob@test.com"
TEST_ADMIN_PASSWORD = "password"
TEST_ADMIN_FULL_NAME = "bob suntory"
TEST_ADMIN_NAME = "MANAGER"


def register(
    username=TEST_ADMIN_NAME,
    email=TEST_ADMIN_EMAIL,
    password=TEST_ADMIN_PASSWORD,
    role=TEST_ADMIN_NAME,
):
    user = User(
        username=username,
        email=email,
        role=role,
        activated=True,
        approval_permission=True,
        group_id=1,
        street_address="street",
        country="UK",
        region="Lv",
        city="Dro",
        zip_code="82100",
        locker_address="Address locker",
    )
    user.password = password
    user.save()
    return user.id


def login(client, username=TEST_ADMIN_NAME, password=TEST_ADMIN_PASSWORD):
    return client.post(
        "/login", data=dict(user_id=username, password=password), follow_redirects=True
    )


def logout(client):
    return client.get("/logout", follow_redirects=True)
