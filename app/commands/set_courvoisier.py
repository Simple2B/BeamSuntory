# flake8: noqa F841
import sqlalchemy as sa
import app.models as m
import app.schema as s

from sqlalchemy.exc import PendingRollbackError, IntegrityError


def set_counrvoisier(db):

    courvoisier_prod_grop = db.session.scalar(
        sa.select(m.GroupProduct).where(m.GroupProduct.name == "Courvoisier")
    )
    courvoisier_grop = db.session.scalar(
        sa.select(m.Group).where(m.Group.name == "Courvoisier")
    )
    admin_groups = db.session.scalars(
        sa.select(m.Group).where(m.Group.name.ilike("%Admin%"))
    ).all()
    report_inbound_order = db.session.scalars(
        sa.delete(m.ReportInboundOrder).returning(m.ReportInboundOrder.id)
    ).all()
    report_sku = db.session.scalars(
        sa.delete(m.ReportSKU).returning(m.ReportSKU.id)
    ).all()
    report_inventory = db.session.scalars(
        sa.delete(m.ReportInventory).returning(m.ReportInventory.id)
    ).all()
    report_event = db.session.scalars(
        sa.delete(m.ReportEvent).returning(m.ReportEvent.id)
    ).all()
    repord_shipping = db.session.scalars(
        sa.delete(m.ReportShipping).returning(m.ReportShipping.id)
    ).all()
    adjusts_group_qty = db.session.scalars(
        sa.delete(m.AdjustGroupQty).returning(m.AdjustGroupQty.id)
    ).all()
    adjusts = db.session.scalars(sa.delete(m.Adjust).returning(m.Adjust.id)).all()
    assigns = db.session.scalars(sa.delete(m.Assign).returning(m.Assign.id)).all()
    request_share_user = db.session.scalars(
        sa.delete(m.RequestShareUser).returning(m.RequestShareUser.id)
    ).all()
    reports_request_share = db.session.scalars(
        sa.delete(m.ReportRequestShare).returning(m.ReportRequestShare.id)
    ).all()
    request_shares = db.session.scalars(
        sa.delete(m.RequestShare).returning(m.RequestShare.id)
    ).all()
    events = db.session.scalars(sa.delete(m.Event).returning(m.Event.id)).all()
    carts = db.session.scalars(sa.delete(m.Cart).returning(m.Cart.id)).all()
    ship_requests_notifications = db.session.scalars(
        sa.delete(m.ShipRequestNotification).returning(m.ShipRequestNotification.id)
    ).all()
    ship_requests = db.session.scalars(
        sa.delete(m.ShipRequest).returning(m.ShipRequest.id)
    ).all()
    product_quantity_group = db.session.scalars(
        sa.delete(m.ProductQuantityGroup).returning(m.ProductQuantityGroup.id)
    ).all()
    package_info = db.session.scalars(
        sa.delete(m.PackageInfo).returning(m.PackageInfo.id)
    ).all()

    inbound_orders = db.session.scalars(
        sa.delete(m.InboundOrder).returning(m.InboundOrder.id)
    ).all()
    report_inbound_order = db.session.scalars(
        sa.delete(m.ReportInboundOrder).returning(m.ReportInboundOrder.id)
    ).all()
    report_inventory_list = db.session.scalars(
        sa.delete(m.ReportInventoryList).returning(m.ReportInventoryList.id)
    ).all()
    product_group = db.session.scalars(
        sa.delete(m.ProductGroup)
        .returning(m.ProductGroup.id)
        .where(m.ProductGroup.group_id != courvoisier_prod_grop.id)
    ).all()

    print(len(product_group))
    user_groups = db.session.scalars(
        sa.delete(m.UserGroup)
        .returning(m.UserGroup.id)
        .where(
            m.UserGroup.right_id != courvoisier_grop.id,
            m.UserGroup.left_id.not_in(g.id for g in admin_groups),
        )
    ).all()
    warehouse_product = db.session.scalars(
        sa.delete(m.WarehouseProduct)
        .returning(m.WarehouseProduct.id)
        .where(m.WarehouseProduct.group_id != courvoisier_grop.id)
    ).all()
    print(len(warehouse_product), "---warehouse_product")
    products = db.session.scalars(
        sa.select(m.Product.id).where(
            m.Product.product_groups.any(
                m.ProductGroup.group_id == courvoisier_prod_grop.id
            )
        )
    ).all()
    print(len(products), "---products")
    delete_product = db.session.scalars(
        sa.delete(m.Product)
        .where(m.Product.id.not_in(products))
        .returning(m.Product.id)
    ).all()
    print(len(delete_product))
    users = db.session.scalars(
        sa.select(m.User.id)
        .join(m.UserGroup)
        .join(m.Division)
        .where(
            sa.or_(
                m.Division.role_name == s.UserRole.ADMIN.value,
                m.Division.role_name == s.UserRole.WAREHOUSE_MANAGER.value,
                m.UserGroup.left_id.in_(g.id for g in admin_groups),
                m.UserGroup.right_id == courvoisier_grop.id,
            )
        )
        .distinct()
    ).all()
    print(len(users), "--users")

    db.session.commit()

    delete_user_ids = db.session.scalars(
        sa.select(m.User.id).where(m.User.id.not_in(users))
    ).all()
    print(len(delete_user_ids), "---users")

    for user_id in delete_user_ids:
        delete_stm = sa.delete(m.User).where(m.User.id == user_id)
        store_stm = sa.delete(m.Store).where(m.Store.user_id == user_id)
        fav_store_stm = sa.delete(m.FavoriteStoreUser).where(
            m.FavoriteStoreUser.user_id == user_id
        )
        try:
            db.session.execute(fav_store_stm)
            db.session.execute(store_stm)
            db.session.execute(delete_stm)
            db.session.commit()
        except (PendingRollbackError, IntegrityError):
            print("Cant't delete user", user_id)
            db.session.rollback()
