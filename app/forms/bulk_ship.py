from flask_wtf import FlaskForm
from wtforms import (
    HiddenField,
    StringField,
)
from wtforms.validators import DataRequired, Length


class NewBulkShipForm(FlaskForm):
    name = StringField(
        "Name", [DataRequired(), Length(max=256)], render_kw={"placeholder": "Name"}
    )
    items_data = StringField("Items data", [DataRequired()])


class EditBulkShipForm(FlaskForm):
    uuid = HiddenField("UUID", [DataRequired()])
    items_data = StringField("Items data", [DataRequired()])
