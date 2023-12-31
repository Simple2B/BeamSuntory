"""shelf life qty remains

Revision ID: 354164e2ae07
Revises: 63f78a2f43a8
Create Date: 2023-10-06 17:40:16.686307

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "354164e2ae07"
down_revision = "63f78a2f43a8"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("products_allocated", schema=None) as batch_op:
        batch_op.add_column(sa.Column("quantity_remains", sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    with op.batch_alter_table("products_allocated", schema=None) as batch_op:
        batch_op.drop_column("quantity_remains")

    # ### end Alembic commands ###
