"""add bulk ship

Revision ID: 18d71fcfc04e
Revises: 576120fad5b3
Create Date: 2024-09-30 19:59:16.577863

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '18d71fcfc04e'
down_revision = '576120fad5b3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('bulk_ships',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uuid', sa.String(length=36), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('name', sa.String(length=256), nullable=True),
    sa.Column('is_deleted', sa.Boolean(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_bulk_ships'))
    )
    with op.batch_alter_table('bulk_ships', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_bulk_ships_uuid'), ['uuid'], unique=False)

    op.create_table('bulk_ship_items',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('uuid', sa.String(length=36), nullable=False),
    sa.Column('bult_ship_id', sa.Integer(), nullable=False),
    sa.Column('store_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['bult_ship_id'], ['bulk_ships.id'], name=op.f('fk_bulk_ship_items_bult_ship_id_bulk_ships')),
    sa.ForeignKeyConstraint(['group_id'], ['groups.id'], name=op.f('fk_bulk_ship_items_group_id_groups')),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_bulk_ship_items_product_id_products')),
    sa.ForeignKeyConstraint(['store_id'], ['stores.id'], name=op.f('fk_bulk_ship_items_store_id_stores')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_bulk_ship_items'))
    )
    with op.batch_alter_table('bulk_ship_items', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_bulk_ship_items_uuid'), ['uuid'], unique=False)

    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.drop_constraint('fk_carts_from_warehouse_product_id_warehouse_product', type_='foreignkey')
        batch_op.drop_column('from_warehouse_product_id')

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('has_access_bulk_ship', sa.Boolean(), server_default='0', nullable=False))
        batch_op.add_column(sa.Column('has_access_bulk_assign', sa.Boolean(), server_default='0', nullable=False))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('has_access_bulk_assign')
        batch_op.drop_column('has_access_bulk_ship')

    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.add_column(sa.Column('from_warehouse_product_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.create_foreign_key('fk_carts_from_warehouse_product_id_warehouse_product', 'warehouse_product', ['from_warehouse_product_id'], ['id'])

    with op.batch_alter_table('bulk_ship_items', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_bulk_ship_items_uuid'))

    op.drop_table('bulk_ship_items')
    with op.batch_alter_table('bulk_ships', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_bulk_ships_uuid'))

    op.drop_table('bulk_ships')
    # ### end Alembic commands ###