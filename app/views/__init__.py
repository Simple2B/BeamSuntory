# flake8: noqa F401
from .auth import auth_blueprint
from .main import main_blueprint
from .user import bp as user_blueprint
from .group import stock_target_group_blueprint
from .sub_group import sub_stock_target_group_blueprint
from .master_group import master_group_blueprint
from .product import product_blueprint
from .group_for_product import group_for_product_blueprint
from .master_group_for_product import master_group_for_product_blueprint
from .warehouse import warehouse_blueprint
from .delivery_agent import delivery_agent_blueprint
from .ship_request import ship_request_blueprint
from .supplier import supplier_blueprint
from .cart import cart_blueprint
from .inbound_order import inbound_order_blueprint
from .store import store_blueprint
from .incoming_stock import incoming_stock_blueprint
from .outgoing_stock import outgoing_stock_blueprint
from .pickup_order import pickup_order_blueprint
from .pickup_inbound import pickup_inbound_blueprint
from .division import division_blueprint
from .assign import assign_blueprint
from .request_share import request_share_blueprint
from .store_category import store_category_blueprint
from .inventory import inventory_blueprint
from .adjust import adjust_blueprint
from .event import event_blueprint
from .report_inventory import report_inventory_blueprint
from .report_request_share import report_request_share_blueprint
from .report_shipping import report_shipping_blueprint
from .report_inbound_orders import report_inbound_orders_blueprint
from .report import report_blueprint
from .report_shelf_life import report_shelf_life_blueprint
from .incoming_stock_notification import incoming_stock_notifications_bp
from .bulk_ship import bulk_ship_bp
from .bulk_assign import bulk_assign_bp
from .master_billable_group import master_billable_group_bp
from .billable_group import billable_group_bp
from .report_inbound_billable import report_inbound_billable_blueprint
from .report_outbound_billable import report_outbound_billable_blueprint

BLUEPRINTS = (
    main_blueprint,
    auth_blueprint,
    user_blueprint,
    stock_target_group_blueprint,
    sub_stock_target_group_blueprint,
    master_group_blueprint,
    product_blueprint,
    group_for_product_blueprint,
    master_group_for_product_blueprint,
    warehouse_blueprint,
    delivery_agent_blueprint,
    ship_request_blueprint,
    supplier_blueprint,
    cart_blueprint,
    inbound_order_blueprint,
    store_blueprint,
    incoming_stock_blueprint,
    outgoing_stock_blueprint,
    pickup_order_blueprint,
    pickup_inbound_blueprint,
    division_blueprint,
    assign_blueprint,
    request_share_blueprint,
    store_category_blueprint,
    inventory_blueprint,
    adjust_blueprint,
    event_blueprint,
    report_inventory_blueprint,
    report_request_share_blueprint,
    report_shipping_blueprint,
    report_inbound_orders_blueprint,
    report_blueprint,
    report_shelf_life_blueprint,
    incoming_stock_notifications_bp,
    bulk_ship_bp,
    bulk_assign_bp,
    master_billable_group_bp,
    billable_group_bp,
    report_inbound_billable_blueprint,
    report_outbound_billable_blueprint,
)
