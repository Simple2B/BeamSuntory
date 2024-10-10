import sqlalchemy as sa
import app.models as m
import app.schema as s
from app.database import db


def add_extra_groups():
    brand = s.Brand.name.value
    events_name = s.Events.name.value
    master_group = db.session.scalar(
        sa.select(m.MasterGroup).where(m.MasterGroup.name == events_name)
    )
    if not master_group:
        master_group = m.MasterGroup(name=events_name).save()

    group = db.session.scalar(sa.select(m.Group).where(m.Group.name == events_name))
    if not group:
        m.Group(name=events_name, master_group_id=master_group.id).save()

    product_muster_group = db.session.scalar(
        sa.select(m.MasterGroupProduct).where(m.MasterGroupProduct.name == events_name)
    )
    if not product_muster_group:
        product_muster_group = m.MasterGroupProduct(name=events_name).save()

    brand_product_master_group = db.session.scalar(
        sa.select(m.MasterGroupProduct).where(m.MasterGroupProduct.name == brand)
    )
    if not brand_product_master_group:
        m.MasterGroupProduct(name=brand).save()

    product_group = db.session.scalar(
        sa.select(m.GroupProduct).where(m.GroupProduct.name == events_name)
    )
    if not product_group:
        m.GroupProduct(name=events_name, master_group_id=product_muster_group.id).save()
