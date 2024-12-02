"""rework ship_request_billable

Revision ID: 1d55a71358e9
Revises: d45b8a7bbecf
Create Date: 2024-11-30 03:23:40.344614

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1d55a71358e9'
down_revision = 'd45b8a7bbecf'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ship_request_billables', schema=None) as batch_op:
        batch_op.add_column(sa.Column('inbound_order_id', sa.Integer(), nullable=True))
        batch_op.create_foreign_key(batch_op.f('fk_ship_request_billables_inbound_order_id_inbound_orders'), 'inbound_orders', ['inbound_order_id'], ['id'], ondelete='SET NULL')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ship_request_billables', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_ship_request_billables_inbound_order_id_inbound_orders'), type_='foreignkey')
        batch_op.drop_column('inbound_order_id')

    # ### end Alembic commands ###