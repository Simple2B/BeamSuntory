import datetime
import os
from pathlib import Path

import filetype
import pytest
from flask import Flask
from flask.testing import FlaskClient


from app import create_app, db
from app import models as m
from app import schema as s
from tests.utils import register, create_default_divisions
from config import SALES_REP_LOCKER_NAME


@pytest.fixture()
def app():
    app = create_app("testing")
    app.config.update(
        {
            "TESTING": True,
            "DEFAULT_PAGE_SIZE": 8,
        }
    )

    yield app


@pytest.fixture()
def client(app: Flask, mocker):
    mocker.patch(
        "app.views.product.save_image",
        return_value=("test", "test"),
    )
    mocker.patch(
        "app.views.incoming_stock.notify_users_accept_inbount.delay",
    )
    mocker.patch(
        "app.views.product.notify_users_assign.delay",
    )
    # mocker.patch(
    #     "app.views.request_share.notify_users_request_share.delay",
    # )
    mocker.patch(
        "app.views.product.notify_users_new_request_share.delay",
    )
    kind = filetype.guess("tests/data/no_picture_default.png")
    mocker.patch.object(filetype, "guess", return_value=kind)
    mocker.patch.object(filetype, "is_image", return_value=True)
    with app.test_client() as client:
        with app.app_context():
            db.drop_all()
            db.create_all()
            register()
            yield client


@pytest.fixture()
def runner(app, client):
    from app import commands

    commands.init(app)

    yield app.test_cli_runner()


@pytest.fixture
def populate(client: FlaskClient):
    NUM_TEST_USERS = 16

    create_default_divisions()
    role = db.session.execute(
        m.Division.select().where(m.Division.role_name == "manager")  # TODO ?
    ).scalar()
    for i in range(NUM_TEST_USERS):
        m.User(
            username=f"user{i+1}",
            email=f"user{i+1}@mail.com",
            password="password",
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
    db.session.commit()
    yield client


@pytest.fixture
def populate_one_user(client: FlaskClient):
    create_default_divisions()

    role = db.session.execute(
        m.Division.select().where(
            m.Division.role_name == s.UserRole.WAREHOUSE_MANAGER.value
        )
    ).scalar()
    m.User(
        username="user",
        email="user@mail.com",
        password="password",
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
    db.session.commit()

    yield client


@pytest.fixture
def mg_g_populate(client: FlaskClient, mocker):
    # TODO refactoring
    master_groups = [
        "Country",
        "Brand",
        "Marketing",
        "Language",
        "Categories",
        s.ProductMasterGroupMandatory.events.value,
    ]
    groups = {
        "Canada": "1",
        "JB": "2",
        "Bombay": "2",
    }
    create_default_divisions()
    role = db.session.execute(
        m.Division.select().where(
            m.Division.role_name == s.UserRole.WAREHOUSE_MANAGER.value
        )
    ).scalar()
    weh_menegar = m.User(
        username="user1",
        email="user1@mail.com",
        password="password",
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

    m.User(
        username="user2",
        email="user_second@mail.com",
        password="password",
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

    meng = m.User(
        username="meng",
        email="meng@mail.com",
        password="password",
        role=4,
        activated=True,
        approval_permission=True,
        street_address="street",
        phone_number="123456789",
        country="UK",
        region="Lv",
        city="Dro",
        zip_code="82100",
        sales_rep=False,
    ).save()
    meng2 = m.User(
        username="meng2",
        email="meng2@mail.com",
        password="password",
        role=4,
        activated=True,
        approval_permission=True,
        street_address="street",
        phone_number="123456789",
        country="UK",
        region="Lv",
        city="Dro",
        zip_code="82100",
        sales_rep=False,
    ).save()

    for mg in master_groups:
        m.MasterGroup(
            name=mg,
        ).save(False)
    for g in groups:
        m.Group(
            name=g,
            master_group_id=groups[g],
        ).save(False)
    for mg in master_groups:
        m.MasterGroupProduct(
            name=mg,
        ).save(False)
    for g in groups:
        m.GroupProduct(
            name=g,
            master_group_id=groups[g],
        ).save(False)

    m.UserGroup(
        left_id=meng.id,
        right_id=1,
    ).save()
    m.UserGroup(
        left_id=meng2.id,
        right_id=2,
    ).save()

    group_event = m.Group(
        name=s.ProductMasterGroupMandatory.events.value,
        master_group_id=3,
    ).save(False)

    populate_test_product = m.Product(
        name="populate_test_product",
        supplier_id=1,
        currency="CAD",
        regular_price=9,
        retail_price=11,
        image="imgpngbase64str",
        description="desc",
        SKU="322ewd3333rs3",
        low_stock_level=11,
        program_year=2023,
        package_qty=12,
        numb_of_items_per_case=22,
        numb_of_cases_per_outer_case=22,
        comments="comments",
        weight=11.0,
        length=11.0,
        width=11.0,
        height=11.0,
    )
    populate_test_product.save(False)
    populate_test_prod2 = m.Product(
        name="populate_test_prod2",
        supplier_id=1,
        currency="USD",
        regular_price=9,
        retail_price=11,
        image="imgpngbase64str",
        description="desc",
        SKU="322ewd2222rs2",
        low_stock_level=11,
        program_year=2023,
        package_qty=12,
        numb_of_items_per_case=22,
        numb_of_cases_per_outer_case=22,
        comments="comments",
        weight=11.0,
        length=11.0,
        width=11.0,
        height=11.0,
    )
    populate_test_prod2.save(False)

    event_test_product = m.Product(
        name="event_test_product",
        supplier_id=1,
        currency="CAD",
        regular_price=9,
        retail_price=11,
        image="imgpngbase64str",
        description="desc",
        SKU="322ewd3333rs1",
        low_stock_level=11,
        program_year=2023,
        package_qty=12,
        numb_of_items_per_case=22,
        numb_of_cases_per_outer_case=22,
        comments="comments",
        weight=11.0,
        length=11.0,
        width=11.0,
        height=11.0,
    )
    event_test_product.save(False)

    m.ProductGroup(product_id=1, group_id=1).save(False)
    m.ProductGroup(product_id=2, group_id=2).save(False)

    jw = m.Warehouse(
        name="Junewood warehouse",
        phone_number="380362470221",
        city="Bagmom",
        zip="unzip",
        address="sserdda",
        manager_id=1,
    )
    jw.save(False)

    warehouse_events = m.Warehouse(
        name=s.WarehouseMandatory.warehouse_events.value,
        phone_number="380362470221",
        city="Bagmom",
        zip="unzip",
        address="sserdda",
        manager_id=1,
    )
    warehouse_events.save(False)

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
        name="sup_test",
        email="sup_test@email.com",
        contact_number="380362470225",
        country="Cat",
        region="Albe",
        city="Kam",
        address="st.2",
        zip="45773",
        active=True,
    ).save(False)

    m.RequestShare(
        product_id=1,
        group_id=1,
        from_group_id=2,
        user_id=meng.id,
        desire_quantity=100,
        status="pending",
    ).save()

    m.Assign(
        product_id=1,
        from_group_id=2,
        group_id=1,
        user_id=meng.id,
        quantity=100,
        type="request_share",
    ).save()
    m.RequestShareUser(
        request_share_id=1,
        user_id=meng2.id,
    ).save()

    inbound_order_test = m.InboundOrder(
        active_date=datetime.datetime.strptime("07/20/2023", "%m/%d/%Y"),
        active_time="12:00 AM",
        title="Inbound Order test",
        delivery_date=datetime.datetime.strptime("07/19/2023", "%m/%d/%Y"),
        status=s.InboundOrderStatus.delivered,
        supplier_id=1,
        warehouse_id=1,
    )

    m.ShipRequest(
        order_numb=f"Order{datetime.datetime.now().timestamp()}",
        status=s.ShipRequestStatus.in_transit.name,
        store_category_id=1,
        order_type="Regular",
        store_id=1,
        user_id=1,
    ).save(False)

    m.StoreCategory(
        name="Bar",
        active=True,
        image="",
    ).save(False)

    m.StoreCategory(
        name=SALES_REP_LOCKER_NAME,
        active=True,
        image=os.environ.get("DEFAULT_IMAGE", "default"),
    ).save()

    m.Store(
        store_category_id=1,
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

    sr_atp = m.ShipRequest(
        order_numb="Order-12345-Assigned-to-pickup",
        status=s.ShipRequestStatus.assigned,
        store_category_id=1,
        order_type="Regular",
        store_id=1,
        user_id=1,
    )
    sr_atp.save(False)

    m.ShipRequest(
        order_numb="Order-12345-In-transit",
        status=s.ShipRequestStatus.in_transit,
        store_category_id=1,
        order_type="Regular",
        store_id=1,
        user_id=1,
    ).save(False)

    waiting_ship = m.ShipRequest(
        order_numb="Order-12345-Waiting-for-warehouse-manager",
        status=s.ShipRequestStatus.waiting_for_warehouse,
        store_category_id=1,
        order_type="Regular",
        store_id=1,
        user_id=1,
    )
    waiting_ship.save(False)
    m.ShipRequestNotification(
        user=weh_menegar,
        ship_request=waiting_ship,
    ).save(False)

    m.InboundOrder(
        active_date=datetime.datetime.strptime("07/20/2023", "%m/%d/%Y"),
        active_time="12:00 AM",
        title="Inbound Order Assigned to pickup",
        delivery_date=datetime.datetime.strptime("07/19/2023", "%m/%d/%Y"),
        status=s.InboundOrderStatus.assigned,
        supplier_id=1,
        warehouse_id=1,
    ).save(False)

    inbound_order_transit = m.InboundOrder(
        active_date=datetime.datetime.strptime("07/20/2023", "%m/%d/%Y"),
        active_time="12:00 AM",
        title="Inbound Order In transit",
        delivery_date=datetime.datetime.strptime("07/19/2023", "%m/%d/%Y"),
        status=s.InboundOrderStatus.in_transit,
        supplier_id=1,
        warehouse_id=1,
    )

    received_one_product_one_group = m.InboundOrder(
        active_date=datetime.datetime.strptime("07/20/2023", "%m/%d/%Y"),
        active_time="12:00 AM",
        title="received_one_product_one_group",
        delivery_date=datetime.datetime.strptime("07/19/2023", "%m/%d/%Y"),
        status=s.InboundOrderStatus.in_transit,
        supplier_id=1,
        warehouse_id=1,
    )
    received_one_product_two_groups = m.InboundOrder(
        active_date=datetime.datetime.strptime("07/20/2023", "%m/%d/%Y"),
        active_time="12:00 AM",
        title="received_one_product_two_groups",
        delivery_date=datetime.datetime.strptime("07/19/2023", "%m/%d/%Y"),
        status=s.InboundOrderStatus.in_transit,
        supplier_id=1,
        warehouse_id=1,
    )
    received_two_products_one_group = m.InboundOrder(
        active_date=datetime.datetime.strptime("07/20/2023", "%m/%d/%Y"),
        active_time="12:00 AM",
        title="received_two_products_one_group",
        delivery_date=datetime.datetime.strptime("07/19/2023", "%m/%d/%Y"),
        status=s.InboundOrderStatus.in_transit,
        supplier_id=1,
        warehouse_id=1,
    )
    received_two_products_two_groups = m.InboundOrder(
        active_date=datetime.datetime.strptime("07/20/2023", "%m/%d/%Y"),
        active_time="12:00 AM",
        title="received_two_products_two_groups",
        delivery_date=datetime.datetime.strptime("07/19/2023", "%m/%d/%Y"),
        status=s.InboundOrderStatus.in_transit,
        supplier_id=1,
        warehouse_id=1,
    )

    m.WarehouseProduct(
        product_id=populate_test_product.id,
        group_id=1,
        product_quantity=100,
        warehouse_id=jw.id,
    ).save(False)
    m.WarehouseProduct(
        product_id=populate_test_product.id,
        group_id=2,
        product_quantity=200,
        warehouse_id=jw.id,
    ).save(False)
    m.WarehouseProduct(
        product_id=event_test_product.id,
        group_id=group_event.id,
        product_quantity=200,
        warehouse_id=warehouse_events.id,
    ).save(False)

    inbound_order_test.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_product,
            quantity=200,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[m.ProductQuantityGroup(group_id=1, quantity=200)],
        )
    )
    inbound_order_test.save(False)

    inbound_order_transit.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_product,
            quantity=200,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=1,
                    quantity=200,
                )
            ],
        )
    )
    inbound_order_transit.save(False)

    # received_one_product_one_group
    received_one_product_one_group.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_product,
            quantity=200,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=1,
                    quantity=200,
                )
            ],
        )
    )
    received_one_product_one_group.save(False)

    # received_one_product_two_groups
    received_one_product_two_groups.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_product,
            quantity=200,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=1,
                    quantity=200,
                )
            ],
        )
    )

    received_one_product_two_groups.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_prod2,
            quantity=100,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=1,
                    quantity=100,
                )
            ],
        )
    )
    received_one_product_two_groups.save(False)

    # received_two_products_one_group
    received_two_products_one_group.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_product,
            quantity=200,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=1,
                    quantity=200,
                )
            ],
        )
    )

    received_two_products_one_group.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_product,
            quantity=100,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=2,
                    quantity=100,
                )
            ],
        )
    )
    received_two_products_one_group.save(False)

    # received_two_products_two_groups
    received_two_products_two_groups.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_product,
            quantity=200,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=1,
                    quantity=200,
                )
            ],
        )
    )

    received_two_products_two_groups.products_allocated.append(
        m.ProductAllocated(
            product=populate_test_prod2,
            quantity=100,
            shelf_life_start=datetime.datetime.now().date(),
            shelf_life_end=datetime.datetime.now().date(),
            product_quantity_groups=[
                m.ProductQuantityGroup(
                    group_id=2,
                    quantity=100,
                )
            ],
        )
    )
    received_two_products_two_groups.save(False)

    report = m.ReportEvent(
        type="test_type",
        user_id=1,
        history="some history",
    )
    report.save(False)

    db.session.commit()

    group_canada: m.Group = db.session.scalar(
        m.Group.select().where(m.Group.name == "Canada")
    )
    group_jb: m.Group = db.session.scalar(m.Group.select().where(m.Group.name == "JB"))

    group_canada.parent_group_id = group_jb.id  # Sub group

    m.Cart(
        product=populate_test_product,
        quantity=15,
        user_id=1,
        group_id=group_canada.id,
        warehouse_id=jw.id,
        ship_request_id=sr_atp.id,
    ).save(False)

    m.Cart(
        product_id=1,
        quantity=11,
        user_id=1,
        group_id=group_jb.id,
    ).save(False)

    m.Cart(
        product=populate_test_product,
        quantity=100,
        user_id=1,
        group_id=group_canada.id,
        warehouse_id=jw.id,
        ship_request_id=waiting_ship.id,
        status="submitted",
    ).save(False)

    today = datetime.datetime.now().date()
    for day in range(1, 17, 5):
        sr = m.ShipRequest(
            order_numb=f"Order-12345{day}-Waiting-for-warehouse-manager",
            status=s.ShipRequestStatus.waiting_for_warehouse,
            store_category_id=1,
            order_type="Regular",
            store_id=1,
            user_id=3,
        ).save(False)
        m.ShipRequestNotification(
            user=weh_menegar,
            ship_request=sr,
        ).save(False)

        cart = m.Cart(
            product=event_test_product,
            quantity=10,
            user_id=3,
            group_id=group_event.id,
            ship_request_id=sr.id,
            warehouse_id=warehouse_events.id,
            status="pending",
        ).save(False)

        m.Event(
            date_from=today - datetime.timedelta(days=day),
            date_to=today + datetime.timedelta(days=day),
            date_reserve_from=today - datetime.timedelta(days=day + 5),
            date_reserve_to=today + datetime.timedelta(days=day + 5),
            quantity=cart.quantity,
            product_id=event_test_product.id,
            comment="event for product 1",
            user_id=3,
            group_id=group_event.id,
            cart_id=cart.id,
        ).save(False)
        db.session.commit()

    yield client


@pytest.fixture
def cases_map():
    with open(
        Path("tests") / "data" / "dict_received_products.json", "r"
    ) as received_product_json:
        received_product_cases = s.IncomingStocksLists.model_validate_json(
            received_product_json.read()
        )

        return {
            case.name: case.incoming_stock_product
            for case in received_product_cases.root
        }


@pytest.fixture(
    params=[
        "received_one_product_one_group",
        "received_one_product_two_groups",
        "received_two_products_one_group",
        "received_two_products_two_groups",
        "received_one_product_one_group",
    ]
)
def order_name(request):
    return request.param


@pytest.fixture
def orders_t(order_name, cases_map):
    return s.IncomingStocks.model_validate(cases_map[order_name]), order_name
