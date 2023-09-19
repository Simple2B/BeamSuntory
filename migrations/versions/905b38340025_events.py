"""Events

Revision ID: 905b38340025
Revises: fde3bec3d9b4
Create Date: 2023-09-18 10:23:18.038705

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '905b38340025'
down_revision = 'fde3bec3d9b4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('date_reserve_from', sa.Date(), nullable=True))
        batch_op.add_column(sa.Column('date_reserve_to', sa.Date(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.drop_column('date_reserve_to')
        batch_op.drop_column('date_reserve_from')

    # ### end Alembic commands ###
