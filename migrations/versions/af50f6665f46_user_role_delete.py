"""user role delete

Revision ID: af50f6665f46
Revises: 21e6ebb8daa3
Create Date: 2023-08-14 16:55:00.047975

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'af50f6665f46'
down_revision = '21e6ebb8daa3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('divisions', schema=None) as batch_op:
        batch_op.drop_column('parent_role')
        batch_op.drop_column('type')

    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.alter_column('store_category_id',
               existing_type=sa.INTEGER(),
               nullable=False)

    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_constraint('fk_users_division_divisions', type_='foreignkey')
        batch_op.drop_column('role')
        batch_op.drop_column('division')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('division', sa.INTEGER(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('role', postgresql.ENUM('ADMIN', 'MANAGER', 'SALES_REP', 'WAREHOUSE_MANAGER', name='userrole'), autoincrement=False, nullable=True))
        batch_op.create_foreign_key('fk_users_division_divisions', 'divisions', ['division'], ['id'])

    with op.batch_alter_table('stores', schema=None) as batch_op:
        batch_op.alter_column('store_category_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    with op.batch_alter_table('divisions', schema=None) as batch_op:
        batch_op.add_column(sa.Column('type', sa.VARCHAR(length=64), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('parent_role', sa.VARCHAR(length=64), autoincrement=False, nullable=True))

    # ### end Alembic commands ###