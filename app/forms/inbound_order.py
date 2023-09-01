from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, ValidationError
from wtforms.validators import DataRequired, Optional

from app import schema as s
from app import models as m, db


class InboundOrderForm(FlaskForm):
    next_url = StringField("next_url")
    inbound_order_uuid = StringField("inbound_order_uuid", [DataRequired()])
    active_date = StringField("Active date", [DataRequired()])  # datetime
    active_time = StringField("Active time", [DataRequired()])  # datetime
    order_title = StringField("Order title", [DataRequired()])
    delivery_date = StringField("Delivery date", [DataRequired()])  # datetime
    status = StringField("Status", [DataRequired()])
    supplier_id = IntegerField("Supplier ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])
    products = StringField("Products", [DataRequired()])


class NewInboundOrderForm(FlaskForm):
    active_date = StringField("Active date", [DataRequired()])  # datetime
    active_time = StringField("Active time", [DataRequired()])  # datetime
    order_title = StringField("Order title", [DataRequired()])
    delivery_date = StringField("Delivery date", [DataRequired()])  # datetime
    supplier_id = IntegerField("Supplier ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])
    products = StringField("Products", [DataRequired()])
    status = StringField("status", [Optional()])

    def validate_status(form, field):
        if field.data not in (
            s.InboundOrderStatus.draft.value,
            s.InboundOrderStatus.assigned.value,
        ):
            raise ValidationError(f"Wrong status: {field.data}")


class SortByStatusInboundOrderForm(FlaskForm):
    sort_by = StringField("Sort by", [DataRequired()])
    submit = SubmitField("Submit")
