# flake8: noqa F401
from .auth import auth_blueprint
from .main import main_blueprint
from .user import bp as user_blueprint
from .group import group_blueprint
from .master_group import master_group_blueprint
from .product import product_blueprint
from .group_for_product import group_for_product_blueprint
from .master_group_for_product import master_group_for_product_blueprint
from .warehouse import warehouse_blueprint
from .delivery_agent import delivery_agent_blueprint
from .supplier import supplier_blueprint
from .inbound_order import inbound_order_blueprint
