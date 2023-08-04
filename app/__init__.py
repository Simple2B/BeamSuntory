import os

from flask import Flask, render_template
from flask_login import LoginManager
from werkzeug.exceptions import HTTPException
from flask_migrate import Migrate
from flask_mail import Mail

from app.logger import log
from .database import db

# instantiate extensions
login_manager = LoginManager()
migration = Migrate()
mail = Mail()


def create_app(environment="development"):
    from config import config
    from app.views import (
        main_blueprint,
        auth_blueprint,
        user_blueprint,
        group_blueprint,
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
        assign_blueprint,
        request_share_blueprint,
        store_category_blueprint,
    )
    from app import models as m

    # Instantiate app.
    app = Flask(__name__)

    # Set app config.
    env = os.environ.get("APP_ENV", environment)
    configuration = config(env)
    app.config.from_object(configuration)
    configuration.configure(app)
    log(log.INFO, "Configuration: [%s]", configuration.ENV)

    # Set up extensions.
    db.init_app(app)
    migration.init_app(app, db)
    login_manager.init_app(app)
    mail.init_app(app)

    # Register blueprints.
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(main_blueprint)
    app.register_blueprint(user_blueprint)
    app.register_blueprint(group_blueprint)
    app.register_blueprint(master_group_blueprint)
    app.register_blueprint(product_blueprint)
    app.register_blueprint(group_for_product_blueprint)
    app.register_blueprint(master_group_for_product_blueprint)
    app.register_blueprint(warehouse_blueprint)
    app.register_blueprint(delivery_agent_blueprint)
    app.register_blueprint(ship_request_blueprint)
    app.register_blueprint(supplier_blueprint)
    app.register_blueprint(cart_blueprint)
    app.register_blueprint(inbound_order_blueprint)
    app.register_blueprint(store_blueprint)
    app.register_blueprint(incoming_stock_blueprint)
    app.register_blueprint(outgoing_stock_blueprint)
    app.register_blueprint(pickup_order_blueprint)
    app.register_blueprint(pickup_inbound_blueprint)
    app.register_blueprint(assign_blueprint)
    app.register_blueprint(request_share_blueprint)
    app.register_blueprint(store_category_blueprint)

    # Set up flask login.
    @login_manager.user_loader
    def get_user(id: int):
        query = m.User.select().where(m.User.id == int(id))
        return db.session.scalar(query)

    login_manager.login_view = "auth.login"
    login_manager.login_message_category = "info"
    login_manager.anonymous_user = m.AnonymousUser

    # Error handlers.
    @app.errorhandler(HTTPException)
    def handle_http_error(exc):
        return render_template("error.html", error=exc), exc.code

    return app
