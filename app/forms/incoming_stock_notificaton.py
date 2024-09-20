from flask_wtf import FlaskForm
from wtforms import (
    SubmitField,
    HiddenField,
    DateTimeField,
    StringField,
)
from wtforms.validators import DataRequired, Length


class IncomingStockNotificationCreateForm(FlaskForm):
    approx_arrival_date = DateTimeField("Approx arrival date", [DataRequired()])
    description = StringField("Description", [DataRequired(), Length(max=256)])
    products_data = StringField("Products data", [DataRequired()])
    submit = SubmitField("Save")

    def validate_products_data(self, field):
        pass


class IncomingStockNotificationReceivedForm(FlaskForm):
    notify_uuid = HiddenField("Notify uuid", [DataRequired()])
    submit = SubmitField("Save")
