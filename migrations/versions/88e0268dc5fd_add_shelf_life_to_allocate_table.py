"""add shelf life to allocate table

Revision ID: 88e0268dc5fd
Revises: ab2e0f8ae3a8
Create Date: 2023-08-16 14:41:39.430149

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "88e0268dc5fd"
down_revision = "ab2e0f8ae3a8"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("io_allocate_product", schema=None) as batch_op:
        batch_op.add_column(sa.Column("shelf_life_start", sa.DateTime(), nullable=True))
        batch_op.add_column(sa.Column("shelf_life_end", sa.DateTime(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    with op.batch_alter_table("io_allocate_product", schema=None) as batch_op:
        batch_op.drop_column("shelf_life_end")
        batch_op.drop_column("shelf_life_start")

    # ### end Alembic commands ###