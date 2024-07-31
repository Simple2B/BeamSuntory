import sqlalchemy as sa
import app.models as m
import app.schema as s
from app.database import db


def add_events():
    events_name = s.Events.name.value
    print(events_name)
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

    product_group = db.session.scalar(
        sa.select(m.GroupProduct).where(m.GroupProduct.name == events_name)
    )
    if not product_group:
        m.GroupProduct(name=events_name, master_group_id=product_muster_group.id).save()
