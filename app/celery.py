import os

import sqlalchemy as sa


from celery import Celery
from flask_mail import Message
from flask import render_template
from app import models as m
from app import mail
from app import schema as s
from app.database import db
from app import create_app
from config import config
from app.logger import log

APP_ENV = os.environ.get("APP_ENV", "development")
CFG = config(APP_ENV)


celery_worker = Celery("beam-suntory", broker_url=CFG.REDIS_URL)


@celery_worker.task
def notify_users_accept_inbount(inbound_order_id: int, app_env: str, redirect_url: str):
    app = create_app(app_env)
    with app.app_context():
        log(log.INFO, "Notifying users of accepted inbound order")
        inbound_order = db.session.get(m.InboundOrder, inbound_order_id)

        groups_list_ids = [
            [y.group_id for y in x.product_quantity_groups]
            for x in inbound_order.products_allocated
        ]

        inbound_order_groups_ids = set(
            item for sublist in groups_list_ids for item in sublist
        )

        users = db.session.scalars(
            sa.select(m.UserGroup).where(
                m.UserGroup.right_id.in_(inbound_order_groups_ids)
            )
        )

        for u in users:
            msg = Message(
                subject=f"Inbound order accepted {inbound_order.title}",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[u.child.email],
            )

            msg.html = render_template(
                "email/inbound_order.html",
                user=u.child,
                inbound_order=inbound_order,
                url=redirect_url,
            )

            mail.send(msg)


@celery_worker.task
def notify_users_assign(assign_id: int, app_env: str, redirect_url: str):
    app = create_app(app_env)
    with app.app_context():
        log(log.INFO, "Notifying users of assign")
        assign_obj = db.session.get(m.Assign, assign_id)
        admin_groups_ids = db.session.scalars(
            sa.select(m.Group.id).where(m.Group.name.ilike("%admin%"))
        ).all()

        where_stm = sa.and_(
            m.UserGroup.right_id.not_in(admin_groups_ids),
            m.Division.role_name != s.UserRole.ADMIN.value,
            m.Division.role_name != s.UserRole.WAREHOUSE_MANAGER.value,
            sa.or_(
                m.UserGroup.right_id == assign_obj.group_id,
                m.UserGroup.right_id == assign_obj.from_group_id,
            ),
        )
        if (
            assign_obj.group_id in admin_groups_ids
            or assign_obj.from_group_id in admin_groups_ids
        ):
            where_stm = sa.and_(
                m.Division.role_name != s.UserRole.WAREHOUSE_MANAGER.value,
                sa.or_(
                    m.UserGroup.right_id == assign_obj.group_id,
                    m.UserGroup.right_id == assign_obj.from_group_id,
                ),
            )

        users = db.session.scalars(
            sa.select(m.User)
            .join(m.UserGroup)
            .join(m.Division)
            .where(where_stm)
            .distinct()
        ).all()

        for user in users:
            if not user.approval_permission:
                continue
            msg = Message(
                subject=f"Assign {assign_obj.product.name}",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[user.email],
            )

            msg.html = render_template(
                "email/assign.html",
                user=user,
                assign=assign_obj,
                url=redirect_url,
            )
            mail.send(msg)


# @celery_worker.task
# def notify_users_request_share(request_share_id: int, app_env: str, redirect_url: str):
#     app = create_app(app_env)
#     with app.app_context():
#         log(log.INFO, "Notifying users of request_share")
#         request_share = db.session.get(m.RequestShare, request_share_id)
#         admin_groups_ids = db.session.scalars(
#             sa.select(m.Group.id).where(m.Group.name.ilike("%admin%"))
#         ).all()

#         where_stm = sa.and_(
#             m.UserGroup.right_id.not_in(admin_groups_ids),
#             m.Division.role_name != s.UserRole.ADMIN.value,
#             m.Division.role_name != s.UserRole.WAREHOUSE_MANAGER.value,
#             m.UserGroup.right_id == request_share.group_id,
#         )
#         if request_share.group_id in admin_groups_ids:
#             where_stm = sa.and_(
#                 m.Division.role_name != s.UserRole.WAREHOUSE_MANAGER.value,
#                 m.UserGroup.right_id == request_share.group_id,
#             )

#         users = db.session.scalars(
#             sa.select(m.User)
#             .join(m.UserGroup)
#             .join(m.Division)
#             .where(where_stm)
#             .distinct()
#         ).all()

#         for user in users:
#             if not user.approval_permission:
#                 continue
#             msg = Message(
#                 subject=f"Declined request share {request_share.order_numb}",
#                 sender=app.config["MAIL_DEFAULT_SENDER"],
#                 recipients=[user.email],
#             )
#             msg.html = render_template(
#                 "email/request_share.html",
#                 user=user,
#                 action="declined",
#                 request_share=request_share,
#                 url=redirect_url,
#             )
#             mail.send(msg)


@celery_worker.task
def notify_users_new_request_share(
    request_share_id: int, app_env: str, redirect_url: str
):
    app = create_app(app_env)
    with app.app_context():
        log(log.INFO, "Notifying users of new request_share")
        request_share = db.session.get(m.RequestShare, request_share_id)
        admin_groups_ids = db.session.scalars(
            sa.select(m.Group.id).where(m.Group.name.ilike("%admin%"))
        ).all()

        where_stm = sa.and_(
            m.UserGroup.right_id.not_in(admin_groups_ids),
            m.Division.role_name != s.UserRole.ADMIN.value,
            m.Division.role_name != s.UserRole.WAREHOUSE_MANAGER.value,
            m.UserGroup.right_id == request_share.from_group_id,
        )

        if request_share.from_group_id in admin_groups_ids:
            where_stm = sa.and_(
                m.Division.role_name != s.UserRole.WAREHOUSE_MANAGER.value,
                m.UserGroup.right_id == request_share.from_group_id,
            )

        users = db.session.scalars(
            sa.select(m.User)
            .join(m.UserGroup)
            .join(m.Division)
            .where(where_stm)
            .distinct()
        ).all()

        for user in users:
            msg = Message(
                subject=f"New request share {request_share.order_numb}",
                sender=app.config["MAIL_DEFAULT_SENDER"],
                recipients=[user.email],
            )

            msg.html = render_template(
                "email/request_share_create.html",
                user=user,
                request_share=request_share,
                url=redirect_url,
            )
            mail.send(msg)
