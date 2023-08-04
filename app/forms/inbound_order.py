from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, ValidationError
from wtforms.validators import DataRequired

from app import models as m, db


class InboundOrderForm(FlaskForm):
    next_url = StringField("next_url")
    inbound_order_id = StringField("inbound_order_id", [DataRequired()])
    active_date = StringField("Active date", [DataRequired()])  # datetime
    active_time = StringField("Active time", [DataRequired()])  # datetime
    order_title = StringField("Order title", [DataRequired()])
    delivery_date = StringField("Delivery date", [DataRequired()])  # datetime
    status = StringField("Status", [DataRequired()])
    supplier_id = IntegerField("Supplier ID", [DataRequired()])
    delivery_agent_id = IntegerField("Delivery agent ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])
    products = StringField("Products", [DataRequired()])

    submit = SubmitField("Save")

    def validate_order_id(self, field):
        query = (
            m.InboundOrder.select()
            .where(m.InboundOrder.order_id == field.data)
            .where(m.InboundOrder.id != int(self.inbound_order_id.data))
        )
        if db.session.scalar(query) is not None:
            raise ValidationError("This order_id is taken.")


class NewInboundOrderForm(FlaskForm):
    inbound_order_id = StringField("inbound_order_id", [DataRequired()])
    active_date = StringField("Active date", [DataRequired()])  # datetime
    active_time = StringField("Active time", [DataRequired()])  # datetime
    order_title = StringField("Order title", [DataRequired()])
    delivery_date = StringField("Delivery date", [DataRequired()])  # datetime
    status = StringField("Status", [DataRequired()])
    supplier_id = IntegerField("Supplier ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])
    delivery_agent_id = IntegerField("Delivery agent ID", [DataRequired()])

    submit = SubmitField("Save")

    def validate_order_id(self, field):
        query = m.InboundOrder.select().where(m.InboundOrder.order_id == field.data)
        if db.session.scalar(query) is not None:
            raise ValidationError("This order_id is taken.")
