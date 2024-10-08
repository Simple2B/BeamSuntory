from typing import List

from flask_login import current_user
import app.schema as s
import app.models as m
import sqlalchemy as sa

from app.database import db
from app.logger import log


def create_ship_requests_by_address(wh_products: List[s.WhProduct]):
    log(log.INFO, "Creating ship requests by address")

    store_ids = {wh_product.store_id for wh_product in wh_products}

    for store_id in store_ids:
        store = db.session.get(m.Store, store_id)
        if not store:
            log(log.ERROR, f"Store with id {store_id} not found")
            continue

        ship_request = m.ShipRequest(
            status=s.ShipRequestStatus.waiting_for_warehouse,
            store_id=store_id,
            store_category=store.store_category,
            comment="",
            order_type="bulk ship",
            user_id=current_user.id,
        )
        ship_request.save()
        ship_request.set_order_numb()
        db.session.commit()

        for wh_product in wh_products:
            if wh_product.store_id != store_id:
                continue

            m.ReportSKU(
                product_id=wh_product.product_id,
                ship_request=ship_request,
                type=s.ReportSKUType.ship_request.value,
                status="Ship request created.",
            ).save(False)

            m.Cart(
                product_id=wh_product.product_id,
                quantity=wh_product.qty,
                group_id=wh_product.group_id,
                ship_request_id=ship_request.id,
                order_numb=ship_request.order_numb,
                status=s.CartStatus.SUBMITTED.value,
            ).save(False)

        db.session.commit()
