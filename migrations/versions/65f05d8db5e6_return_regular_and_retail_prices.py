"""return regular and retail prices

Revision ID: 65f05d8db5e6
Revises: 307d8f87cd33
Create Date: 2023-08-23 13:00:43.382327

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "65f05d8db5e6"
down_revision = "307d8f87cd33"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("products", schema=None) as batch_op:
        batch_op.add_column(sa.Column("regular_price", sa.Float(), nullable=True))
        batch_op.add_column(sa.Column("retail_price", sa.Float(), nullable=True))
        batch_op.drop_column("price")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###

    with op.batch_alter_table("products", schema=None) as batch_op:
        batch_op.add_column(
            sa.Column(
                "price",
                sa.DOUBLE_PRECISION(precision=53),
                autoincrement=False,
                nullable=True,
            )
        )
        batch_op.drop_column("retail_price")
        batch_op.drop_column("regular_price")

    # ### end Alembic commands ###