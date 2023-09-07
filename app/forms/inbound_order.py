from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, DateField
from wtforms.validators import DataRequired, Optional, Regexp, AnyOf


from app import schema as s


class InboundOrderBaseForm(FlaskForm):
    next_url = StringField("next_url")
    order_title = StringField("Order title", [DataRequired()])
    delivery_date = DateField("Delivery date", [DataRequired()], format="%m/%d/%Y")
    active_date = DateField("Active date", [DataRequired()], format="%m/%d/%Y")
    active_time = StringField(
        "Active time",
        [
            DataRequired(),
            Regexp(
                r"((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))",
                message="Wrong time format",
            ),
        ],
    )

    supplier_id = IntegerField("Supplier ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])


class InboundOrderCreateForm(InboundOrderBaseForm):
    products = StringField("Products", [DataRequired()])


class InboundOrderUpdateForm(InboundOrderBaseForm):
    inbound_order_uuid = StringField("inbound_order_uuid", [DataRequired()])
    status = StringField(
        "status",
        [
            Optional(),
            AnyOf(
                [
                    s.InboundOrderStatus.draft.value,
                    s.InboundOrderStatus.assigned.value,
                ],
                "Wrong status",
            ),
        ],
    )
    product_groups = StringField("Product Groups", [DataRequired()])


class SortByStatusInboundOrderForm(FlaskForm):
    sort_by = StringField("Sort by", [DataRequired()])
    submit = SubmitField("Submit")
