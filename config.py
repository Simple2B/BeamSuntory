import os
from typing import ClassVar
from abc import ABC, abstractclassmethod
import tomllib
from functools import lru_cache
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict
from flask import Flask

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
APP_ENV = os.environ.get("APP_ENV", "development")

SALES_REP_LOCKER_NAME = "Locker"


def get_version() -> str:
    with open("pyproject.toml", "rb") as f:
        return tomllib.load(f)["tool"]["poetry"]["version"]


class BaseConfig(BaseSettings, ABC):
    """Base configuration."""

    @property
    @abstractclassmethod
    def ENV(): ...

    APP_NAME: str = "Beam Suntory"
    SECRET_KEY: str
    SQLALCHEMY_TRACK_MODIFICATIONS: bool = False
    WTF_CSRF_ENABLED: bool = True
    VERSION: str = get_version()

    # Mail config
    MAIL_SERVER: str
    MAIL_PORT: int
    MAIL_USE_TLS: bool = True
    MAIL_USE_SSL: bool = False
    MAIL_USERNAME: str
    MAIL_PASSWORD: str
    MAIL_DEFAULT_SENDER: str
    DEFAULT_IMAGE: str

    # Super admin
    ADMIN_USERNAME: str
    ADMIN_EMAIL: str
    ADMIN_PASSWORD: str

    # Default user password
    DEFAULT_USER_PASSWORD: str

    # Pagination
    DEFAULT_PAGE_SIZE: int
    PAGE_LINKS_NUMBER: int

    @staticmethod
    def configure(app: Flask):
        # Implement this method to do further configuration on your app.
        pass

    model_config = SettingsConfigDict(
        env_file=(
            ".env",
            "project.env",
        ),
        extra="ignore",
    )


class DevelopmentConfig(BaseConfig):
    """Development configuration."""

    ENV: ClassVar[str] = "development"
    DEBUG: bool = True
    ALCHEMICAL_DATABASE_URL: str = Field(alias="DB_URL_DEV")


class TestingConfig(BaseConfig):
    """Testing configuration."""

    ENV: ClassVar[str] = "testing"
    WTF_CSRF_ENABLED: bool = False
    TESTING: bool = True
    PRESERVE_CONTEXT_ON_EXCEPTION: bool = False
    ALCHEMICAL_DATABASE_URL: str = "sqlite:///" + os.path.join(
        BASE_DIR, "database-test.sqlite3"
    )


class ProductionConfig(BaseConfig):
    """Production configuration."""

    ENV: ClassVar[str] = "production"
    ALCHEMICAL_DATABASE_URL: str = Field(alias="DB_URL_PROD")


@lru_cache
def config(
    name=DevelopmentConfig.ENV,
) -> DevelopmentConfig | TestingConfig | ProductionConfig:
    CONF_MAP = {}

    for conf in (TestingConfig, DevelopmentConfig, ProductionConfig):
        CONF_MAP[conf.ENV] = conf

    return CONF_MAP[name]()
