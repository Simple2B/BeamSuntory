"""inbound_order edits

Revision ID: 7383966d8ab1
Revises: 8eceea58c0ac
Create Date: 2023-07-17 23:33:59.571404

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7383966d8ab1'
down_revision = '8eceea58c0ac'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('inbound_orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('order_title', sa.String(length=64), nullable=False))
        batch_op.add_column(sa.Column('delivery_date', sa.DateTime(), nullable=False))
        batch_op.drop_column('item_type')

    with op.batch_alter_table('suppliers', schema=None) as batch_op:
        batch_op.alter_column('contact_number',
               existing_type=sa.VARCHAR(length=64),
               nullable=False)
        batch_op.alter_column('country',
               existing_type=sa.VARCHAR(length=64),
               nullable=False)
        batch_op.alter_column('region',
               existing_type=sa.VARCHAR(length=64),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('suppliers', schema=None) as batch_op:
        batch_op.alter_column('region',
               existing_type=sa.VARCHAR(length=64),
               nullable=True)
        batch_op.alter_column('country',
               existing_type=sa.VARCHAR(length=64),
               nullable=True)
        batch_op.alter_column('contact_number',
               existing_type=sa.VARCHAR(length=64),
               nullable=True)

    with op.batch_alter_table('inbound_orders', schema=None) as batch_op:
        batch_op.add_column(sa.Column('item_type', sa.VARCHAR(length=64), autoincrement=False, nullable=False))
        batch_op.drop_column('delivery_date')
        batch_op.drop_column('order_title')

    # ### end Alembic commands ###
