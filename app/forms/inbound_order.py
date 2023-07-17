from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired


class InboundOrderForm(FlaskForm):
    next_url = StringField("next_url")
    inbound_order_id = StringField("inbound_order_id", [DataRequired()])
    order_id = StringField("Order ID", [DataRequired()])
    active_date = StringField("Active date", [DataRequired()])  # datetime
    active_time = StringField("Active time", [DataRequired()])  # datetime
    order_title = StringField("Order title", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])
    delivery_date = StringField("Delivery date", [DataRequired()])  # datetime
    supplier_id = IntegerField("Supplier ID", [DataRequired()])
    delivery_agent_id = IntegerField("Delivery agent ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])
    product_id = IntegerField("Product ID", [DataRequired()])

    submit = SubmitField("Save")


class NewInboundOrderForm(FlaskForm):
    order_id = StringField("Order ID", [DataRequired()])
    active_date = StringField("Active date", [DataRequired()])  # datetime
    active_time = StringField("Active time", [DataRequired()])  # datetime
    order_title = StringField("Order title", [DataRequired()])
    quantity = IntegerField("Quantity", [DataRequired()])
    delivery_date = StringField("Delivery date", [DataRequired()])  # datetime
    supplier_id = IntegerField("Supplier ID", [DataRequired()])
    delivery_agent_id = IntegerField("Delivery agent ID", [DataRequired()])
    warehouse_id = IntegerField("Warehouse ID", [DataRequired()])
    product_id = IntegerField("Product ID", [DataRequired()])

    submit = SubmitField("Save")
