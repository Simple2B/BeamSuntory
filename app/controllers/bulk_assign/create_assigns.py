from flask_login import current_user
import app.schema as s
import app.models as m

from app.database import db
from app.logger import log
import sqlalchemy as sa


def create_assigns(assigns: list[s.AssignInfo], bulk_assign: m.BulkAssign):
    log(log.INFO, "Creating assigns")
    log(log.INFO, f"Iterating over {len(assigns)} assigns")
    for assign in assigns:
        # Get the warehouse product
        warehouse_product = db.session.scalar(
            sa.select(m.WarehouseProduct).where(
                m.WarehouseProduct.product.has(m.Product.SKU == assign.product_SKU),
                m.WarehouseProduct.group.has(
                    sa.func.TRIM(m.Group.name) == assign.group_name_from.strip()
                ),
            ),
        )
        if not warehouse_product:
            log(log.ERROR, "Warehouse product not found")
            continue

        # Create the assign
        assign = m.Assign(
            product_id=warehouse_product.product_id,
            group_id=warehouse_product.group_id,
            quantity=assign.quantity,
            from_group_id=warehouse_product.group_id,
            type=s.ReportEventType.created.value,
            bulk_assign_id=bulk_assign.id,
            user_id=current_user.id,
        )
        bulk_assign.assigns.append(assign)
        log(log.INFO, "Assign created, bulk_assign_id: %s", bulk_assign.id)
        db.session.add(assign)

    db.session.commit()
    log(log.INFO, "Assigns created")
