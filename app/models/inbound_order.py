from datetime import datetime, date

import sqlalchemy as sa
from sqlalchemy import orm

from app.database import db
from .utils import ModelMixin, generate_uuid
from app import schema as s
from .supplier import Supplier
from .warehouse import Warehouse
from .product import Product
from .group import Group
from .product_quantity_group import ProductQuantityGroup
from .package_info import PackageInfo
from .product_allocated import ProductAllocated


def generate_order_id_timestamp():
    return f"IO-BEAM-{int(datetime.now().timestamp())}"


class InboundOrder(db.Model, ModelMixin):
    __tablename__ = "inbound_orders"

    id: orm.Mapped[int] = orm.mapped_column(primary_key=True)
    uuid: orm.Mapped[str] = orm.mapped_column(
        sa.String(36),
        default=generate_uuid,
        index=True,
    )
    title: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
    )

    order_id: orm.Mapped[str] = orm.mapped_column(
        sa.String(64),
        nullable=False,
        default=generate_order_id_timestamp,
    )

    active_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    active_time: orm.Mapped[str] = orm.mapped_column(sa.String(64))
    delivery_date: orm.Mapped[date] = orm.mapped_column(sa.Date)
    status: orm.Mapped[s.InboundOrderStatus] = orm.mapped_column(
        sa.Enum(s.InboundOrderStatus),
        default=s.InboundOrderStatus.draft,
    )

    created_at: orm.Mapped[datetime] = orm.mapped_column(
        sa.DateTime,
        default=datetime.utcnow,
    )

    supplier_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("suppliers.id"))
    supplier: orm.Mapped[Supplier] = orm.relationship()
    warehouse_id: orm.Mapped[int] = orm.mapped_column(sa.ForeignKey("warehouses.id"))
    warehouse: orm.Mapped[Warehouse] = orm.relationship()
    products_allocated: orm.Mapped[list[ProductAllocated]] = orm.relationship(
        cascade="all, delete-orphan"
    )

    def __repr__(self):
        return f"<{self.id}: {self.order_id}>"

    @property
    def json(self):
        return s.InboundOrder.from_orm(self).json(by_alias=True)
        # mg = s.InboundOrder.from_orm(self)
        # ujs = mg.json()
        # mg_dict = json.loads(ujs)
        # current_io: InboundOrder = db.session.execute(
        #     InboundOrder.select().where(InboundOrder.id == mg_dict["id"])
        # ).scalar()
        # # TODO move all groups json outside of the model
        # mg_dict["groups"] = [
        #     {
        #         "name": g.name,
        #         "id": g.id,
        #     }
        #     for g in db.session.execute(Group.select()).scalars()
        # ]
        # # TODO move all products json outside of the model
        # mg_dict["products"] = [
        #     {
        #         "name": p.name,
        #         "id": p.id,
        #     }
        #     for p in db.session.execute(Product.select()).scalars()
        # ]

        # mg_dict["sup_da_wh_prod_objs"] = {
        #     "supplier": current_io.supplier.name,
        #     "warehouse": current_io.warehouse.name,
        # }

        # # # # TODO consider if this code could be moved to separate route
        # apqg: list[ProductQuantityGroup] = [
        #     io for io in db.session.execute(ProductQuantityGroup.select()).scalars()
        # ]

        # mg_dict["inbound_order_prods"] = {
        #     io.inbound_order.order_id: [
        #         {
        #             "group": {"id": uio.group_id, "name": uio.group.name},
        #             "product": {
        #                 "id": uio.product_id,
        #                 "name": uio.product.name,
        #                 "SKU": uio.product.SKU,
        #                 "image": uio.product.image,
        #             },
        #             "quantity": uio.quantity,
        #             "shelf_life_start": uio.shelf_life_start.strftime("%m/%d/%Y"),
        #             "shelf_life_end": uio.shelf_life_end.strftime("%m/%d/%Y"),
        #         }
        #         for uio in apqg
        #         if uio.inbound_order.order_id == io.inbound_order.order_id
        #     ]
        #     for io in apqg
        # }
        # # # #

        # package: PackageInfo = db.session.execute(
        #     PackageInfo.select().where(PackageInfo.inbound_order_id == mg_dict["id"])
        # ).scalar()
        # mg_dict["package_info"] = (
        #     {
        #         "quantity_per_wrap": package.quantity_per_wrap,
        #         "quantity_wrap_carton": package.quantity_wrap_carton,
        #         "quantity_carton_master": package.quantity_carton_master,
        #     }
        #     if package
        #     else {
        #         "quantity_per_wrap": 0,
        #         "quantity_wrap_carton": 0,
        #         "quantity_carton_master": 0,
        #     }
        # )
        # io_allocate_product: list[IOAllocateProduct] = db.session.execute(
        #     IOAllocateProduct.select().where(
        #         IOAllocateProduct.inbound_order_id == mg_dict["id"],
        #     )
        # ).scalars()

        # mg_dict["io_allocate_product"] = {
        #     mg_dict["id"]: [
        #         {
        #             "product": {
        #                 "id": io.product_id,
        #                 "name": str(io.product.name).replace(
        #                     "  ", " "
        #                 ),  # TODO handle better if there are some double symbols in csv
        #                 "shelf_life_start": io.shelf_life_start.strftime("%m/%d/%Y"),
        #                 "shelf_life_end": io.shelf_life_end.strftime("%m/%d/%Y"),
        #             },
        #             "quantity": io.quantity,
        #         }
        #         for io in io_allocate_product
        #     ]
        # }
        # mg_dict["uuid"] = self.uuid

        # return json.dumps(mg_dict)
