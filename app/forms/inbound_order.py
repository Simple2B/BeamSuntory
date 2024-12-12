from datetime import date
from flask_wtf import FlaskForm
from wtforms import (
    StringField,
    SubmitField,
    IntegerField,
    DateField,
    ValidationError,
    TextAreaField,
    HiddenField,
)
from wtforms.validators import DataRequired, Optional, Regexp, AnyOf


from app import schema as s


class InboundOrderBaseForm(FlaskForm):
    next_url = StringField("next_url")
    order_title = StringField("Order title", [DataRequired()])
    delivery_date = DateField("Delivery date", [DataRequired()], format="%Y-%m-%d")
    active_date = DateField("Active date", [DataRequired()], format="%Y-%m-%d")
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

    def validate_delivery_date(self, field):
        if field.data < date.today():
            raise ValidationError("Delivery date cannot be earlier than today")

    def validate_active_date(self, field):
        if field.data < date.today():
            raise ValidationError("Active date cannot be earlier than today")


class InboundOrderCreateForm(InboundOrderBaseForm):
    products = StringField("Products", [DataRequired()])
    billable_groups = StringField("Billable Groups", [Optional()])


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
    billable_groups = StringField("Billable Groups", [Optional()])


class SortByStatusInboundOrderForm(FlaskForm):
    sort_by = StringField("Sort by", [DataRequired()])
    submit = SubmitField("Submit")


class InboundOrderUpdateNotes(FlaskForm):
    inbound_order_id = HiddenField("Inbound order id", [DataRequired()])
    wm_notes = StringField(
        "Warehouse manager notes", render_kw={"placeholder": "Notes"}
    )
    proof_of_delivery = TextAreaField(
        "Proof of delivery", render_kw={"placeholder": "Proof of delivery"}
    )
    tracking = TextAreaField("Tracking", render_kw={"placeholder": "Tracking"})
    products_allocated_note_locations = HiddenField([DataRequired()])


class InboundOrderPickupForm(FlaskForm):
    inbound_order_id = StringField("Inbound order id", [DataRequired()])
    wm_notes = StringField(
        "Warehouse manager notes", render_kw={"placeholder": "Notes"}
    )
    da_notes = StringField("Delivery agent notes", render_kw={"placeholder": "Notes"})
    proof_of_delivery = TextAreaField(
        "Proof of delivery", render_kw={"placeholder": "Proof of delivery"}
    )
    tracking = TextAreaField("Tracking", render_kw={"placeholder": "Tracking"})
    submit = SubmitField("Submit")
