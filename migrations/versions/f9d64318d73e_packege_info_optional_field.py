"""packege info optional field

Revision ID: f9d64318d73e
Revises: cea2e3a205eb
Create Date: 2023-09-14 11:57:04.911804

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f9d64318d73e'
down_revision = 'cea2e3a205eb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('package_info', schema=None) as batch_op:
        batch_op.alter_column('quantity_carton_master',
               existing_type=sa.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('package_info', schema=None) as batch_op:
        batch_op.alter_column('quantity_carton_master',
               existing_type=sa.INTEGER(),
               nullable=False)

    # ### end Alembic commands ###
