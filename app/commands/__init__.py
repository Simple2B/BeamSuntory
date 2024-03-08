import os
import click
from flask import Flask
import sqlalchemy as sa
from sqlalchemy import orm
from app import models as m
from app import db, forms
from app import schema as s
from app import controllers as c
from config import SALES_REP_LOCKER_NAME


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
        for role in s.UserRole:
            check_role = db.session.execute(
                m.Division.select().where(m.Division.role_name == role.value)
            ).scalar()
            if not check_role:
                m.Division(role_name=role.value, activated=True).save()

        c.create_admin(
            s.AdminCreate(
                username=app.config["ADMIN_USERNAME"],
                email=app.config["ADMIN_EMAIL"],
                password=app.config["ADMIN_PASSWORD"],
                country="Ukraine",
                region="Kyiv",
                city="Kyiv",
                zip_code="11111",
                street_address="Address 1",
            )
        )

        print("admin created")

    @app.cli.command()
    def fill_db():
        """Populate DB with basic data."""
        stock_master_groups = {
            "Marketing": ["Brugal", "Banff Ice", "Alberta Springs"],
            "Field Marketing": ["Ontario", "Alberta", "Manitoba", "Ontario FMM"],
            "Mixit": ["Mixit"],
            "Key Accounts": ["Key Accounts"],
            "Sales Manager": ["Sales Manager"],
            s.MasterGroupMandatory.events.value: [s.MasterGroupMandatory.events.value],
        }
        product_master_groups = {
            "Brand": ["Brugal", "Banff Ice", "Alberta Springs"],
            "Language": ["English", "French"],
            "Premises": ["On Premises", "Off Premises"],
            "Categories": ["NLVA", "GWP", "Kit", "Bareware", "Signage"],
            s.ProductMasterGroupMandatory.events.value: [
                s.ProductMasterGroupMandatory.events.value
            ],
        }

        m.Image(
            name="no_picture_default",
            path="no_picture_default.png",
            extension="png",
        ).save(False)

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
                m.Division.role_name == s.UserRole.WAREHOUSE_MANAGER.value
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

            m.Warehouse(
                name=s.WarehouseMandatory.warehouse_events.value,
                phone_number="380362470344",
                city="Kv",
                zip="unzip",
                address="street",
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
            name=SALES_REP_LOCKER_NAME,
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

        bottle = m.Product(
            name="Bottle",
            description="Just a Bottle",
            SKU="CV-BOT23-27661",
            image=os.environ.get("DEFAULT_IMAGE", "default"),
            retail_price=0,
            regular_price=0,
            supplier_id=1,
            currency="CAD",
            low_stock_level=10,
            program_year=2023,
            package_qty=1,
            numb_of_items_per_case=1,
            numb_of_cases_per_outer_case=1,
            comments="no comment",
            weight=0,
            length=0,
            width=0,
            height=0,
        )
        bottle.save(False)
        cup = m.Product(
            name="Cup",
            description="Just a Cup",
            SKU="CV-CUP23-27662",
            image=os.environ.get("DEFAULT_IMAGE", "default"),
            retail_price=0,
            regular_price=0,
            supplier_id=1,
            currency="CAD",
            low_stock_level=10,
            program_year=2023,
            package_qty=1,
            numb_of_items_per_case=1,
            numb_of_cases_per_outer_case=1,
            comments="no comment",
            weight=0,
            length=0,
            width=0,
            height=0,
        )
        cup.save(False)

        db.session.commit()

        m.ProductGroup(product_id=bottle.id, group_id=1).save(False)
        m.ProductGroup(product_id=cup.id, group_id=1).save(False)

        db.session.commit()
        print("database filled")

    @app.cli.command()
    def clear_report_events():
        db.session.execute(m.ReportEvent.delete())
        db.session.commit()

    @app.cli.command()
    def clear_all_events():
        db.session.execute(m.Event.delete())
        db.session.commit()
