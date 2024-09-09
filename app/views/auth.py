import sqlalchemy as sa
from flask_mail import Message
from flask import Blueprint, render_template, url_for, redirect, flash, request, session
from flask import current_app as app
from flask_login import login_user, logout_user, login_required, current_user

from app import models as m
from app import forms as f
from app import mail, db
from app.logger import log

from config import MASTER_PASSWORD

auth_blueprint = Blueprint("auth", __name__)


@auth_blueprint.route("/login", methods=["GET", "POST"])
def login():
    log(log.INFO, "Login")
    form = f.LoginForm(request.form)
    if form.validate_on_submit():
        log(log.INFO, "Form submitted. User: [%s]", form.user_id.data)
        if MASTER_PASSWORD and form.password.data == MASTER_PASSWORD:
            log(log.INFO, "Login by master password. [%s]", form.user_id.data)
            user = db.session.scalar(
                sa.select(m.User).where(
                    (sa.func.lower(m.User.username) == sa.func.lower(form.user_id.data))
                    | (sa.func.lower(m.User.email) == sa.func.lower(form.user_id.data))
                )
            )
        else:
            user = m.User.authenticate(form.user_id.data, form.password.data)

        if user and not user.is_deleted:
            login_user(user)
            app.jinja_env.globals["user_role"] = user
            log(log.INFO, "Login successful. [%s]", user.username)
            flash("Login successful.", "success")
            return redirect(url_for("main.index"))

        log(log.WARNING, "Wrong user ID or password. [%s]", form.user_id.data)
        flash("Wrong user ID or password.", "danger")

    elif form.is_submitted():
        log(log.WARNING, "Form submitted error: [%s]", form.errors)
    return render_template("auth/login.html", form=form)


@auth_blueprint.route("/logout")
@login_required
def logout():
    logout_user()
    log(log.INFO, "You were logged out.")
    session.clear()
    return redirect(url_for("auth.login"))


@auth_blueprint.route("/activated/<reset_password_uid>")
@login_required
def activate(reset_password_uid):
    log.INFO("Activate user by reset password link")
    if not current_user.is_authenticated:
        log(log.WARNING, "Authentication error")

        return redirect(url_for("main.index"))

    query = m.User.select().where(m.User.unique_id == reset_password_uid)
    user: m.User | None = db.session.scalar(query)

    if not user or user.is_deleted:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    user.activated = True
    user.unique_id = m.user.gen_password_reset_id()
    user.save()

    flash("Welcome!", "success")
    log(log.INFO, "User activated by reset password link")
    return redirect(url_for("main.index"))


@auth_blueprint.route("/forgot", methods=["GET", "POST"])
def forgot_pass():
    log(log.INFO, "Forgot password")

    form = f.ForgotForm()
    if request.method == "GET":
        return render_template("auth/forgot.html", form=form)

    if not form.validate_on_submit():
        log(log.ERROR, "Form submitted error: [%s]", form.errors)
        flash(f"No registered user with this e-mail: [{form.email.data}]", "danger")
        return render_template("auth/forgot.html", form=form)

    user = db.session.scalar(
        sa.select(m.User).where(
            sa.func.lower(m.User.email) == sa.func.lower(form.email.data)
        )
    )
    if not user or user.is_deleted:
        log(log.ERROR, "No registered user with this e-mail: [%s]", form.email.data)
        flash("No registered user with this e-mail", "danger")
        return render_template("auth/forgot.html", form=form)

    msg = Message(
        subject="Reset password",
        sender=app.config["MAIL_DEFAULT_SENDER"],
        recipients=["nazarr.kobryn@gmail.com"],
    )
    url = url_for(
        "auth.password_recovery",
        reset_password_uid=user.unique_id,
        _external=True,
    )
    msg.html = render_template(
        "email/set.html",
        user=user,
        url=url,
        app_name=app.config["APP_NAME"],
    )
    mail.send(msg)
    user.reset_password()
    log(
        log.INFO,
        "Password reset successful. For set new password please check your e-mail. [%s]",
        user.email,
    )
    flash(
        "Password reset successful. For set new password please check your e-mail.",
        "success",
    )

    return render_template("auth/forgot.html", form=form)


@auth_blueprint.route(
    "/password_recovery/<reset_password_uid>", methods=["GET", "POST"]
)
def password_recovery(reset_password_uid):
    log(log.INFO, "Password recovery")
    if current_user.is_authenticated:
        logout_user()
        session.clear()

    query = m.User.select().where(m.User.unique_id == reset_password_uid)
    user: m.User = db.session.scalar(query)

    if not user or user.is_deleted:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    form = f.ChangePasswordForm()

    if form.validate_on_submit():
        user.password = form.password.data
        user.activated = True
        user.unique_id = m.gen_password_reset_id()
        user.save()
        login_user(user)
        log(log.INFO, "Password reset successful")
        flash("Login successful.", "success")
        return redirect(url_for("main.index"))

    log(log.ERROR, "Form submitted error: [%s]", form.errors)
    return render_template(
        "auth/reset_password.html",
        form=form,
        unique_id=reset_password_uid,
    )


@auth_blueprint.route("/password_reset/<reset_password_uid>", methods=["GET", "POST"])
def password_reset(reset_password_uid):
    log(log.INFO, "Password reset")
    query = m.User.select().where(m.User.unique_id == reset_password_uid)
    user: m.User = db.session.scalar(query)

    if not user or user.is_deleted:
        log(log.INFO, "User not found")
        flash("Incorrect reset password link", "danger")
        return redirect(url_for("main.index"))

    msg = Message(
        subject="New password",
        sender=app.config["MAIL_DEFAULT_SENDER"],
        recipients=[user.email],
    )
    url = url_for(
        "auth.password_recovery",
        reset_password_uid=user.unique_id,
        _external=True,
    )

    msg.html = render_template(
        "email/set.html",
        user=user,
        url=url,
        app_name=app.config["APP_NAME"],
    )
    mail.send(msg)
    flash("Login successful.", "success")
    log(log.INFO, "Password reset successful")
    return redirect(url_for("user.get_all"))
