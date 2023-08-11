"""request share actions

Revision ID: accaf952baf1
Revises: e5a651ba1997
Create Date: 2023-08-03 17:24:35.744880

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'accaf952baf1'
down_revision = 'e5a651ba1997'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('request_share',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('group_id', sa.Integer(), nullable=False),
    sa.Column('from_group_id', sa.Integer(), nullable=False),
    sa.Column('desire_quantity', sa.Integer(), nullable=False),
    sa.Column('status', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.ForeignKeyConstraint(['from_group_id'], ['groups_for_product.id'], name=op.f('fk_request_share_from_group_id_groups_for_product')),
    sa.ForeignKeyConstraint(['group_id'], ['groups_for_product.id'], name=op.f('fk_request_share_group_id_groups_for_product')),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_request_share_product_id_products')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_request_share'))
    )
    op.create_table('request_share_user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('request_share_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['request_share_id'], ['request_share.id'], name=op.f('fk_request_share_user_request_share_id_request_share')),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_request_share_user_user_id_users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_request_share_user'))
    )
    with op.batch_alter_table('product_quantity_group', schema=None) as batch_op:
        batch_op.alter_column('inbound_order_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_constraint('fk_product_quantity_group_group_id_groups', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_product_quantity_group_group_id_groups_for_product'), 'groups_for_product', ['group_id'], ['id'])

    with op.batch_alter_table('warehouse_product', schema=None) as batch_op:
        batch_op.alter_column('group_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.drop_constraint('fk_warehouse_product_group_id_groups', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_warehouse_product_group_id_groups_for_product'), 'groups_for_product', ['group_id'], ['id'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('warehouse_product', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_warehouse_product_group_id_groups_for_product'), type_='foreignkey')
        batch_op.create_foreign_key('fk_warehouse_product_group_id_groups', 'groups', ['group_id'], ['id'])
        batch_op.alter_column('group_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    with op.batch_alter_table('product_quantity_group', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_product_quantity_group_group_id_groups_for_product'), type_='foreignkey')
        batch_op.create_foreign_key('fk_product_quantity_group_group_id_groups', 'groups', ['group_id'], ['id'])
        batch_op.alter_column('inbound_order_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    op.drop_table('request_share_user')
    op.drop_table('request_share')
    # ### end Alembic commands ###
