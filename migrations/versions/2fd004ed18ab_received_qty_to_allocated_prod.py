"""received qty to allocated prod

Revision ID: 2fd004ed18ab
Revises: 7d5021c4714e
Create Date: 2023-10-03 15:57:47.755323

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "2fd004ed18ab"
down_revision = "7d5021c4714e"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    with op.batch_alter_table("products_allocated", schema=None) as batch_op:
        batch_op.add_column(sa.Column("quantity_received", sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    with op.batch_alter_table("products_allocated", schema=None) as batch_op:
        batch_op.drop_column("quantity_received")

    # ### end Alembic commands ###
