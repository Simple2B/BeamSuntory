import os

from flask import Flask, render_template
from flask_login import LoginManager
from werkzeug.exceptions import HTTPException
from flask_migrate import Migrate
from flask_mail import Mail

from app.logger import log
from .database import db
from .constants import DELIVERY_AGENT_ROLES

# instantiate extensions
login_manager = LoginManager()
migration = Migrate()
mail = Mail()


def create_app(environment="development"):
    from config import config
    from app.views import BLUEPRINTS
    from app import controllers
    from app import models as m, forms
    from app import schema as s

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
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)

    # Set up flask login.
    @login_manager.user_loader
    def get_user(id: int):
        query = m.User.select().where(m.User.id == int(id))
        return db.session.scalar(query)

    login_manager.login_view = "auth.login"
    login_manager.login_message_category = "info"
    login_manager.anonymous_user = m.AnonymousUser

    app.jinja_env.globals["get_all_groups"] = controllers.get_all_groups

    app.jinja_env.globals["form_product_upload"] = forms.UploadProductForm
    app.jinja_env.globals["admin_roles"] = [s.UserRole.ADMIN.value]
    app.jinja_env.globals["admin_warehouse_roles"] = [
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ]
    app.jinja_env.globals["warehouse_roles"] = [
        # TODO: delete admin role after testing
        s.UserRole.ADMIN.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ]
    app.jinja_env.globals["admin_manager_roles"] = [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.MANAGER.value,
    ]
    app.jinja_env.globals["admin_warehouse_manager_roles"] = [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
    ]
    app.jinja_env.globals["all_main_user_roles"] = [
        s.UserRole.ADMIN.value,
        s.UserRole.SALES_REP.value,
        s.UserRole.MANAGER.value,
        s.UserRole.WAREHOUSE_MANAGER.value,
        s.UserRole.DELIVERY_AGENT.value,
    ]
    app.jinja_env.globals["delivery_agent_roles"] = DELIVERY_AGENT_ROLES

    # Error handlers.
    @app.errorhandler(HTTPException)
    def handle_http_error(exc):
        return render_template("error.html", error=exc), exc.code

    return app
