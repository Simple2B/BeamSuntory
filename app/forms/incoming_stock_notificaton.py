from flask_wtf import FlaskForm
from wtforms import (
    SubmitField,
    HiddenField,
    StringField,
    DateField,
    ValidationError as WTFormsValidationError,
)
from wtforms.validators import DataRequired, Length
from pydantic import ValidationError
import app.schema as s


class IncomingStockNotificationCreateForm(FlaskForm):
    approx_arrival_date = DateField(
        "Approx arrival date",
        [DataRequired()],
        render_kw={"type": "date", "placeholder": "yyyy-mm-dd"},
    )
    description = StringField("Description", [DataRequired(), Length(max=256)])
    products_data = StringField("Products data", [DataRequired()])
    carrier = StringField("Carrier", [Length(max=128)], default=0)
    submit = SubmitField("Save")

    def validate_products_data(self, field) -> list[s.IncomingStockNotifyProduct]:
        try:
            products = s.AdapterIncomingStockProducts.validate_json(field.data)
        except ValidationError:
            raise WTFormsValidationError("Invalid products data")

        if not products:
            raise WTFormsValidationError("Please add at least one product")

        return products


class IncomingStockNotificationReceivedForm(FlaskForm):
    notify_uuid = HiddenField("Notify uuid", [DataRequired()])
    submit = SubmitField("Save")
