"""duplicate groups for product

Revision ID: af8e0ca856c9
Revises: 38a23d99abad
Create Date: 2023-07-07 11:26:51.794701

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'af8e0ca856c9'
down_revision = '38a23d99abad'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('master_groups_for_product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_master_groups_for_product')),
    sa.UniqueConstraint('name', name=op.f('uq_master_groups_for_product_name'))
    )
    op.create_table('groups_for_product',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('master_group_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['master_group_id'], ['master_groups_for_product.id'], name=op.f('fk_groups_for_product_master_group_id_master_groups_for_product')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_groups_for_product')),
    sa.UniqueConstraint('name', name=op.f('uq_groups_for_product_name'))
    )
    with op.batch_alter_table('product_group', schema=None) as batch_op:
        batch_op.drop_constraint('fk_product_group_group_id_groups', type_='foreignkey')
        batch_op.create_foreign_key(batch_op.f('fk_product_group_group_id_groups_for_product'), 'groups_for_product', ['group_id'], ['id'])

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('supplier_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.alter_column('shelf_life_start',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)
        batch_op.alter_column('shelf_life_end',
               existing_type=postgresql.TIMESTAMP(),
               nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.alter_column('shelf_life_end',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.alter_column('shelf_life_start',
               existing_type=postgresql.TIMESTAMP(),
               nullable=True)
        batch_op.alter_column('supplier_id',
               existing_type=sa.INTEGER(),
               nullable=True)

    with op.batch_alter_table('product_group', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('fk_product_group_group_id_groups_for_product'), type_='foreignkey')
        batch_op.create_foreign_key('fk_product_group_group_id_groups', 'groups', ['group_id'], ['id'])

    op.drop_table('groups_for_product')
    op.drop_table('master_groups_for_product')
    # ### end Alembic commands ###
