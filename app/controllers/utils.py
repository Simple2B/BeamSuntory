def replace_underscore(validation_obj, field):
    """replace_underscore to dash in flask forms validation method

    Args:
        validation_obj (FlaskForm): FLaskForm object from flask_wtf
        field (StringField): StringField object from wtforms
    """
    if field.data:
        validation_obj.name.data = validation_obj.name.data.replace("_", "-")
