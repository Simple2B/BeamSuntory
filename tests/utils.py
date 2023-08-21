from app.models import User, Division
from config import BaseConfig
from app import db

TEST_ADMIN_NAME = "bob"
TEST_ADMIN_EMAIL = "bob@test.com"
TEST_ADMIN_PASSWORD = "password"
TEST_ADMIN_FULL_NAME = "bob suntory"


def register(
    username=TEST_ADMIN_NAME,
    email=TEST_ADMIN_EMAIL,
    password=TEST_ADMIN_PASSWORD,
    role=None,
):
    create_default_divisions()

    if not role:
        role = db.session.execute(
            Division.select().where(Division.role_name == BaseConfig.Config.ADMIN)
        ).scalar()
    user = User(
        username=username,
        email=email,
        role=role.id,
        activated=True,
        approval_permission=True,
        street_address="street",
        phone_number="123456789",
        country="UK",
        region="Lv",
        city="Dro",
        zip_code="82100",
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


def create_default_divisions():
    for role in [
        BaseConfig.Config.ADMIN,
        BaseConfig.Config.SALES_REP,
        BaseConfig.Config.WAREHOUSE_MANAGER,
        "Manager",
    ]:
        check_role = db.session.execute(
            Division.select().where(Division.role_name == role)
        ).scalar()
        if not check_role:
            Division(role_name=role, activated=True).save()
