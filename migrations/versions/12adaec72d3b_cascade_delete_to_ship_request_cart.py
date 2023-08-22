"""cascade delete to ship request, cart

Revision ID: 12adaec72d3b
Revises: c2b418abcde8
Create Date: 2023-08-21 12:05:13.211790

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '12adaec72d3b'
down_revision = 'c2b418abcde8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_constraint('fk_carts_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_carts_user_id_users'), 'users', ['user_id'], ['id'], ondelete='SET NULL')

    with op.batch_alter_table('ship_requests', schema=None) as batch_op:
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.alter_column('store_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_constraint('fk_ship_requests_store_id_stores', type_='foreignkey')
        batch_op.drop_constraint('fk_ship_requests_user_id_users', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_ship_requests_store_id_stores'), 'stores', ['store_id'], ['id'], ondelete='SET NULL')
        batch_op.create_foreign_key(batch_op.f('fk_ship_requests_user_id_users'), 'users', ['user_id'], ['id'], ondelete='SET NULL')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('ship_requests', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_ship_requests_user_id_users'), type_='foreignkey')
        batch_op.drop_constraint(batch_op.f('fk_ship_requests_store_id_stores'), type_='foreignkey')
        batch_op.create_foreign_key('fk_ship_requests_user_id_users', 'users', ['user_id'], ['id'])
        batch_op.create_foreign_key('fk_ship_requests_store_id_stores', 'stores', ['store_id'], ['id'])
        batch_op.alter_column('store_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('carts', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_carts_user_id_users'), type_='foreignkey')
        batch_op.create_foreign_key('fk_carts_user_id_users', 'users', ['user_id'], ['id'])
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
