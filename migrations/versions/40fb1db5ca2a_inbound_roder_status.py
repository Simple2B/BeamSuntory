"""inbound roder status

Revision ID: 40fb1db5ca2a
Revises: 7383966d8ab1
Create Date: 2023-07-18 12:11:26.418425

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "40fb1db5ca2a"
down_revision = "7383966d8ab1"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("inbound_orders", schema=None) as batch_op:
        batch_op.add_column(sa.Column("status", sa.String(length=64)))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("inbound_orders", schema=None) as batch_op:
        batch_op.drop_column("status")

    # ### end Alembic commands ###
