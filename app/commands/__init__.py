import os
import click
from flask import Flask
import sqlalchemy as sa
from sqlalchemy import orm
from app import models as m
from app import db, forms
from app import schema as s
from config import BaseConfig


def init(app: Flask):
    # flask cli context setup
    @app.shell_context_processor
    def get_context():
        """Objects exposed here will be automatically available from the shell."""
        return dict(app=app, db=db, m=m, f=forms, s=s, sa=sa, orm=orm)

    if app.config["ENV"] != "production":

        @app.cli.command()
        @click.option("--count", default=100, type=int)
        def db_populate(count: int):
            """Fill DB by dummy data."""
            from tests.db import populate

            populate(count)
            print(f"DB populated by {count} instancies")

    @app.cli.command("create-admin")
    def create_admin():
        """Create super admin account"""
        query = m.User.select().where(m.User.email == app.config["ADMIN_EMAIL"])
        if db.session.execute(query).first():
            print(f"User with e-mail: [{app.config['ADMIN_EMAIL']}] already exists")
            return
        for role in [
            BaseConfig.Config.ADMIN,
            BaseConfig.Config.SALES_REP,
            BaseConfig.Config.WAREHOUSE_MANAGER,
        ]:
            check_role = db.session.execute(
                m.Division.select().where(m.Division.role_name == role)
            ).scalar()
            if not check_role:
                m.Division(role_name=role, activated=True).save()
        role = db.session.execute(
            m.Division.select().where(m.Division.role_name == BaseConfig.Config.ADMIN)
        ).scalar()
        m.User(
            username=app.config["ADMIN_USERNAME"],
            email=app.config["ADMIN_EMAIL"],
            password=app.config["ADMIN_PASSWORD"],
            role=role.id,
            country="Ukraine",
            region="Kyiv",
            city="Kyiv",
            zip_code="11111",
            street_address="Address 1",
            activated=True,
            approval_permission=True,
            sales_rep=False,
        ).save()
        print("admin created")

    @app.cli.command("fill-db")
    def fill_db():
        """Populate DB with basic data."""
        stock_master_groups = {
            "Marketing": ["Brugal", "Banff Ice", "Alberta Springs"],
            "Field Marketing": ["Ontario", "Alberta", "Manitoba", "Ontario FMM"],
            "Mixit": ["Mixit"],
            "Key Accounts": ["Key Accounts"],
            "Sales Manager": ["Sales Manager"],
        }
        product_master_groups = {
            "Brand": ["Brugal", "Banff Ice", "Alberta Springs"],
            "Language": ["English", "French"],
            "Premises": ["On Premises", "Off Premises"],
            "Category": ["NLVA", "GWP", "Kit", "Bareware", "Signage"],
        }

        for mg in stock_master_groups:
            master_group = db.session.execute(
                m.MasterGroup.select().where(m.MasterGroup.name == mg)
            ).scalar()
            if not master_group:
                master_group = m.MasterGroup(
                    name=mg,
                )
                master_group.save(False)

            for g in stock_master_groups[mg]:
                group = db.session.execute(
                    m.Group.select().where(m.Group.name == g)
                ).scalar()
                if not group:
                    m.Group(
                        name=g,
                        master_group_id=master_group.id,
                    ).save(False)

        # yeah yeah, just code duplication
        for mg in product_master_groups:
            master_group = db.session.execute(
                m.MasterGroupProduct.select().where(m.MasterGroupProduct.name == mg)
            ).scalar()
            if not master_group:
                master_group = m.MasterGroupProduct(
                    name=mg,
                )
                master_group.save(False)

            for g in product_master_groups[mg]:
                group = db.session.execute(
                    m.GroupProduct.select().where(m.GroupProduct.name == g)
                ).scalar()
                if not group:
                    m.GroupProduct(
                        name=g,
                        master_group_id=master_group.id,
                    ).save(False)

        role = db.session.execute(
            m.Division.select().where(
                m.Division.role_name == BaseConfig.Config.WAREHOUSE_MANAGER
            )
        ).scalar()
        if role:
            wh_user = "warehouse manager 1"
            m.User(
                username=wh_user,
                email="warehouseuser1@mail.com",
                password="warehousemanagerpassword1",
                role=role.id,
                activated=True,
                approval_permission=True,
                street_address="street",
                phone_number="123456789",
                country="UK",
                region="Lv",
                city="Dro",
                zip_code="82100",
                sales_rep=False,
            ).save(False)

            wh_manager: m.User = db.session.execute(
                m.User.select().where(m.User.username == wh_user)
            ).scalar()

            m.Warehouse(
                name="Maywood warehouse",
                phone_number="380362470221",
                city="Al",
                zip="unzip",
                address="sserdda",
                manager_id=wh_manager.id,
            ).save(False)

        m.DeliveryAgent(
            first_name="May",
            last_name="Wood",
            username="maywood",
            email="maywood@test.com",
            contact_number="380362470223",
            street_address="sserdda",
            active=True,
        ).save(False)

        m.Supplier(
            name="supplier base 1",
            email="supplier_base_1@email.com",
            contact_number="380362470225",
            country="Cat",
            region="Albe",
            city="Kam",
            address="st.2",
            zip="45773",
            active=True,
        ).save(False)

        sc = m.StoreCategory(
            name="BAR",
            active=True,
            image=os.environ.get("DEFAULT_IMAGE", "default"),
        ).save()

        m.StoreCategory(
            name=BaseConfig.Config.SALES_REP_LOCKER_NAME,
            active=True,
            image=os.environ.get("DEFAULT_IMAGE", "default"),
        ).save()

        m.Store(
            store_category_id=sc.id,
            store_name="JB-restaurant",
            contact_person="Johnny",
            email="storejb@email.com",
            phone_numb="380362470231",
            country="Can",
            region="Alba",
            city="Kan",
            address="st.1",
            zip="45778",
            active=True,
        ).save(False)

        db.session.commit()
        print("database filled")
