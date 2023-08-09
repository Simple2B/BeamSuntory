import os
from functools import lru_cache
from pydantic import BaseSettings
from flask import Flask

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_ENV = os.environ.get("APP_ENV", "development")


class BaseConfig(BaseSettings):
    """Base configuration."""

    ENV: str = "base"
    APP_NAME: str = "Beam Suntory"
    SECRET_KEY: str
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    WTF_CSRF_ENABLED: bool = True

    # Mail config
    MAIL_SERVER: str = os.environ.get("MAIL_SERVER")
    MAIL_PORT: int = os.environ.get("MAIL_PORT")
    MAIL_USE_TLS: bool = True
    MAIL_USE_SSL: bool = False
    MAIL_USERNAME: str = os.environ.get("MAIL_USERNAME")
    MAIL_PASSWORD: str = os.environ.get("MAIL_PASSWORD")
    MAIL_DEFAULT_SENDER: str = os.environ.get("MAIL_DEFAULT_SENDER")

    # Super admin
    ADMIN_USERNAME: str
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str

    # Default user password
    DEFAULT_USER_PASSWORD: str = os.environ.get("DEFAULT_USER_PASSWORD")

    # Pagination
    DEFAULT_PAGE_SIZE: int
    PAGE_LINKS_NUMBER: int

    # Inbound order status
    INBOUND_ORDER_STATUS: list[str] = [
        "Draft",
        "Assigned to pickup",
        "Delivered",
        "In transit",
    ]

    # Ship request status
    SHIP_REQUEST_STATUS: list[str] = [
        "Waiting for warehouse manager",
        "Assigned to pickup",
        "Delivered",
        "In transit",
    ]

    @staticmethod
    def configure(app: Flask):
        # Implement this method to do further configuration on your app.
        pass

    class Config:
        # `.env` takes priority over `project.env`
        env_file = "project.env", ".env"


class DevelopmentConfig(BaseConfig):
    """Development configuration."""

    DEBUG: bool = True
    ALCHEMICAL_DATABASE_URL: str = "sqlite:///" + os.path.join(
        BASE_DIR, "database-dev.sqlite3"
    )

    class Config:
        fields = {
            "ALCHEMICAL_DATABASE_URL": {
                "env": "DEVEL_DATABASE_URL",
            }
        }


class TestingConfig(BaseConfig):
    """Testing configuration."""

    WTF_CSRF_ENABLED: bool = False
    TESTING: bool = True
    PRESERVE_CONTEXT_ON_EXCEPTION: bool = False
    ALCHEMICAL_DATABASE_URL: str = "sqlite:///" + os.path.join(
        BASE_DIR, "database-test.sqlite3"
    )

    class Config:
        fields = {
            "ALCHEMICAL_DATABASE_URL": {
                "env": "TEST_DATABASE_URL",
            }
        }


class ProductionConfig(BaseConfig):
    """Production configuration."""

    ALCHEMICAL_DATABASE_URL: str = os.environ.get(
        "DATABASE_URL", "sqlite:///" + os.path.join(BASE_DIR, "database.sqlite3")
    )
    WTF_CSRF_ENABLED = True

    class Config:
        fields = {
            "ALCHEMICAL_DATABASE_URL": {
                "env": "DATABASE_URL",
            }
        }


@lru_cache
def config(name=APP_ENV) -> DevelopmentConfig | TestingConfig | ProductionConfig:
    CONF_MAP = dict(
        development=DevelopmentConfig(),
        testing=TestingConfig(),
        production=ProductionConfig(),
    )
    configuration = CONF_MAP[name]
    configuration.ENV = name
    return configuration
