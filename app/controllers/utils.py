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
    return db.session.scalars(m.Group.select()).all()
