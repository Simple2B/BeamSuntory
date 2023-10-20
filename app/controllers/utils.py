from urllib.parse import urlparse, parse_qs
from flask import request
from app import db, models as m


def replace_underscore(validation_obj, field):
    """replace_underscore to dash in flask forms validation method

    Args:
        validation_obj (FlaskForm): FLaskForm object from flask_wtf
        field (StringField): StringField object from wtforms
    """
    if field.data:
        validation_obj.name.data = validation_obj.name.data.replace("_", "-")


def get_all_groups():
    """get_all_groups return all groups from database

    Returns:
        List: list of groups
    """
    return db.session.scalars(m.Group.select().order_by(m.Group.name)).all()


def sort_user_groups(e: m.UserGroup):
    return e.parent.name


def get_query_params_from_headers():
    """create query params dict from request headers

    Returns:
        {query_name: str, query_value: str}
    """
    referer_url = request.headers.get("Referer")
    parsed_url = urlparse(referer_url)
    parsed_query_params = parse_qs(parsed_url.query)
    query_params = {key: value[0] for key, value in parsed_query_params.items()}
    return query_params
