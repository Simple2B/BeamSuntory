from flask_wtf import FlaskForm
from wtforms import (
    HiddenField,
    StringField,
    FileField,
)
from wtforms.validators import DataRequired, Length


class NewBulkAssignForm(FlaskForm):
    name = StringField(
        "Name", [DataRequired(), Length(max=256)], render_kw={"placeholder": "Name"}
    )
    exel_file = FileField("Exel file", [DataRequired()])


class EditBulkAssignForm(FlaskForm):
    uuid = HiddenField("UUID", [DataRequired()])
