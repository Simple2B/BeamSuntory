"""update SKU and img id

Revision ID: 9558c148eb4a
Revises: 0d3355bf4039
Create Date: 2024-03-08 18:56:58.214291

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9558c148eb4a'
down_revision = '0d3355bf4039'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('assigns', schema=None) as batch_op:
        batch_op.alter_column('uuid',
               existing_type=sa.VARCHAR(length=64),
               nullable=False)

    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.create_unique_constraint(batch_op.f('uq_products_SKU'), ['SKU'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('products', schema=None) as batch_op:
        batch_op.drop_constraint(batch_op.f('uq_products_SKU'), type_='unique')

    with op.batch_alter_table('assigns', schema=None) as batch_op:
        batch_op.alter_column('uuid',
               existing_type=sa.VARCHAR(length=64),
               nullable=True)

    # ### end Alembic commands ###