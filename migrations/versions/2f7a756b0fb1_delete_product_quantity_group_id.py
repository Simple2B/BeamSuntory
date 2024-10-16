"""delete product_quantity_group_id

Revision ID: 2f7a756b0fb1
Revises: b0df3d8e5add
Create Date: 2024-04-23 15:53:05.576813

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2f7a756b0fb1'
down_revision = 'b0df3d8e5add'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('package_info', schema=None) as batch_op:
        batch_op.drop_constraint('fk_package_info_product_quantity_group_id_product_quant_2abd', type_='foreignkey')
        batch_op.drop_column('product_quantity_group_id')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('package_info', schema=None) as batch_op:
        batch_op.add_column(sa.Column('product_quantity_group_id', sa.INTEGER(), autoincrement=False, nullable=False))
        batch_op.create_foreign_key('fk_package_info_product_quantity_group_id_product_quant_2abd', 'product_quantity_group', ['product_quantity_group_id'], ['id'])

    # ### end Alembic commands ###
